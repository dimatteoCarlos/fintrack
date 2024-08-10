//
import '../../styles/generalStyles.css';
import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';

import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import CardNote from '../components/CardNote.tsx';

function Income() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  // console.log(formatNumberCountry);

  //----Income Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
      { value: 'account_04', label: 'Account_04' },
    ],
  };
  //--------
  const sourceOptions = {
    title: 'Source of income',
    options: [
      { value: 'source_01', label: 'source_01' },
      { value: 'source_02', label: 'source_02' },
      { value: 'source_03', label: 'source_03' },
      { value: 'source_04', label: 'source_04' },
    ],
  };

  //-----------------
  //input income data state variables
  const initialIncomeData = {
    amount: '0,000.00',
    account: '',
    source: '',
    note: '',
    currency: 'usd',
  };
  //---states------
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  //-----useEffect--------
  useEffect(() => {
    setIncomeData((prev) => ({ ...prev, currency: currency }));
  }, [currency]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(incomeData);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  //--------------------------

  return (
    <>
      <article className='income' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='text'
              placeholder={'0,000.00'}
              onChange={inputTrackDataHandler}
              name='amount'
              value={`${incomeData.amount}`}
            />

            <div className='icon-currency' onClick={toggleCurrency}>
              {currency.toUpperCase()}
            </div>
          </div>

          <div className='card--title'>Account</div>
          <SelectComponent dropDownOptions={accountOptions} />
        </div>

        <CardSeparator />

        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>Source</div>
          <SelectComponent dropDownOptions={sourceOptions} />

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
              value={incomeData.note}
            />
          </div>

          {/* <CardNote note={incomeData.note} dataHandler={textareaTrackDataHandler}/> */}
        </div>
        <FormSubmitBtn onClickHandler={onSaveHandler}>{'save'}</FormSubmitBtn>
      </article>
    </>
  );
}

export default Income;
