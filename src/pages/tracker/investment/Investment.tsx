import { useEffect, useState } from 'react';

import SelectComponent from '../components/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import CardSeparator from '../components/CardSeparator.tsx';

// import TrackerDatepicker from '../components/TrackerDatepicker.tsx';
// import Datepicker from '../components/TrackerDatepicker.tsx';
// import Datepicker from '../components/TrackerDatepicker.tsx';

import { changeCurrency } from '../../../helpers/functions.ts';
import Datepicker from '../../../components/datepicker/Datepicker.tsx';
// import { numberFormat } from '../../../helpers/functions.ts';

//------------------------------

function Investment() {
  const defaultCurrency = 'usd';
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  // console.log('🚀 ~ Investment ~ formatNumberCountry:', formatNumberCountry);

  //----Investment Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };

  //-----------------
  //input investment data state variables
  const initialInvestmentData = {
    amount: '0,000.00',
    account: '',
    currency: 'usd',
    type: 'deposit',
    date: new Date(),
    note: '',
  };
  //---states------
  const [investmentData, setInvestmentData] = useState(initialInvestmentData);

  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  const [typeInv, setTypeInv] = useState<'deposit' | 'withdraw'>('deposit');

  //-----useEffect--------
  useEffect(() => {
    setInvestmentData((prev) => ({ ...prev, currency: currency }));

    setInvestmentData((prev) => ({ ...prev, type: typeInv }));

    //It shows previous state data
    // console.log(investmentData);
  }, [currency, typeInv]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInvestmentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setInvestmentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(investmentData);
  }

  function toggleTypeInv() {
    const current = (typeInv: 'deposit' | 'withdraw') => {
      if (typeInv == 'deposit') {
        return 'withdraw';
      } else if (typeInv == 'withdraw') {
        return 'deposit';
      } else {
        return 'deposit';
      }
    };
    setTypeInv((prev) => current(prev));
    // console.log('current:', current, typeof current);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  function changeInvestmentDate(selectedDate: Date): void {
    setInvestmentData((prev) => ({ ...prev, date: selectedDate }));
    // console.log(investmentData);
  }

  //--------------------------

  return (
    <>
      <article className='investment' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='text'
              placeholder={'0,000.00'}
              onChange={inputTrackDataHandler}
              name='amount'
              value={`${investmentData.amount}`}

              // value={`${numberFormat(Number.parseFloat(investmentData.amount), formatNumberCountry)}`}
            />

            <div className='icon-currency' onClick={toggleCurrency}>
              {currency.toUpperCase()}
            </div>
          </div>
          <div className='card--title'>Account</div>
          <SelectComponent dropDownOptions={accountOptions} />
        </div>
        <CardSeparator />

        {/* APPLY DEBOUNCE TO INPUT AND TEXTAREA*/}
        <div className='state__card--bottom'>
          <div className='card__typeDate__container'>
            <div className='card__typeDate--type'>
              <div className='card--title'>Type</div>
              <button className='card__screen--type' onClick={toggleTypeInv}>
                <div className='screen--concept'>{typeInv}</div>
              </button>
            </div>

            <div className='card__typeDate--date'>
              <div className='card--title'> Date </div>
              <div className='card__screen--date'>
                {/* <TrackerDatepicker */}
                <Datepicker
                  changeDate={changeInvestmentDate}
                  date={investmentData.date}
                  variant={'tracker'}
                  >
                   
                  </Datepicker>
                {/* ></TrackerDatepicker> */}
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
              value={investmentData.note}
            />
          </div>
          {/* <CardNote note={investmentData.note} dataHandler={textareaTrackDataHandler}/> */}
        </div>
        <FormSubmitBtn onClickHandler={onSaveHandler}>{'save'}</FormSubmitBtn>
      </article>
    </>
  );
}

export default Investment;
