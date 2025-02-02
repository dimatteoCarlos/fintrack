//src/pages/tracker/expense/Income.tsx
import { useState } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import {
  validationData,
  numberFormat,
  checkNumberFormatValue,
} from '../../../helpers/functions.ts';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  CurrencyType,
  IncomeAccountsType,
  SourcesType,
  SourceType,
} from '../../../types/types.ts';
import { url_accounts, url_sources } from '../../../endpoints.ts';

import { useLocation } from 'react-router-dom';
import {
  DEFAULT_CURRENCY,
  CURRENCY_OPTIONS,
  SOURCE_OPTIONS_DEFAULT,
  INCOME_OPTIONS_DEFAULT,
} from '../../../helpers/constants.ts';
import TopCard from '../components/TopCard.tsx';
import CardNoteSave from '../components/CardNoteSave.tsx';

// import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
// import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';

//temporary values
const defaultCurrency: CurrencyType = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);
// console.log(formatNumberCountry);

//input income data state variables

type IncomeDataType = {
  amount: number;
  account: string;
  source: string;
  note: string;
  currency: string;
};

const initialIncomeData: IncomeDataType = {
  amount: 0,
  account: '',
  source: '',
  note: '',
  currency: defaultCurrency,
};
//------------------------------
type FormNumberInputType = { amount: string };

const initialFormData: FormNumberInputType = {
  amount: '',
};
//------------------------------

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
      : INCOME_OPTIONS_DEFAULT;

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
      sources && !loadingSources ? 'Source of income' : 'No Source available',
    options:
      !errorSources && sources?.sources
        ? sources?.sources?.map((src: SourceType) => ({
            value: src.name,
            label: src.name,
          }))
        : SOURCE_OPTIONS_DEFAULT,
  };

  // console.log('SOURCES:', { sourceOptions });

  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [incomeData, setIncomeData] =
    useState<IncomeDataType>(initialIncomeData);

  const [formData, setFormData] = useState(initialFormData);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});
  const [isReset, setIsReset] = useState<boolean>(false);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setIncomeData((prev) => ({ ...prev, currency: currency }));
    // console.log('updateDataCurrency:', currency);
  }

  //-----------
  //**Check numeric format input Function** convert to useHook */

  function inputNumberHandler<T>(
    name: string,
    value: string,
    setFormData: React.Dispatch<React.SetStateAction<FormNumberInputType>>,
    setValidationMessages: React.Dispatch<
      React.SetStateAction<{
        [key: string]: string;
      }>
    >,
    setStateData: React.Dispatch<React.SetStateAction<T>>
  ): void {
    const { formatMessage, valueNumber, isError, valueToSave } =
      checkNumberFormatValue(value);

    // Actualizar el estado numerico en el formulario

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));

    setValidationMessages((prev) => ({
      ...prev,
      [name]: !isError
        ? ` Format: ${formatMessage}`
        : ` * Error: ${formatMessage}`,
    }));

    setStateData((prev) => ({ ...prev, [name]: valueToSave }));

    console.log('from:', trackerState, {
      formatMessage,
      valueNumber,
      isError,
      valueToSave,
    });
  }

  //-----------
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'amount') {
      inputNumberHandler<IncomeDataType>(
        name,
        value,
        setFormData,
        setValidationMessages,
        setIncomeData //depends on the tracker status
      );
      // return;
    } else {
      setIncomeData((prev) => ({ ...prev, [name]: value }));
    }
  }

  //--------

  //------------------------
  function onSaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On Save Handler');
    e.preventDefault();
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

    //------------------------
    //POST ENDPOINT HERE
    console.log('Income data state to Post:', incomeData);
    //------------------------

    //reset values
    setIsReset(true);
    setIncomeData(initialIncomeData);
    setCurrency(defaultCurrency);
    setValidationMessages({});
    setFormData(initialFormData);

    setTimeout(() => {
      setIsReset(false);
    }, 500);
  }
  //-------Top Card elements
  const topCardElements = {
    titles: { title1: 'amount', title2: 'account' },
    value: formData.amount,
    selectOptions: accountOptions,
  };

  //--------------------------

  return (
    <>
      <form className='income' style={{ color: 'inherit' }}>
        {/* TOP CARD START */}
        <TopCard
          topCardElements={topCardElements}
          validationMessages={validationMessages}
          updateTrackerData={updateTrackerData}
          trackerName={trackerState}
          currency={currency}
          updateCurrency={updateDataCurrency}
          selectedValue={incomeData.account}
          setSelectState={setIncomeData}
          isReset={isReset}
          setIsReset={setIsReset}
        />

        <CardSeparator />

        {/* BOTTOM CARD START */}

        <div className='state__card--bottom '>
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

          <CardNoteSave
            title={'note'}
            validationMessages={validationMessages}
            dataHandler={updateTrackerData}
            inputNote={incomeData.note}
            onSaveHandler={onSaveHandler}
          />
        </div>
      </form>
    </>
  );
}

export default Income;
