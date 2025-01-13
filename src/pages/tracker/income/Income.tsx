//src/pages/tracker/expense/Income.tsx
import { useEffect, useState } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import { validationData, numberFormat } from '../../../helpers/functions.ts';
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
import { CURRENCY_OPTIONS } from '../../../helpers/functions.ts';

//temporary values
const defaultCurrency: CurrencyType = 'usd';
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);
console.log(formatNumberCountry);

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

const incomeOptionsDefault = [
  { value: 'account_01', label: 'Account_01' },
  { value: 'account_02', label: 'Account_02' },
  { value: 'account_03', label: 'Account_03' },
  { value: 'account_04', label: 'Account_04' },
];

const sourceOptionsDefault = [
  { value: 'source_01', label: 'source_01' },
  { value: 'source_02', label: 'source_02' },
  { value: 'source_03', label: 'source_03' },
  { value: 'source_04', label: 'source_04' },
];

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
      : incomeOptionsDefault;

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
        : sourceOptionsDefault,
  };

  // console.log('SOURCES:', { sourceOptions });

  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [incomeData, setIncomeData] =
    useState<IncomeDataType>(initialIncomeData);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});
  const [isReset, setIsReset] = useState<boolean>(false);

  //-----useEffect--------
  useEffect(() => {
    updateDataCurrency(currency);
  }, [currency]);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
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
  }
  //-----------
  function onSaveHandler() {
    console.log('On Save Handler');
    const formattedNumber = numberFormat(incomeData.amount || 0);
    console.log(
      'formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //validation of entered data
    const newValidationMessages = validationData(incomeData);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //do the POST to the api endpoint:
    console.log('income:', { incomeData });
    //----------------------------

    //reset values
    setIsReset(true);
    setIncomeData(initialIncomeData);
    setCurrency(defaultCurrency);
    setValidationMessages({});

    setTimeout(() => {
      setIsReset(false);
    }, 500);
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
              placeholder={`${trackerState}`}
              onChange={updateTrackerData}
              name='amount'
              value={Number(incomeData?.amount) || ''}
            />

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
              currency={currency}
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
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='account'
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
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='source'
            selectedValue={incomeData['source']}
          />

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
      </article>
    </>
  );
}

export default Income;
