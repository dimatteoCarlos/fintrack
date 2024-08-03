import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';
// import { numberFormat } from '../../../helpers/functions.ts';

import {
  AmountInputScreen,
  CardDateScreen,
  CardSeparator,
  CardTitle,
  CardType,
  CardTypeAndDateContainer,
  CardTypeScreen,
} from '../trackerComponents/TrackerComponents.tsx';

import SelectComponent from '../trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import { CardDate } from '../trackerComponents/TrackerComponents';

import TrackerDatepicker from '../trackerComponents/TrackerDatepicker.tsx';

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
        <CardTitle>Amount</CardTitle>

        <AmountInputScreen>
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
        </AmountInputScreen>

        <CardTitle>Account</CardTitle>
        <SelectComponent dropDownOptions={accountOptions} />

        <CardSeparator />

        {/* APPLY DEBOUNCE TO INPUT AND TEXTAREA*/}

        <CardTypeAndDateContainer>
          <CardType>
            <CardTitle>Type</CardTitle>
            <CardTypeScreen>
              <div className='screen--concept' onClick={toggleType}>
                {type}
              </div>
            </CardTypeScreen>
          </CardType>

          <CardDate>
            <CardTitle>Date</CardTitle>
            <CardDateScreen>
              <TrackerDatepicker
                changeDate={changeDate}
                date={Data.date}
              ></TrackerDatepicker>
            </CardDateScreen>
          </CardDate>
        </CardTypeAndDateContainer>

        <CardTitle>Note</CardTitle>
        <AmountInputScreen>
          <textarea
            className='input__note__description'
            placeholder='Description'
            onChange={textareaTrackDataHandler}
            name='note'
            rows={3}
            maxLength={150}
            value={Data.note}
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

export default Debts;
