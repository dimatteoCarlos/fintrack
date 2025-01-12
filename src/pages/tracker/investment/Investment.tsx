import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch.tsx';

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
import { url_investment_acc } from '../../../endpoints.ts';
import {
  numberFormat,
  validationData,
  CURRENCY_OPTIONS,
} from '../../../helpers/functions.ts';

import { useLocation } from 'react-router-dom';

//------------------------------
const defaultCurrency: CurrencyType = 'usd';
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Investment ~ formatNumberCountry:', formatNumberCountry);

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

  //define what to do when error and when 'No income account info available'

  const accountOptions = {
    title: 'Available Account',
    options: investmentAccounts ?? [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
      { value: 'account_04', label: 'Account_04' },
    ],
  };

  //-----------------
  //input investment data state variables

  type InvestmentDataType = {
    amount: number | string | undefined;
    account: string;
    currency: CurrencyType;
    type: InvestmentTypeMovementType;
    date: Date;
    note: string;
  };

  const initialInvestmentData: InvestmentDataType = {
    amount: undefined,
    account: '',
    currency: defaultCurrency,
    type: 'deposit',
    date: new Date(),
    note: '',
  };
  //---states------
  const [investmentData, setInvestmentData] = useState(initialInvestmentData);

  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);

  const [typeInv, setTypeInv] = useState<InvestmentTypeMovementType>('deposit');
  const [isReset, setIsReset] = useState<boolean>(false);

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setInvestmentData((prev) => ({ ...prev, currency: currency }));
    // console.log('selected updateDataCurrency point:', currency);
  }
  //-----------
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const valueToSave =
      e.target.name === 'amount' ? Number(e.target.value) : e.target.value;
    setInvestmentData((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }

  function toggleInvestmentType() {
    setTypeInv((prev: InvestmentTypeMovementType) =>
      prev === 'deposit' ? 'withdraw' : 'deposit'
    );
  }

  function onSaveHandler() {
    console.log('On Save Handler');
    const formattedNumber = numberFormat(investmentData.amount || 0);
    console.log(
      'num formato string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //validation of entered data
    const newValidationMessages = validationData(investmentData);
    // console.log('validation mgs:', newValidationMessages);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //do the POST to the endpoint:

    //reset values
    setIsReset(true);
    setInvestmentData(initialInvestmentData); //check this

    setTypeInv('deposit');
    updateDataCurrency(defaultCurrency);
    setInvestmentData((prev) => ({ ...prev, date: new Date() }));
    setValidationMessages({});

    // after a delay, change isReset to false
    setTimeout(() => {
      setIsReset(false);
    }, 1500);
  }

  function changeInvestmentDate(selectedDate: Date): void {
    setInvestmentData((prev) => ({ ...prev, date: selectedDate }));

    // console.log(investmentData);
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
          <div className='card--title'>Amount<span className='validation__errMsg'>{validationMessages['amount']}</span></div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='number'
              placeholder={trackerState}
              onChange={updateTrackerData}
              name='amount'
              value={investmentData.amount || ''}
            />

            <div className='account__currency'>
              <CurrencyBadge
                updateOutsideCurrencyData={updateDataCurrency}
                variant='tracker'
                currency={currency}
              ></CurrencyBadge>
            </div>
          </div>

          <div className='card--title'>Account</div>
          <SelectComponent dropDownOptions={accountOptions} />
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

            <div className='card__typeDate--date'>
              <div className='card--title'> Date </div>
              <div className='card__screen--date'>
                <Datepicker
                  changeDate={changeInvestmentDate}
                  date={investmentData.date}
                  variant={'tracker'}
                  isReset={isReset}
                ></Datepicker>
              </div>
            </div>
          </div>

          <div className='card--title'>Note</div>

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
        {/* <FormSubmitBtn onClickHandler={onSaveHandler}>{'save'}</FormSubmitBtn> */}
      </article>
    </>
  );
}

export default Investment;
