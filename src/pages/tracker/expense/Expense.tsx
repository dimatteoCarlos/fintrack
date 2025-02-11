//src/pages/tracker/expense/Expense.tsx
import { useState } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
// import SelectComponent from '../components/SelectComponent.tsx';
//---
import { useLocation } from 'react-router-dom';
import {
  checkNumberFormatValue,
  numberFormat,
  validationData,
} from '../../../helpers/functions.ts';
import {} from '../../../helpers/functions.ts';
import {
  CategoriesType,
  CategoryType,
  CurrencyType,
  ExpenseAccountsType,
  FormNumberInputType,
} from '../../../types/types.ts';
import { url_accounts, url_categories } from '../../../endpoints.ts';
import {
  ACCOUNT_OPTIONS_DEFAULT,
  CATEGORY_OPTIONS_DEFAULT,
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';
import TopCard from '../components/TopCard.tsx';
import CardNoteSave from '../components/CardNoteSave.tsx';
import DropDownSelection from '../../../general_components/dropdownSelection/DropDownSelection.tsx';
// import CardNote from '../components/CardNote.tsx';

//-----temporarily data 'till deciding how to handle currencies
const defaultCurrency = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('', { formatNumberCountry });

// ********************PENDIENTE: convertir componentes reusables, definir alguans reglas de negocio para status. Establecer como es el manejo de los currency, data fetching from backend, edition  pages design, buttons and functionality and integration to backend as post (Updating, deleting, patching), definir en overview lo que se refleja en los goals, definir funcionalidad de los pockets y manejo de la informacion. Todo el proceso de calculo en el backend.
//------------------------------------------------------
//input expense data state variables
type ExpenseDataType = {
  amount: number;
  account: string;
  category: string;
  note: string;
  currency: string;
};

const initialExpenseData: ExpenseDataType = {
  amount: 0,
  account: '',
  category: '',
  note: '',
  currency: defaultCurrency,
};
const initialFormData: FormNumberInputType = {
  amount: '',
};
//------------------------------
function Expense() {
  //----Expense account Options -------
  const router = useLocation();
  const trackerState = router.pathname.split('/')[2];
  //account options
  const {
    data,
    error: fetchedError,
    isLoading,
  } = useFetch<ExpenseAccountsType>(url_accounts);

  const optionsExpenseAccounts =
    !fetchedError && !isLoading && data?.accounts?.length
      ? data.accounts.map((acc, _) => ({
          value: acc.name,
          label: acc.name,
        }))
      : ACCOUNT_OPTIONS_DEFAULT;

  const accountOptions = {
    title: 'Available Account',
    options: optionsExpenseAccounts,
    variant: 'tracker',
  };

  //category options
  const { data: categoryData, error: categoryError } =
    useFetch<CategoriesType>(url_categories);

  const optionsExpenseCategories = !categoryError
    ? categoryData?.categories?.map((cat: CategoryType) => ({
        value: cat.name,
        label: cat.name,
      }))
    : null;

  const categoryOptions = {
    title:
      optionsExpenseCategories && !categoryError
        ? 'Category / Subategory'
        : 'No Categories available',
    options: optionsExpenseCategories ?? CATEGORY_OPTIONS_DEFAULT,
    variant: 'tracker',
  };

  //---states-------------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  const [expenseData, setExpenseData] = useState(initialExpenseData);

  const [formData, setFormData] = useState(initialFormData);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }

  function categorySelectHandler(
    selectedOption: { value: any; label: string } | null
  ) {
    setExpenseData((prev: ExpenseDataType) => ({
      ...prev,
      ['category']: selectedOption?.value,
    }));
  }
  //=========
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> // with currentTarget
  ) {
    e.preventDefault();
    const { name, value } = e.target;

    //-----------
    //the flag for number quantity type is amount in the name. . neeD to identify the name associated to the numeric input fieldS to evaluate, it may be SEVERAL fields from formData. // Pendiente:  Evaluar usar  un solo componente DropDownSelection

    //********************* */
    if (name === 'amount') {
      const { formatMessage, valueNumber, isError, valueToSave } =
        checkNumberFormatValue(value);

      // Actualizar el estado numerico en el formulario
      setFormData({
        ...formData,
        [name]: value,
      });

      console.log({ formatMessage, valueNumber, isError, valueToSave });

      setValidationMessages((prev) => ({
        ...prev,
        [name]: ` * Format: ${formatMessage}`,
      }));

      if (isError) {
        console.log('Number Format Error occurred');
        setValidationMessages((prev) => ({
          ...prev,
          [name]: ` * Error: ${formatMessage}`,
        }));
      }
      setExpenseData((prev) => ({ ...prev, [name]: valueToSave }));
      return;
    } else {
      setExpenseData((prev) => ({ ...prev, [name]: value }));
    }
  }

  //----------------
  function onSaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On Save Handler');
    e.preventDefault();

    const formattedNumber = numberFormat(expenseData.amount || 0);
    console.log(
      'Expense formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //----------------------------------------------------------------------------
    //validation of entered data
    const newValidationMessages = validationData(expenseData);
    // console.log('validation mgs:', newValidationMessages);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //POST ENDPOINT HERE
    console.log('Expense data state to Post:', expenseData);

    //reset the state and the selected options on select component

    setCurrency(defaultCurrency);
    setExpenseData(initialExpenseData);
    setIsReset(true);
    setValidationMessages({});
    setFormData(initialFormData);

    setTimeout(() => setIsReset(false), 500);
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
      <form className='expense' style={{ color: 'inherit' }}>
        {/* start of TOP CARD */}

        <TopCard
          topCardElements={topCardElements}
          validationMessages={validationMessages}
          updateTrackerData={updateTrackerData}
          trackerName={trackerState}
          currency={currency}
          updateCurrency={updateDataCurrency}
          selectedValue={expenseData.account}
          setSelectState={setExpenseData}
          isReset={isReset}
          setIsReset={setIsReset}
        />

        {/* end of TOP CARD */}

        <CardSeparator />

        {/*start of BOTTOM CARD */}

        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>
            Category{' '}
            <span className='validation__errMsg'>
              {validationMessages['category']}
            </span>
          </div>
          {/* <SelectComponent
            dropDownOptions={categoryOptions}
            setSelectState={setExpenseData}
            seletedValue={expenseData['category']}
            optionKeySelected='category'
            isReset={isReset}
            setIsReset={setIsReset}
          /> */}

          <DropDownSelection
            dropDownOptions={categoryOptions}
            updateOptionHandler={categorySelectHandler}
            isReset={isReset}
            setIsReset={setIsReset}
          />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}
          <CardNoteSave
            title={'note'}
            validationMessages={validationMessages}
            dataHandler={updateTrackerData}
            inputNote={expenseData.note}
            onSaveHandler={onSaveHandler}
          />

          {/* end of BOTTOM CARD */}
        </div>
      </form>
    </>
  );
}

export default Expense;
