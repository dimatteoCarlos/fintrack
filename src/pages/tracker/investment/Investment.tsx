import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch.tsx';
import { url_investment_acc } from '../../../endpoints.ts';

import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import Datepicker from '../../../general_components/datepicker/Datepicker.tsx';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';

import {
  CurrencyType,
  InvestmentAccountsType,
  InvestmentTypeMovementType,
} from '../../../types/types.ts';

import { numberFormat, validationData } from '../../../helpers/functions.ts';

import { useLocation } from 'react-router-dom';
import {
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';

//------------------------------
//temporary values
const defaultCurrency: CurrencyType = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);

//input investment data state variables

type InvestmentDataType = {
  amount: number | "";
  account: string;
  currency: CurrencyType;
  type: InvestmentTypeMovementType;
  date: Date;
  note: string;
};

const initialInvestmentData: InvestmentDataType = {
  amount: "",
  account: '',
  currency: defaultCurrency,
  type: 'deposit',
  date: new Date(),
  note: '',
};

const accountOptionsDefault = [
  { value: 'account_01', label: 'Account_01' },
  { value: 'account_02', label: 'Account_02' },
  { value: 'account_03', label: 'Account_03' },
  { value: 'account_04', label: 'Account_04' },
];
//-----------------------------------------
function Investment() {
  //----Investment account Options----------
  const { pathname } = useLocation();
  const trackerState = pathname.split('/')[2];

  //investment accounts
  const {
    data,
    error: fetchedError,
    isLoading,
  } = useFetch<InvestmentAccountsType>(url_investment_acc);

  const investmentAccounts =
    !isLoading &&
    !fetchedError &&
    data?.accounts?.length &&
    data?.accounts?.map((acc) => ({
      value: acc.name,
      label: acc.name,
    }));

  const accountOptions = {
    title: 'Available Account',
    options: investmentAccounts ?? accountOptionsDefault,
  };

  //-----------------

  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [investmentData, setInvestmentData] = useState(initialInvestmentData);

  const [typeInv, setTypeInv] = useState<InvestmentTypeMovementType>('deposit');
  const [isReset, setIsReset] = useState<boolean>(false);

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
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const valueToSave =
      e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value;

    setInvestmentData((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }

  const toggleInvestmentType = useCallback(() => {
    setTypeInv((prev: InvestmentTypeMovementType) =>
      prev === 'deposit' ? 'withdraw' : 'deposit'
    );
  }, [typeInv]);

  //--
  function changeInvestmentDate(selectedDate: Date): void {
    setInvestmentData((prev) => ({ ...prev, date: selectedDate }));
  }

  //----
  function onSaveHandler() {
    console.log('On Save Handler');
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
    //do the post to the endpoint api
    //ENDPOINT
    //----------------------------

    //reset values
    setIsReset(true);
    setValidationMessages({});
    setInvestmentData(initialInvestmentData); //check this

    setTypeInv('deposit');
    updateDataCurrency(defaultCurrency);
    setInvestmentData((prev) => ({ ...prev, date: new Date() }));

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

  //--------------------------

  return (
    <>
      <article className='investment' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>
            Amount
            <span className='validation__errMsg'>
              {validationMessages['amount']}
            </span>
          </div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              name='amount'
              type='number'
              step='any'
              placeholder={`${trackerState}`}
              onChange={updateTrackerData}
              value={investmentData.amount}
            />

            <div className='account__currency'>
              <CurrencyBadge
                updateOutsideCurrencyData={updateDataCurrency}
                variant='tracker'
                currency={currency}
              ></CurrencyBadge>
            </div>
          </div>

          <div className='card--title'>
            Account
            <span className='validation__errMsg'>
              {validationMessages['account']}
            </span>
          </div>
          <SelectComponent
            dropDownOptions={accountOptions}
            setSelectState={setInvestmentData}
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='account'
            selectedValue={investmentData['account']}
          />
        </div>
        <CardSeparator />

        {/* APPLY DEBOUNCE TO INPUT AND TEXTAREA*/}
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
                ></Datepicker>
              </div>
            </div>
          </div>

          <div className='card--title'>
            Note
            <span className='validation__errMsg'>
              {validationMessages['note']}
            </span>
          </div>

          <div
            className='note--expense'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='card__screen ' style={{ flex: 0.9 }}>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={updateTrackerData}
                name='note'
                rows={3}
                maxLength={150}
                value={investmentData.note}
              />
            </div>

            <FormPlusBtn onClickHandler={onSaveHandler} />
          </div>
        </div>
      </article>
    </>
  );
}

export default Investment;
