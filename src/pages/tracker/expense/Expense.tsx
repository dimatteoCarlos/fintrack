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
// console.log('', { formatNumberCountry });

// ********************PENDEINTE
// INCLUIR VALIDACION POR NOTACION cientifica, hacer un componente input que incluya validacion en tiemo real, evaluar si mantener la validacion global al hacer submit, manejo de los mensajes de validacion.
//verificar opciones inputmode para que aparezca solo teclado numerico, validacion con patter html, de una en el input

//PROBAR formData para actualizar los valores de los inputs del formulario, mientras se evaluan como string, y se muestra el mensaje de validacion en tiempo real, paralelamente,  MANEJAR aparte los valores que se grabaran en el estado expense data, convirtiendolos a numero estandar, tal vez sea otra funcion de conversion a numero, mientra la que ya escribi sea para validar el estado de validacion, mientras se guarda el resultado, para actualizar el estado, que luego va al backend para guardarlo en bse de datos como numero, etc.

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

// type FormNumberInputType = Omit<ExpenseDataType, 'amount'> & { amount: string };
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
  //-------
  function checkNumberFormatValue(value: string): {
    formatMessage: string;
    valueNumber: string;
    valueToSave: number;
    isError: boolean;
  } {
    console.log('value:', value, typeof value);
    const onlyDotDecimalSep = /^\d*(\.\d*)?$/g; //Normal numeric Format
    const commaSepFormat = /^(\d{1,3})(,\d{3})*(\.\d*)?$/g;
    const dotSepFormat = /^(\d{1,3})(\.\d{3})*(,\d*)?$/g;
    const onlyCommaDecimalSep = /^\d*(\,\d*)$/g;
    const notMatching = /([^0-9.,])/g;

    //no matching character
    if (notMatching.test(value)) {
      return {
        formatMessage: `not a valid number: ${value.match(notMatching)}`,
        isError: true,
        valueNumber: value.toString(),
        valueToSave: 0,
      };
    }
    //normal number
    if (onlyDotDecimalSep.test(value)) {
      const valueNumber = !isNaN(parseFloat(value)) ? parseFloat(value) : 0;

      return {
        formatMessage: 'normal numeric input', //'no separators with optional dot as decimal sep ',
        valueNumber: valueNumber.toString(),
        valueToSave: valueNumber,
        isError: false,
      };
    }

    //only comma decimal

    if (onlyCommaDecimalSep.test(value)) {
      const valueNumber = !isNaN(parseFloat(value.replace(',', '.')))
        ? parseFloat(value.replace(',', '.'))
        : 0;

      return {
        formatMessage: ' comma as dec. sep.',
        valueNumber: valueNumber.toString(),
        valueToSave: valueNumber,
        isError: false,
      };
    }

    //comma separator, decimal dot
    if (commaSepFormat.test(value)) {
      const valueNumber = !isNaN(parseFloat(value.replace(/,/g, '')))
        ? parseFloat(value.replace(/,/g, ''))
        : 0;

      return {
        formatMessage: 'comma as th-sep , dot as dec-sep',
        valueToSave: valueNumber,
        valueNumber: value.toString(),
        isError: false,
      };
    }

    //dot as thousand separator, comma as decimal separator
    if (dotSepFormat.test(value)) {
      const valueNumber = !isNaN(
        parseFloat(value.replace(/\./g, '').replace(',', '.'))
      )
        ? parseFloat(
            parseFloat(value.replace(/\./g, '').replace(',', '.')).toFixed(2)
          ) //fixed does not work
        : 0;

      return {
        formatMessage: 'dot th-sep, comma dec-sep',
        valueToSave: valueNumber,
        valueNumber: value.toString(),
        isError: false,
      };
    }

    //----

    return {
      formatMessage: `Number format not valid`,
      isError: true,
      valueNumber: '',
      valueToSave: 0,
    };
  }

  //===
  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> // with currentTarget
  ) {
    e.preventDefault();
    const { name, value } = e.target;

    //-----------
    //the flag for number quantity type is amount in the name. need to fix it to put it in general receiven the numeric  name associated to the numeric input field to evaluate, it may be various field from formData

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
        {/* start of card top */}
        <div className='state__card--top'>
          <div className='card--title'>
            Amount
            <span
              className='validation__errMsg'
              style={{
                color: `${
                  validationMessages['amount']?.includes('Format')
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
        {/* end of card top */}

        <CardSeparator />

        {/*start of card bottom */}
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
      </form>
    </>
  );
}

export default Expense;
