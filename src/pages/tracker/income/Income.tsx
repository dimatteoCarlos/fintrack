//src/ages/tracker/expense/Income.tsx
import { useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  CurrencyType,
  IncomeAccountsType,
  SourcesType,
  SourceType,
} from '../../../types/types.ts';
import { url_accounts, url_sources } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import { useLocation } from 'react-router-dom';
import { numberFormat, validationData } from '../../../helpers/functions.ts';

const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
const defaultCurrency = 'usd';
const formatNumberCountry = currencyOptions[defaultCurrency];
console.log(formatNumberCountry);

function Income() {
  //---- Income account Options ----------
  const { pathname } = useLocation();
  const trackerState = pathname.split('/')[2];

  //income accounts
  const {
    data,
    error: errorAccount,
    isLoading,
  } = useFetch<IncomeAccountsType>(url_accounts); //income and expense acc are the same

  // console.log('data:', data, {errorAccount}, data?.accounts)

  const optionsIncomeAccounts =
    data?.accounts?.length && !errorAccount && !isLoading
      ? data?.accounts?.map((acc) => ({
          value: acc.name,
          label: acc.name,
        }))
      : [
          { value: 'account_01', label: 'Account_01' },
          { value: 'account_02', label: 'Account_02' },
          { value: 'account_03', label: 'Account_03' },
          { value: 'account_04', label: 'Account_04' },
        ];

  // console.log('accounts:', { optionsIncomeAccounts });

  const accountOptions = {
    title: 'Available Account',
    options: optionsIncomeAccounts,
  };
  //--------
  //income sources
  const {
    data: sources,
    error: errorSources,
    isLoading: loadingSources,
  } = useFetch<SourcesType>(url_sources);

  const sourceOptions = {
    title:
      sources && !loadingSources ? 'Source of income' : 'No Sources available',
    options:
      !errorSources && sources?.sources
        ? sources?.sources?.map((src: SourceType) => ({
            value: src.name,
            label: src.name,
          }))
        : [
            { value: 'source_01', label: 'source_01' },
            { value: 'source_02', label: 'source_02' },
            { value: 'source_03', label: 'source_03' },
            { value: 'source_04', label: 'source_04' },
          ],
  };

  // console.log('SOURCES:', { sourceOptions });

  //-----------------
  //input income data state variables

  type IncomeDataType = {
    amount: number | string | undefined;
    account: string;
    source: string;
    note: string;
    currency: string;
  };

  const initialIncomeData: IncomeDataType = {
    amount: undefined,
    account: '',
    source: '',
    note: '',
    currency: defaultCurrency,
  };

  //---states------
  const [incomeData, setIncomeData] =
    useState<IncomeDataType>(initialIncomeData);
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //-----useEffect--------
  useEffect(() => {
    setIncomeData((prev) => ({ ...prev, currency: currency }));
  }, [currency]);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    // setIncomeData((data) => ({ ...data, currency: currency }));
    setIncomeData((prev) => ({ ...prev, currency: currency }));
    // console.log('updateDataCurrency:', currency);
  }
  //-----------
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const valueToSave =
      e.target.name === 'amount' ? Number(e.target.value) : e.target.value;
    setIncomeData((prev) => ({ ...prev, [e.target.name]: valueToSave }));

    // console.log(
    //   'updateTrackerData:',
    //   { [e.target.name]: e.target.value },
    //   currency
    // );
  }
  //-----------
  function onSaveHandler() {
    console.log('On Save Handler');
    const formattedNumber = numberFormat(incomeData.amount || 0);
    console.log(
      'num formato string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //validation of entered data
    const newValidationMessages = validationData(incomeData);
    // console.log('validation mgs:', newValidationMessages);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //do the POST to the endpoint:
    console.log('income:', { incomeData });
    
    //reset values
    setIsReset(true);
    setIncomeData(initialIncomeData);
    setCurrency(defaultCurrency);
    setValidationMessages({});
  }

  //--------------------------

  return (
    <>
      <article className='income' style={{ color: 'inherit' }}>
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
              type='number'
              placeholder={`${trackerState}s`}
              onChange={updateTrackerData}
              name='amount'
              value={Number(incomeData?.amount) || ''}
            />

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
            />
          </div>

          <div className='card--title'>
            Account
            <span className='validation__errMsg'>
              {validationMessages['account']}
            </span>
          </div>

          <SelectComponent
            dropDownOptions={accountOptions}
            setSelectState={setIncomeData}
            optionKeySelected='account'
            isReset={isReset}
            setIsReset={setIsReset}
            selectedValue={incomeData['account']}
          />
        </div>

        <CardSeparator />

        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>
            Source
            <span className='validation__errMsg'>
              {validationMessages['source']}
            </span>
          </div>
          <SelectComponent
            dropDownOptions={sourceOptions}
            setSelectState={setIncomeData}
            optionKeySelected='source'
            isReset={isReset}
            setIsReset={setIsReset}
            selectedValue={incomeData['source']}
          />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}
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
                value={incomeData.note}
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

export default Income;
