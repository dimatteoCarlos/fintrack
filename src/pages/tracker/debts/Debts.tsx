import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';
// import { numberFormat } from '../../../helpers/functions.ts';
import CardSeparator from '../components/CardSeparator.tsx';

import {
  AmountInputScreen,
  CardDateScreen,
  CardTitle,
  CardType,
  CardTypeAndDateContainer,
  CardTypeScreen,
} from '../components/TrackerComponents.tsx';

import SelectComponent from '../components/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import { CardDate } from '../components/TrackerComponents.tsx';

import TrackerDatepicker from '../components/TrackerDatepicker.tsx';

//------------------------------

function Debts() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  // console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);

  //----Debts Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };
  //-----------------
  //input debts data state variables
  const initialData = {
    amount: 0,
    account: '',
    currency: 'usd',
    type: 'deposit',
    date: new Date(),
    note: '',
  };
  //---states------
  const [Data, setData] = useState(initialData);

  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  const [type, setType] = useState<'lend' | 'borrow'>('lend');

  //-----useEffect--------
  useEffect(() => {
    setData((prev) => ({ ...prev, currency: currency }));

    setData((prev) => ({ ...prev, type: type }));
  }, [currency, type]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(Data);
  }

  function toggleType() {
    const current = (type: 'lend' | 'borrow') => {
      if (type == 'lend') {
        return 'borrow';
      } else if (type == 'borrow') {
        return 'lend';
      } else {
        return 'lend';
      }
    };
    setType((prev) => current(prev));
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  function changeDate(selectedDate: Date): void {
    setData((prev) => ({ ...prev, date: selectedDate }));
    // console.log(Data);
  }

  //--------------------------

  return (
    <>
      <article className='debts' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='number'
              placeholder='0,000.00'
              onChange={inputTrackDataHandler}
              name='amount'
              value={`${Data.amount}`}
            />

            <div className='icon-currency' onClick={toggleCurrency}>
              {currency.toUpperCase()}
            </div>
          </div>

          <div className='card--title'>Account</div>
          <SelectComponent dropDownOptions={accountOptions} />
        </div>
        <div className='state__card--bottom'>
          <CardSeparator />

          {/* APPLY DEBOUNCE TO INPUT AND TEXTAREA*/}

          <div className='card__typeDate__container'>
            <div className='card__typeDate--type'>
              <div className='card--title'>Type</div>
              <button className='card__screen--type' onClick={toggleType}>
                <div className='screen--concept' >
                  {type}
                </div>
              </button>
            </div>

            <div className='card__typeDate--date'>
              <div className='card--title'>Date</div>
              <div className='card__screen--date'>
                <TrackerDatepicker
                  changeDate={changeDate}
                  date={Data.date}
                ></TrackerDatepicker>
              </div>
            </div>
          </div>

          <div className='card--title'>Note</div>
          <div className='card__screen'>
            <textarea
              className='input__note__description'
              placeholder='Description'
              onChange={textareaTrackDataHandler}
              name='note'
              rows={3}
              maxLength={150}
              value={Data.note}
            />
          </div>

          <FormSubmitBtn onClickHandler={onSaveHandler}>{'save'}</FormSubmitBtn>
        </div>
      </article>
    </>
  );
}

export default Debts;
