import { Link } from 'react-router-dom';
import { useState } from 'react';
import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import Dots3LightSvg from '../../../assets/Dots3LightSvg.svg';
import ListContent from '../../../components/listContent/ListContent';
import { CardTitle } from '../../../components/CardTitle';
import FormSubmitBtn from '../../../components/formSubmitBtn/FormSubmitBtn';
import '../styles/forms-styles.css';

import FormDatepicker from '../../../components/datepicker/Datepicker';
import CurrencyBadge from '../../../components/currencyBadge/CurrencyBadge';
function AccountDetail() {
  //temporary data

  const accountInfo = {
    name: 'Account Name',
    balance: '0',
    type: 'Type',
    date: new Date(),
    currency: 'usd',
  };

  //Last Movements
  const lastMovements = [
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },

    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
  ];

  const initialAccountDetail = {
    accountInfo,
    lastMovements,
  };

  const [accountDetail, setAccountDetail] = useState(initialAccountDetail);

  //--functions---
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setAccountDetail((prevState) => ({
      ...prevState,
      accountInfo: { ...accountInfo, [e.target.name]: e.target.value },
    }));
  }
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('submit btn clicked');
    e.preventDefault();
    setAccountDetail(initialAccountDetail);
  }

  function updateCurrency(currency: string) {
    setAccountDetail((prevState) => ({
      ...prevState,
      accountInfo: { ...accountInfo, currency },
    }));
  }

  // function inputLastMovementHandler(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   console.log(accountDetail);
  //   setAccountDetail((prevState) => ({
  //     ...prevState,
  //     lastMovements: { ...lastMovements, [e.target.name]: e.target.value },
  //   }));
  // }

  function changeStartingPoint(selectedDate: Date) {
    setAccountDetail((prevState) => ({
      ...prevState,
      accountInfo: { ...accountInfo, date: selectedDate },
    }));
  }

  return (
    <section className='page__container'>
      <TopWhiteSpace variant={'dark'} />
      <div className='page__content'>
        <div className='main__title--container'>
          <Link to='..' relative='path' className='iconLeftArrow'>
            <LeftArrowLightSvg />
          </Link>
          <div className='form__title'>{accountDetail.accountInfo.name}</div>
          <Link to='accounts/edit' className='flx-col-center icon3dots'>
            <Dots3LightSvg />
          </Link>
        </div>

        <form className='form__box'>
          <div className='form__container'>
            <div className='input__box'>
              {/* <div className='label form__title'>{Object.entries(accountInfo)[1][0]}</div> */}
              {/* <div className='label form__title'>{Object.keys(accountInfo)[1]}</div> */}
              <div className='label form__title'>{`current balance`}</div>
              <input
                type='text'
                className='input__container'
                name='balance'
                placeholder='0,000.00'
                value={accountDetail.accountInfo.balance}
                onChange={inputHandler}
              />
            </div>

            <div className='input__box'>
              <label className='label form__title'>{'account type'}</label>
              <input
                type='text'
                className='input__container'
                name='type'
                placeholder='type'
                value={accountDetail.accountInfo.type}
                onChange={inputHandler}
              />
            </div>

            <div className='account__dateAndCurrency'>
              <div className='account__date'>
                <label className='label form__title'>{'starting point'}</label>

                {/* <div className="input__container">{`${accountInfo.date.toDateString()}`}</div> */}
                {/* <div className='input__container flx-col-center'>
                    {`${new Intl.DateTimeFormat('es-ES').format(accountDetail.accountInfo.date)}`}
                  </div> */}

                <div
                  className='form__datepicker__container'
                  style={{ textAlign: 'center' }}
                >
                  <FormDatepicker
                    variant='form'
                    changeDate={changeStartingPoint}
                    date={accountDetail.accountInfo.date}
                  ></FormDatepicker>
                </div>
              </div>
              <div className='account__currency'>
                <div className='label form__title'>{'currency'}</div>
                <CurrencyBadge
                  variant='form'
                  updateOutsideCurrencyData={updateCurrency}
                />
              </div>
            </div>
          </div>

          <div className='presentation__card__title__container'>
            <CardTitle>{'Last Movements'}</CardTitle>
          </div>

          <ListContent lastMovements={lastMovements} />

          <div className='submit__btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AccountDetail;
