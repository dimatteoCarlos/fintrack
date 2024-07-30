import { useState } from 'react';
import '../../styles/generalStyles.css';
import { changeCurrency } from '../../../helpers/functions';

import {
  AmountInputScreen,
  CardStatePresentation,
  CardStateTop,
  CardTitle,
  InputSelection,
} from './trackerComponents/TrackerComponents.tsx';
import MySelectComponent from './trackerComponents/SelectComponent.tsx';

export type GlobalStatesType = {
  // availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};

function Expense() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const enteredCurrency = 'usd';
  const formatNumberCountry = currencyOptions[enteredCurrency];

  //-----------------
  //form input expense data state variables
  const initialExpenseData = {
    expenseAmount: '0,000.00',
    expenseAccount: '',
    expenseCategory: '',
    expenseNote: '',
  };

  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(enteredCurrency);

  //functions

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

  function expenseDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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
                onChange={expenseDataHandler}
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

            {/* ******** */}



         <MySelectComponent />


          </CardStateTop>
        </CardStatePresentation>
      </div>
    </>
  );
}

export default Expense;
