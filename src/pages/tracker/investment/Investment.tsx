import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch.tsx';
import { url_investment_acc } from '../../../endpoints.ts';
import CardSeparator from '../components/CardSeparator.tsx';
import Datepicker from '../../../general_components/datepicker/Datepicker.tsx';
import {
  CurrencyType,
  FormNumberInputType,
  InvestmentAccountsType,
  InvestmentTypeMovementType,
} from '../../../types/types.ts';
import { numberFormat, validationData } from '../../../helpers/functions.ts';
import { useLocation } from 'react-router-dom';
import {
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
  INVESTMENT_ACCOUNT_OPTIONS_DEFAULT,
} from '../../../helpers/constants.ts';
import TopCard from '../components/TopCard.tsx';
import CardNoteSave from '../components/CardNoteSave.tsx';
import useInputNumberHandler from '../../../hooks/useInputNumberHandler.tsx';
//------------------------------
//temporary values
const defaultCurrency: CurrencyType = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);
//input investment data state variables
type InvestmentDataType = {
  amount: number | '';
  account: string;
  currency: CurrencyType;
  type: InvestmentTypeMovementType;
  date: Date;
  note: string;
};
const initialInvestmentData: InvestmentDataType = {
  amount: '',
  account: '',
  currency: defaultCurrency,
  type: 'deposit',
  date: new Date(), //
  note: '',
};
//-----------------------------------------
function Investment() {
  //----Investment account Options----------
  const { pathname } = useLocation();
  const trackerState = pathname.split('/')[2];
  //investment accounts - from backend database
  const {
    data,
    error: fetchedError,
    isLoading,
  } = useFetch<InvestmentAccountsType>(url_investment_acc);
  const investmentAccounts =
    !isLoading && !fetchedError && data?.accounts?.length
      ? data?.accounts?.map((acc) => ({
          value: acc.name,
          label: acc.name,
        }))
      : INVESTMENT_ACCOUNT_OPTIONS_DEFAULT;
  const optionsInvestmentAccounts = {
    title: 'Available Account',
    options: investmentAccounts,
    variant:'tracker',
  };
  //-----------------
  const initialFormData: FormNumberInputType = {
    amount: '',
  };
  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [investmentData, setInvestmentData] = useState(initialInvestmentData);
  const [typeInv, setTypeInv] = useState<InvestmentTypeMovementType>('deposit');
  const [isReset, setIsReset] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<FormNumberInputType>(initialFormData);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});
  //----functions--------
  const updateDataCurrency = useCallback(
    (currency: CurrencyType) => {
      setCurrency(currency);
      setInvestmentData((prev) => ({ ...prev, currency: currency }));
    },
    [currency]
  );
  //-----------
  //use Hook: useInputNumberHandler to get the function inputNumberHandler
  //this function updates the states formData, ValidationMessages[name] and investmentData for [name] number input
  const { inputNumberHandlerFn } = useInputNumberHandler(
    setFormData,
    setValidationMessages,
    setInvestmentData
  );
  //--
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'amount') {
      inputNumberHandlerFn(name, value);
    } else {
      setInvestmentData((prev) => ({ ...prev, [name]: value }));
    }
  }
  //------------------------
  const toggleInvestmentType = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTypeInv((prev: InvestmentTypeMovementType) =>
        prev === 'deposit' ? 'withdraw' : 'deposit'
      );
    },
    [typeInv]
  );
  //--
  function changeInvestmentDate(selectedDate: Date): void {
    setInvestmentData((prev) => ({ ...prev, date: selectedDate }));
  }
  //----
  function onSaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On Save Handler');
    e.preventDefault();
    const formattedNumber = numberFormat(investmentData.amount || 0);
    console.log(
      'num formato string:',
      { formattedNumber },
      typeof formattedNumber
    );
    //validation of entered data
    const newValidationMessages = { ...validationData(investmentData) };
    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }
    //----------------------------
    //do the post to the endpoint api, here
    //ENDPOINT
    //----------------------------
    //resetting values
    setTypeInv('deposit');
    updateDataCurrency(defaultCurrency);
    setIsReset(true);
    setValidationMessages({});
    setInvestmentData(initialInvestmentData);
    setFormData(initialFormData);
    // after a delay, change isReset to false
    setTimeout(() => {
      setIsReset(false);
    }, 500);
  }
  //-----useEffect--------
  useEffect(() => {
    updateDataCurrency(currency);
    setInvestmentData((prev) => ({ ...prev, type: typeInv }));
  }, [currency, typeInv]);
  //------------------------
  //-------Top Card elements
  const topCardElements = {
    titles: { title1: 'amount', title2: 'account' },
    value: formData.amount,
    selectOptions: optionsInvestmentAccounts,
  
  };
  //--------------------------
  return (
    <>
      <form className='investment' style={{ color: 'inherit' }}>
        {/* TOP CARD START */}
        <TopCard
          topCardElements={topCardElements}
          validationMessages={validationMessages}
          updateTrackerData={updateTrackerData}
          trackerName={trackerState}
          currency={currency}
          updateCurrency={updateDataCurrency}
          selectedValue={investmentData.account}
          setSelectState={setInvestmentData}
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <CardSeparator />
        {/* BOTTOM CARD START */}
        <div className='state__card--bottom'>
          <div className='card__typeDate__container'>
            <div className='card__typeDate--type'>
              <div className='card--title'>Type</div>
              <button
                className='card__screen--type'
                onClick={toggleInvestmentType}
              >
                <div className='screen--concept'>{typeInv}</div>
              </button>
            </div>

            <div className='card__typeDate--date  '>
              <div className='card--title '> Date </div>
              <div className='card__screen--date '>
                <Datepicker
                  changeDate={changeInvestmentDate}
                  date={investmentData.date}
                  variant={'tracker'}
                  isReset={isReset}
                />
              </div>
            </div>
          </div>
          {/*  */}
          <CardNoteSave
            title={'note'}
            validationMessages={validationMessages}
            dataHandler={updateTrackerData}
            inputNote={investmentData.note}
            onSaveHandler={onSaveHandler}
          />
        </div>
      </form>
    </>
  );
}
export default Investment;
