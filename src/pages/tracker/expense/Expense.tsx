//src/ages/tracker/expense/Expense.tsx
import { useEffect, useState } from 'react';
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

// import CardNote from '../components/CardNote.tsx';
// import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';
// import { numberFormat } from '../../../helpers/functions.ts';

const CURRENCY_OPTIONS = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
const defaultCurrency = 'usd';
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('', { formatNumberCountry });

//------------------------------

function Expense() {
  //----Expense account Options -------
  const router = useLocation();
  const trackerState = router.pathname.split('/')[2];
  // console.log({ trackerState });

  //account options
  const { data, error: fetchedError } =
    useFetch<ExpenseAccountsType>(url_accounts);

  const optionsExpenseAccounts =
    !fetchedError && data?.accounts?.length
      ? data.accounts.map((acc, _) => ({
          value: acc.name,
          label: acc.name,
        }))
      : [
          { value: 'acc.name_01', label: 'acc.name_01' },
          { value: 'acc.name_02', label: 'acc.name_02' },
          { value: 'acc.name_03', label: 'acc.name_03' },
        ];

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
    options: optionsExpenseCategories ?? [
      { value: 'category_01', label: 'Category_01 / SubCategory 01' },
      { value: 'category_02', label: 'Category_02 / SubCategory 02' },
      { value: 'category_03', label: 'Category_03 / SubCategory 03' },
    ],
  };

  //-----------------
  //input expense data state variables
  type ExpenseDataType = {
    amount: number | string | undefined;
    account: string;
    category: string;
    note: string;
    currency: string;
  };

  const initialExpenseData: ExpenseDataType = {
    amount: undefined,
    account: '',
    category: '',
    note: '',
    currency: defaultCurrency,
  };

  //---states-------------
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [isReset, setIsReset] = useState<boolean>(false);

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //-----useEffect--------
  useEffect(() => {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }, [currency]);

  //----functions--------

  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }

  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const valueToSave =
      e.target.name === 'amount' ? Number(e.target.value) : e.target.value;
    setExpenseData((prev) => ({ ...prev, [e.target.name]: valueToSave }));

    // console.log(
    //   'updateTrackerData:',
    //   { [e.target.name]: e.target.value },
    //   currency
    // );
  }

  // function validationData(stateToValidate: {
  //   [key: string]: string | number | undefined | null;
  // }) {
  //   const errorValidationMessages: { [key: string]: string } = {};

  //   for (const key in stateToValidate) {
  //     const value = stateToValidate[key];

  //     if (!value) {
  //       errorValidationMessages[key] = `* Please provide the ${capitalize(
  //         key
  //       )}`;
  //       continue;
  //     }

  //     if (typeof value === 'number' && value < 0) {
  //       errorValidationMessages[key] = `* ${capitalize(key)} must be positive`;
  //     }

  //     if (typeof value === 'string' && !value) {
  //       errorValidationMessages[key] = `* Please provide the ${capitalize(
  //         key
  //       )}`;
  //     }
  //   }
  //   return errorValidationMessages;
  // }
  //fn

  // function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  // function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   e.preventDefault();
  //   setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  function onSaveHandler() {
    console.log('On Save Handler');

    console.log({ expenseData }); //aqui amount esta como numero

    const formattedNumber = numberFormat(expenseData.amount || 0);
    //se carga en state como string, obedeciendo el formato, pero error de typescript
    //  setExpenseData((prev) => ({ ...prev, amount: formattedNumber }));

    console.log(
      'num formato string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //validation of data entered
    const newValidationMessages = validationData(expenseData);
    // console.log('validation mgs:', newValidationMessages);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      console.log('validation');
      return;
    }

    //do the POST to the endpoint:

    //reset the state and the selected options on select component

    // setExpenseData((prev)=>({...prev, initialExpenseData}));
    setIsReset(true);
    setExpenseData(initialExpenseData);
    setCurrency(defaultCurrency);
    setValidationMessages({});
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
              placeholder={`${trackerState}`}
              // value={numberFormat(
              //   Number(expenseData?.amount) || 0
              // )}

              value={Number(expenseData?.amount) || ''}
              onChange={updateTrackerData}
            />

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
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
            optionKeySelected='account'
            isReset={isReset}
            setIsReset={setIsReset}
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
            <div className='card__screen ' style={{ flex: 0.9 }}>
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
