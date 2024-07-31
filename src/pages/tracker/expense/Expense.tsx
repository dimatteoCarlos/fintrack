import { useState } from 'react';
import { changeCurrency } from '../../../helpers/functions';

import {
  AmountInputScreen,
  CardNote,
  CardSeparator,
  CardStatePresentation,
  CardStateTop,
  CardTitle,
} from './trackerComponents/TrackerComponents.tsx';



import SelectComponent from './trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

export type GlobalStatesType = {
  // availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};

//------------------------------

function Expense() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const enteredCurrency = 'usd';
  const formatNumberCountry = currencyOptions[enteredCurrency];

  //----Expense Options Temporary----------

  const expenseAccountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };
  //-----------------
  const expenseCategoryOptions = {
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
  //form input expense data state variables
  const initialExpenseData = {
    expenseAmount: '0,000.00',
    expenseAccount: '',
    expenseCategory: '',
    expenseNote: '',
  };
  //---states------
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(enteredCurrency);

  //----functions--------

  function numberFormat(x: number | string) {
    const formatter = new Intl.NumberFormat(formatNumberCountry, {
      useGrouping: true,
    });
    const formattedNumber = formatter.format(Number(x));
    console.log(Number(formattedNumber), formattedNumber);
    return formattedNumber;
  }

  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputExpenseDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function textareaExpenseDataHandler() {
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSaveHandler(){
    console.log('On Save Handler')
  }

  //--------------------------

  return (
    <>
      <div className='expense' style={{ color: 'inherit' }}>
        <CardStatePresentation>
          <CardStateTop>
            <CardTitle>Amount</CardTitle>

            <AmountInputScreen>
              <input
                className='inputNumber'
                type='number'
                placeholder={'0,000.00'}
                onChange={inputExpenseDataHandler}
                name='expenseAmount'
                value={expenseData.expenseAmount}
                // max={99999999999999}
                // maxLength={15}
                // value={`${numberFormat(expenseData.expenseAmount)}`}
              />

              <div className='icon-currency' onClick={toggleCurrency}>
                {currency.toUpperCase()}
              </div>
            </AmountInputScreen>

            <CardTitle>Account</CardTitle>
            <SelectComponent dropDownOptions={expenseAccountOptions} />

            <CardSeparator />
            <CardTitle>Category</CardTitle>
            <SelectComponent dropDownOptions={expenseCategoryOptions} />

            {/* APLICAR DEBOUNCE A TEXTAREA -  cual es el evento en textarea?*/}

            <CardTitle>Note</CardTitle>
            <AmountInputScreen>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={textareaExpenseDataHandler}
                name='expenseNote'
                value={expenseData.expenseNote}
                rows={3}
                maxLength={250}
              />
            </AmountInputScreen>

            <FormSubmitBtn  btnTitle={'save'} onClickHandler={onSaveHandler} ></FormSubmitBtn>
          </CardStateTop>
        </CardStatePresentation>
      </div>
    </>
  );
}

export default Expense;
