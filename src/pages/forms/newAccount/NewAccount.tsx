import React, { useState } from 'react';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';

import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';

import FormSubmitBtn from '../../../components/formSubmitBtn/FormSubmitBtn.tsx';

import DropDownSelection from '../../../components/dropdownSelection/DropDownSelection';
import CurrencyBadge from '../../../components/currencyBadge/CurrencyBadge';
import FormDatepicker from '../../../components/datepicker/Datepicker.tsx';

import '../styles/forms-styles.css';

//----Temporary data----------

const accountTypeSelectionProp = {
  title: 'Type',
  options: [
    {
      value: 'accountType_01',
      label: 'Account Type 01',
    },
    {
      value: 'accountType_02',
      label: 'Account Type 02',
    },
    {
      value: 'accountType_03',
      label: 'Account Type 03',
    },
  ],
  variant: 'form',
};

const initialNewAccountData = {
  name: 'Account Name',
  type: 'Account Type',
  date: new Date(), //'Starting Point'
  amount: '0.0', // 'Value'
  currency: 'usd',
};

type AccountDataType = {
  name: string;
  date: Date;
  type: string;
  amount: number | string;
  currency: string;
  // account: string | number;
};

//-------------------------------
function NewAccount() {
  const location = useLocation();
  //---states------
  const [accountData, setAccountData] = useState<AccountDataType>(
    initialNewAccountData
  );
  //---functions-----
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setAccountData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.name);
  }

  function accountTypeSelectHandler(selectedOption: {
    value: string;
    label: string;
  }) {
    setAccountData((acc) => ({ ...acc, type: selectedOption.value }));
    console.log('selectedOption', selectedOption);
  }

  function changeStartingPoint(selectedDate: Date) {
    setAccountData((acc) => ({ ...acc, date: selectedDate }));
    console.log('selected starting point:', selectedDate);
  }

  function updateAccountDataCurrency(currency: string) {
    setAccountData((acc) => ({ ...acc, currency: currency }));
    console.log('selected starting point:', currency);
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('submit btn clicked');
    e.preventDefault();
    setAccountData(initialNewAccountData);
  }

  return (
    <section className='account__page__container page__container'>
      <TopWhiteSpace variant={'dark'} />

      <div className='account__page__content page__content'>
        <div className='main__title--container'>
          <Link
            to={location.state.previousRoute}
            relative='path'
            className='iconLeftArrow'
          >
            {/* <Link to='..' relative='path' className='iconLeftArrow'> */}

            <LeftArrowLightSvg />
          </Link>
          <div className='form__title'>{'New Account'}</div>
        </div>

        <form className='form__box'>
          <div className=' form__container'>
            <div className='input__box'>
              <label htmlFor='name' className='label form__title'>
                {'Account Name'}
              </label>
              <input
                type='text'
                className='input__container'
                placeholder='Name'
                name='name'
                onChange={inputHandler}
                value={accountData.name}
              />
            </div>
            <div className='input__box'>
              <label className='label form__title'>Account Type</label>

              <DropDownSelection
                dropDownOptions={accountTypeSelectionProp}
                updateOptionHandler={accountTypeSelectHandler}
              />
            </div>

            <div className='account__dateAndCurrency'>
              <div className='account__date'>
                <label className='label form__title'>{'Starting Point'}</label>

                <div className='form__datepicker__container'>
                  <FormDatepicker
                    changeDate={changeStartingPoint}
                    date={accountData.date}
                    variant={'form'}
                  ></FormDatepicker>
                </div>
              </div>

              <div className='account__currency'>
                <div className='label form__title'>Currency</div>
                <CurrencyBadge
                  updateOutsideCurrencyData={updateAccountDataCurrency}
                  variant='form'
                ></CurrencyBadge>
              </div>
            </div>
            <div className='input__box'>
              <label htmlFor='amount' className='label form__title'>
                {'value'}
              </label>
              <input
                type='text'
                className='input__container input__container--amount'
                placeholder='0.00'
                name='amount'
                onChange={inputHandler}
                value={`${accountData.amount}`} // if amount is a number
                // value={accountData.amount}
                style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
              />
            </div>
          </div>

          <div className='submit__btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewAccount;
