import { useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  CategoriesType,
  CategoryType,
  ExpenseAccountsType,
} from '../../../types/types.ts';
import { url_accounts, url_categories } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
// import CardNote from '../components/CardNote.tsx';
// import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';

// import { CardTitle } from '../../../components/CardTitle.tsx';
// import { numberFormat } from '../../../helpers/functions.ts';
// import { changeCurrency } from '../../../helpers/functions.ts';


//------------------------------

function Expense() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];

  //----Expense account Options Temporary values----------

  const { data: accounts, error: fetchedError } =
    useFetch<ExpenseAccountsType>(url_accounts);

  const optionsExpenseAccounts = accounts?.accounts
    ? accounts.accounts.map((acc, _) => ({
        value: acc.name,
        label: acc.name,
      }))
    : 'not info available';

  // console.log('string', { optionsExpenseAccounts }, accounts?.accounts);
  // console.dir( {optionsExpenseAccounts},accounts?.accounts);

  const accountOptions = {
    title: 'Available Account',
    options: optionsExpenseAccounts,
  };

  //collar,broyde, others

  //--------
  const { data: categories } = useFetch<CategoriesType>(url_categories);

  const optionsExpenseCategories = !fetchedError
    ? categories?.categories?.map((cat: CategoryType) => ({
        value: cat.name,
        label: cat.name,
      }))
    : null;

  const categoryOptions = {
    title: optionsExpenseCategories
      ? 'Category / Subategory'
      : 'No Categories available',
    options: optionsExpenseCategories ?? [
      { value: 'category_01', label: 'Category_01 / SubCategory X' },
      { value: 'category_02', label: 'Category_02 / SubCategory X' },
      { value: 'category_03', label: 'Category_03 / SubCategory X' },
    ],
  };
  //-----------------
  //input expense data state variables
  const initialExpenseData = {
    amount: 0,
    account: '',
    category: '',
    note: '',
    currency: 'usd',
  };

  //---states-------------
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  //-----useEffect--------
  useEffect(() => {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }, [currency]);

  //----functions--------
  // function toggleCurrency() {
  //   setCurrency((prev) => changeCurrency(prev));
  // }

  function updateDataCurrency(currency: string) {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
    // console.log('selected starting point:', currency);
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSaveHandler() {
    
    console.log('On Save Handler');

    console.log({ expenseData });

    //do the POST to the endpoint:

    //reset
    setExpenseData(initialExpenseData);
    setCurrency(defaultCurrency);
  }

  //--------------------------

  return (
    <>
      <article className='expense' style={{ color: 'inherit' }}>
        {/* start of top */}
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='number'
              placeholder={initialExpenseData.amount.toString()}
              onChange={inputTrackDataHandler}
              name='amount'
              value={expenseData.amount}
            />

            {/* <div className='icon-currency tracker' onClick={toggleCurrency}>
              {currency.toUpperCase()}
            </div> */}

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
            />
          </div>

          <div className='card--title'>Account</div>

          <SelectComponent dropDownOptions={accountOptions} />
        </div>

        {/* end of top */}
        <CardSeparator />

        {/*start of bottom */}

        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>Category</div>
          <SelectComponent dropDownOptions={categoryOptions} />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

          <div className='card--title'>Note</div>
          {/* <CardNote dataHandler={textareaTrackDataHandler} note={expenseData.note}/> */}

          <div
            className='note--expense'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='card__screen ' style={{ flex: 0.9 }}>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={textareaTrackDataHandler}
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
