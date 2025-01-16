//src/pages/tracker/expense/Expense.tsx
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
import {} from '../../../helpers/functions.ts';
import {
  ACCOUNT_OPTIONS_DEFAULT,
  CATEGORY_OPTIONS_DEFAULT,
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';

const defaultCurrency = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('', { formatNumberCountry });

//input expense data state variables
type ExpenseDataType = {
  amount: number;
  account: string;
  category: string;
  note: string;
  currency: string;
};

const initialExpenseData: ExpenseDataType = {
  amount: 0.0,
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
  useEffect(() => {
    updateDataCurrency(currency);
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
      e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value;
    setExpenseData((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }

  function onSaveHandler() {
    console.log('On Save Handler');

    const formattedNumber = numberFormat(expenseData.amount || 0);

    console.log(
      'formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //validation of entered data
    const newValidationMessages = validationData(expenseData);
    // console.log('validation mgs:', newValidationMessages);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      console.log('validation');
      return;
    }

    //do the POST to the endpoint:

    //reset the state and the selected options on select component

    setIsReset(true);
    setExpenseData(initialExpenseData);
    setCurrency(defaultCurrency);
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
              placeholder={`${trackerState}`}
              // value={numberFormat(
              //    parseFloat(expenseData?.amount) || 0
              // )}

              value={expenseData?.amount}
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
