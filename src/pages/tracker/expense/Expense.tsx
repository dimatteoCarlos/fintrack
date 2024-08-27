import { useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';
import FormSubmitBtn from '../../../components/formSubmitBtn/FormSubmitBtn.tsx';

import CurrencyBadge from '../../../components/currencyBadge/CurrencyBadge.tsx';
import DropDownSelection from '../../../components/dropdownSelection/DropDownSelection.tsx';
import { changeCurrency } from '../../../helpers/functions.ts';
// import { CardTitle } from '../../../components/CardTitle.tsx';
// import { numberFormat } from '../../../helpers/functions.ts';

//------------------------------

function Expense() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];

  //----Expense Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
    variant: 'tracker',
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
    variant: 'tracker',
  };

  //input expense data state variables
  const initialExpenseData = {
    amount: '0,000.00',
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

  function updateDataCurrency(currency: string) {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
    console.log('selected starting point:', currency);
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function updateAccount(selectedOption: { value: string; label: string }) {
    setExpenseData((prev) => ({
      ...prev,
      account: selectedOption.value,
    }));
  }
  function updateCategory(selectedOption: { value: string; label: string }) {
    setExpenseData((prev) => ({
      ...prev,
      category: selectedOption.value,
    }));
    // console.log('selectedOption', selectedOption);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
    console.log(expenseData);

    //reset expenseData
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
              type='text'
              placeholder={'0,000.00'}
              onChange={inputTrackDataHandler}
              name='amount'
              value={`${expenseData.amount}`}
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

          {/* <SelectComponent dropDownOptions={accountOptions} /> */}
          <DropDownSelection
            dropDownOptions={accountOptions}
            updateOptionHandler={updateAccount}
          />
        </div>

        {/* end of top */}
        <CardSeparator />

        {/*start of bottom */}

        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>Category</div>
          {/* <SelectComponent dropDownOptions={categoryOptions} /> */}
          <DropDownSelection
            dropDownOptions={categoryOptions}
            updateOptionHandler={updateCategory}
          />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

          <div className='card--title'>Note</div>

          <div className='card__screen'>
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
        </div>
        {/* end of bottom */}

        <FormSubmitBtn
          // btnTitle={'save'}
          onClickHandler={onSaveHandler}
        >
          {'save'}
        </FormSubmitBtn>
      </article>
    </>
  );
}

export default Expense;
