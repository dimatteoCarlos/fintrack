import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';
import { numberFormat } from '../../../helpers/functions.ts';

import {
  AmountInputScreen,
  CardSeparator,
  CardTitle,
} from '../trackerComponents/TrackerComponents.tsx';
import SelectComponent from '../trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

//------------------------------

function Expense() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

  //----Expense Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };
  //--------
  const categoryOptions = {
    title: 'Category / Subategory',
    options: [
      { value: 'category_01', label: 'Category_01 / SubCategory X' },
      { value: 'category_02', label: 'Category_02 / SubCategory X' },
      { value: 'category_03', label: 'Category_03 / SubCategory X' },
      { value: 'category_04', label: 'Category_04 / SubCategory X' },
      { value: 'category_05', label: 'Category_05 / SubCategory X' },
      { value: 'category_06', label: 'Category_06 / SubCategory X' },
    ],
  };
  //-----------------
  //input expense data state variables
  const initialExpenseData = {
    amount: '0,000.00',
    account: '',
    category: '',
    note: '',
    currency: 'usd',
  };
  //---states------
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  //-----useEffect--------
  useEffect(() => {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
    //shows previous state data
    // console.log(expenseData);
  }, [currency]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(expenseData);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  //--------------------------

  return (
    <>
      <article className='expense' style={{ color: 'inherit' }}>
        <CardTitle>Amount</CardTitle>

        <AmountInputScreen>
          <input
            className='inputNumber'
            type='text'
            placeholder={'0,000.00'}
            onChange={inputTrackDataHandler}
            name='amount'
            value={`${expenseData.amount}`}
            // value={`${numberFormat(Number.parseFloat(expenseData.amount), formatNumberCountry)}`}
          />

          <div className='icon-currency' onClick={toggleCurrency}>
            {currency.toUpperCase()}
          </div>
        </AmountInputScreen>

        <CardTitle>Account</CardTitle>
        <SelectComponent dropDownOptions={accountOptions} />

        {/* <CardSeparator /> */}
        <CardTitle>Category</CardTitle>
        <SelectComponent dropDownOptions={categoryOptions} />

        {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

        <CardTitle>Note</CardTitle>
        <AmountInputScreen>
          <textarea
            className='input__note__description'
            placeholder='Description'
            onChange={textareaTrackDataHandler}
            name='note'
            rows={3}
            maxLength={150}
            value={expenseData.note}
          />
        </AmountInputScreen>

        <FormSubmitBtn
          btnTitle={'save'}
          onClickHandler={onSaveHandler}
        ></FormSubmitBtn>
      </article>
    </>
  );
}

export default Expense;
