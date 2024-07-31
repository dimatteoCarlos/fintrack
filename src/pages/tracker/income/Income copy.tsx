import { useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';

import {
  AmountInputScreen,
  CardSeparator,
  CardStatePresentation,
  CardStateTop,
  CardTitle,
} from '../trackerComponents/TrackerComponents.tsx';

import SelectComponent from '../trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

export type GlobalStatesType = {
  // availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};

//------------------------------

function Income() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const enteredCurrency = 'usd';
  const formatNumberCountry = currencyOptions[enteredCurrency];

  //----Income Options Temporary----------

  const incomeAccountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };
  //-----------------
  const incomeCategoryOptions = {
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
  //form input income data state variables
  const initialIncomeData = {
    incomeAmount: '0,000.00',
    incomeAccount: '',
    incomeCategory: '',
    incomeNote: '',
  };
  //---states------
  const [incomeData, setIncomeData] = useState(initialIncomeData);
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

  function inputIncomeDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function textareaIncomeDataHandler() {
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  //--------------------------

  return (
    <>
      <div className='income' style={{ color: 'inherit' }}>
        <CardStatePresentation>
          <CardStateTop>
            <CardTitle>Amount</CardTitle>

            <AmountInputScreen>
              <input
                className='inputNumber'
                type='number'
                placeholder={'0,000.00'}
                onChange={inputIncomeDataHandler}
                name='incomeAmount'
                value={incomeData.incomeAmount}

                // value={`${numberFormat(incomeData.incomeAmount)}`}
              />

              <div className='icon-currency' onClick={toggleCurrency}>
                {currency.toUpperCase()}
              </div>
            </AmountInputScreen>

            <CardTitle>Account</CardTitle>
            <SelectComponent dropDownOptions={incomeAccountOptions} />

            <CardSeparator />
            <CardTitle>Category</CardTitle>
            <SelectComponent dropDownOptions={incomeCategoryOptions} />

            {/* APLICAR DEBOUNCE A TEXTAREA -  cual es el evento en textarea?*/}

            <CardTitle>Note</CardTitle>
            <AmountInputScreen>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={textareaIncomeDataHandler}
                name='incomeNote'
                value={incomeData.incomeNote}
                rows={3}
                maxLength={250}
              />
            </AmountInputScreen>

            <FormSubmitBtn
              btnTitle={'save'}
              onClickHandler={onSaveHandler}
            ></FormSubmitBtn>
          </CardStateTop>
        </CardStatePresentation>
      </div>
    </>
  );
}

export default Income;
