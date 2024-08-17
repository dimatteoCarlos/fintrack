import { Link } from 'react-router-dom';
import { useState } from 'react';
import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import Dots3LightSvg from '../../../assets/Dots3LightSvg.svg';

import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn';
import DropDownSelection from '../../../components/dropdownSelection/DropDownSelection';
import FormDatepicker from '../../../components/datepicker/Datepicker.tsx';
import '../styles/forms-styles.css';

function PocketDetail() {
  //temporary data

  const pocketInfo = {
    name: 'pocket name',
    note: 'Description',
    date: new Date(),
    account: '',
    amount: '0',
  };

  //Account Options
  const accountSelectionProp = {
    title: 'account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
    variant: 'form', //define the custom styles to use in selection dropdown component
  };

 

  const initialPocketDetail = {
    pocketInfo,
  };

  const [pocketDetail, setPocketDetail] = useState(initialPocketDetail);

  //--functions---
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPocketDetail((prevState) => ({
      ...prevState,
      pocketInfo: { ...pocketInfo, [e.target.name]: e.target.value },
    }));
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPocketDetail(initialPocketDetail);
  }

  function accountSelectHandler(selectedOption: {
    value: string;
    label: string;
  }) {
    setPocketDetail((prev) => ({
      ...prev,
      pocketInfo: { ...pocketInfo, account: selectedOption.value },
    }));
    console.log('selectedOption', selectedOption);
  }

  function changeDesiredDate(selectedDate: Date) {
    setPocketDetail((prevState) => ({
      ...prevState,
      pocketInfo: { ...pocketInfo, date: selectedDate },
    }));
  }

  return (
    <>
      <section className='page__container'>
        <TopWhiteSpace variant={'dark'} />
        <div className='page__content'>
          <div className='main__title--container'>
            <Link to='..' relative='path' className='iconLeftArrow'>
              <LeftArrowLightSvg />
            </Link>
            <div className='form__title'>{pocketInfo.name}</div>
            <Link to='accounts/edit' className='flx-col-center icon3dots'>
              <Dots3LightSvg />
            </Link>
          </div>
        </div>

        <form className='form__box'>
          <div className='form__container'>
            <div className='input__box'>
              <label className='label form__title'>{'note'}</label>
              <input
                type='text'
                className={`input__container`}
                placeholder={`${'description'}`}
                onChange={inputHandler}
                name={'note'}
                value={pocketDetail.pocketInfo['note']}
              />
            </div>

            {/* datepicker */}

            <label className='label '>{'Desired Date'}</label>

            <div className='form__datepicker__container'>
              <FormDatepicker
                changeDate={changeDesiredDate}
                date={pocketDetail.pocketInfo.date}
                variant={'form'}
              ></FormDatepicker>
            </div>
          </div>

          <div className='input__box'>
            <label className='label form__title'>{'Add Money'}</label>

            <DropDownSelection
              dropDownOptions={accountSelectionProp}
              updateOptionHandler={accountSelectHandler}
            />

            <input
              type='text'
              className={`input__container input__container--amount`}
              placeholder={`0,00`}
              name={'amount'}
              onChange={inputHandler}
              value={pocketDetail.pocketInfo.amount}
              style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
            />
          </div>

          <div className='submit__btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
          </div>
        </form>
      </section>
    </>
  );
}

export default PocketDetail;
