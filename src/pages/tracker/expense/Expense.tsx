//src/pages/tracker/expense/Expense.tsx
import { useState } from 'react';
// import { useEffect } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  CategoriesType,
  CategoryType,
  CurrencyType,
  ExpenseAccountsType,
} from '../../../types/types.ts';
import { url_accounts, url_categories } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import { useLocation } from 'react-router-dom';
import { numberFormat, validationData } from '../../../helpers/functions.ts';
import {} from '../../../helpers/functions.ts';
import {
  ACCOUNT_OPTIONS_DEFAULT,
  CATEGORY_OPTIONS_DEFAULT,
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';

//-----temporarily 'till decide how to handle currencies
const defaultCurrency = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('', { formatNumberCountry });

// ********************PENDEINTE
// INCLUIR VALIDACION POR NOTACION cientifica, hacer un componente input que incluya validacion en tiemo real, evaluar si mantener la validacion global al hacer submit, manejo de los mensajes de validacion.
//verificar opciones inputmode para que aparezca solo teclado numerico, validacion con patter html, de una en el input

//------------------------------------------------------
//input expense data state variables
type ExpenseDataType = {
  amount: number | '';
  account: string;
  category: string;
  note: string;
  currency: string;
};

const initialExpenseData: ExpenseDataType = {
  amount: '',
  account: '',
  category: '',
  note: '',
  currency: defaultCurrency,
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
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [isReset, setIsReset] = useState<boolean>(false);

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //-----useEffect--------
  // useEffect(() => {
  //   updateDataCurrency(currency);
  // }, [currency]);

  //----functions--------
  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }

  // function checkNumberValue(value: number | string) {
  //   console.log('value:', typeof value);
  //   const result =
  //     typeof value === 'number'
  //       ? value
  //       : value !== '' && !isNaN(parseFloat(value))
  //       ? parseFloat(value.trim().replace(',', '.'))
  //       : NaN;
  //   if (isNaN(result)) {
  //     setValidationMessages((prev) => ({
  //       ...prev,
  //       [validationMessages['amount']]: 'Please insert a valid number',
  //     }));
  //   }

  //   return result;
  // }
  function checkNumberValue(value: number | string) {
    console.log('value:', typeof value);

    // Si el valor es un número, lo devolvemos directamente
    let result =
      typeof value === 'number'
        ? value
        : value !== '' && !isNaN(parseFloat(value.replace(',', '.')))
        ? parseFloat(value.trim().replace(',', '.')) // Normalizamos la coma a punto y parseamos
        : NaN;

    // Si el resultado es NaN, mostramos el mensaje de validación
    if (isNaN(result)) {
      setValidationMessages((prev) => ({
        ...prev,
        amount: 'Please insert a valid number',
      }));
    }

    return result;
  }

  function updateTrackerData(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // e.preventDefault();
    const { name, value } = e.currentTarget;
    // const { name, value } = e.target;

    const valueToSave =
      name === 'amount' && !isNaN(checkNumberValue(value))
        ? checkNumberValue(value)
        : value;

    // const valueToSave =
    //   name === 'amount' && !isNaN(parseFloat(value)) && value.trim() !== ''
    //     ? value.includes(',')
    //       ? parseFloat(value.replace(',', '.'))
    //       : parseFloat(value)
    //     : value;

    setExpenseData((prev) => ({ ...prev, [name]: valueToSave }));
  }

  function onSaveHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On Save Handler');
    e.preventDefault();
    //temporarily 'till defining what format the numbers will be saved. Options: in ddbb as number, when showing as string with format
    const formattedNumber = numberFormat(expenseData.amount || 0);
    console.log(
      'Expense formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //----------------------------------------------------------------------------------------
    //validation of entered data
    const newValidationMessages = validationData(expenseData);
    console.log('validation mgs:', newValidationMessages);

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

    setTimeout(() => setIsReset(false), 500);
  }

  //--------------------------

  return (
    <>
      <article className='expense' style={{ color: 'inherit' }}>
        {/* start of top */}
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
              value={expenseData?.amount}
              onInput={updateTrackerData}
              // onChange={updateTrackerData}
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
        {/* end of top */}

        <CardSeparator />

        {/*start of bottom */}
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

          {/* end of bottom */}
        </div>

        {/* <FormSubmitBtn
          // btnTitle={'save'}
          onClickHandler={onSaveHandler}
        >
          {'save'}
        </FormSubmitBtn> */}
      </article>
    </>
  );
}

export default Expense;
