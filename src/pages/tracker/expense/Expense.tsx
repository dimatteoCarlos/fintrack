//src/pages/tracker/expense/Expense.tsx
import { useState } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';

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
} from '../../../types/types.ts';
import { url_accounts, url_categories } from '../../../endpoints.ts';
import {
  ACCOUNT_OPTIONS_DEFAULT,
  CATEGORY_OPTIONS_DEFAULT,
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';
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

type FormNumberInputType = { amount: string };

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
  };

  //---states-------------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>(initialFormData);

  const [expenseData, setExpenseData] = useState(initialExpenseData);

  const [formData, setFormData] = useState(initialFormData);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }
  //===
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> // with currentTarget
  ) {
    e.preventDefault();
    const { name, value } = e.target;

    //-----------
    //the flag for number quantity type is amount in the name. need to fix it to put it in general . neet to identificy the numeric  name associated to the numeric input field to evaluate, it may be various field from formData. Evaluar un solo componente DropDownSelection

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
          [name]: ` *Error: ${formatMessage}`,
        }));
      }

      setExpenseData((prev) => ({ ...prev, [name]: valueToSave }));
      return;
    } else {
      setExpenseData((prev) => ({ ...prev, [name]: value }));
    }
  }

  //---
  function onSaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On Save Handler');
    e.preventDefault();

    const formattedNumber = numberFormat(expenseData.amount || 0);
    console.log(
      'Expense formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //----------------------------------------------------------------------------------------
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

    setIsReset(true);
    setCurrency(defaultCurrency);
    setExpenseData(initialExpenseData);
    setValidationMessages({});
    setFormData(initialFormData);

    setTimeout(() => setIsReset(false), 500);
  }

  //--------------------------

  return (
    <>
      <form className='expense' style={{ color: 'inherit' }}>
        {/* start of TOP CARD */}
        <div className='state__card--top'>
          <div className='card--title'>
            Amount
            <span
              className='validation__errMsg'
              style={{
                color: `${
                  validationMessages['amount']?.includes('Format:') //attention to flag 'Format:' in messages
                    ? 'green'
                    : 'red'
                }`,
              }}
            >
              {validationMessages['amount']}
            </span>
          </div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              name='amount'
              type='text'
              placeholder={`${trackerState}`}
              value={formData.amount} //only for numeric values
              onChange={updateTrackerData}
            />

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
              currency={currency}
            />
          </div>

          <div className='card--title'>
            Account{' '}
            <span className='validation__errMsg'>
              {' '}
              {validationMessages['account']}
            </span>
          </div>

          <SelectComponent
            dropDownOptions={accountOptions}
            setSelectState={setExpenseData}
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='account'
            selectedValue={expenseData['account']}
          />
        </div>
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
          <SelectComponent
            dropDownOptions={categoryOptions}
            setSelectState={setExpenseData}
            optionKeySelected='category'
            isReset={isReset}
            setIsReset={setIsReset}
            seletedValue={expenseData['category']}
          />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

          <div className='card--title'>
            Note{' '}
            <span className='validation__errMsg'>
              {validationMessages['note']}
            </span>
          </div>

          {/* <CardNote dataHandler={textareaTrackDataHandler} note={expenseData.note}/> */}

          <div
            className='note--expense'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='card__screen  ' style={{ flex: 0.95 }}>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={updateTrackerData}
                name='note'
                rows={3}
                maxLength={150}
                value={expenseData.note}
              />
            </div>

            <FormPlusBtn onClickHandler={onSaveHandler} />
          </div>

          {/* end of BOTTOM CARD */}
        </div>
      </form>
    </>
  );
}

export default Expense;
