import { Link } from 'react-router-dom';
import { useState } from 'react';
import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import Dots3LightSvg from '../../../assets/Dots3LightSvg.svg';
import ListContent from '../../../general_components/listContent/ListContent';
import { CardTitle } from '../../../general_components/CardTitle';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn';
import FormDatepicker from '../../../general_components/datepicker/Datepicker';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge';
import { DEFAULT_CURRENCY } from '../../../helpers/constants';

// import { StatusSquare } from '../../../components/boxComponents.tsx';
// import SummaryDetailBox from '../../../components/summaryDetailBox/SummaryDetailBox.tsx';
// import PlusSignSvg from '../../../assets/PlusSignSvg.svg';

import { capitalize } from '../../../helpers/functions';
import '../styles/forms-styles.css';

function AccountDetail() {
  //temporary data

  const accountInfo = {
    name: 'Account Name Detail',
    balance: 123654.017,
    type: 'tipo detail',
    date: new Date(),
    currency: 'eur',
  };

  //Last Movements
  const lastMovements = [
    {
      categoryName: 'Category Name_01',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },

    {
      categoryName: 'Category Name_02',
      record: 'Record',
      description: 'Description',
      date: new Date().setDate(
        new Date().getDate() - Math.floor(Math.random() * 31)
      ),
    },
    {
      categoryName: 'Category Name_05',
      record: 'Record',
      description: 'Description',
      date: new Date().setDate(
        new Date().getDate() - Math.floor(Math.random() * 31)
      ),
    },
    {
      categoryName: 'Category Name_06',
      record: 'Record',
      description: 'Description',
      date: new Date().setDate(
        new Date().getDate() - Math.floor(Math.random() * 31)
      ),
    },
  ];

  //data from endpoint request for info account, and for last movements
  const initialAccountDetail = {
    accountInfo,
    lastMovements,
  };

  const [accountDetail, setAccountDetail] = useState(initialAccountDetail);

  //--functions---

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
          <Link to='/overview' relative='path' className='iconLeftArrow'>
            <LeftArrowLightSvg />
          </Link>
          <div className='form__title'>{accountDetail.accountInfo.name}</div>
          <Link to='edit' className='flx-col-center icon3dots'>
            <Dots3LightSvg />
          </Link>
        </div>

        <form className='form__box'>
          <div className='form__container'>
            <div className='input__box'>
              <div className='label form__title'>{`current balance`}</div>

              <div className='input__container' style={{ padding: '0.5rem' }}>
                {accountDetail.accountInfo.balance}
              </div>
            </div>

            <div className='input__box'>
              <label className='label form__title'>{'Account Type'}</label>

              <p className='input__container' style={{ padding: '0.5rem' }}>
                {capitalize(accountDetail.accountInfo.type)}
              </p>
            </div>

            <div className='account__dateAndCurrency'>
              <div className='account__date'>
                <label className='label form__title'>{'Starting Point'}</label>

                <div
                  className='form__datepicker__container'
                  style={{ textAlign: 'center' }}
                >
                  <FormDatepicker
                    variant='form'
                    changeDate={changeStartingPoint}
                    date={accountDetail.accountInfo.date}
                  />
                </div>
              </div>

              <div className='account__currency'>
                <div className='label form__title'>{'Currency'}</div>

                <CurrencyBadge
                  variant='form'
                  updateOutsideCurrencyData={updateCurrency}
                  // apparently there's a currency datum associated to each account
                  currency={DEFAULT_CURRENCY}
                />
              </div>
            </div>
          </div>

          <div className='presentation__card__title__container'>
            <CardTitle>{'Last Movements'}</CardTitle>
          </div>

          <ListContent listOfItems={lastMovements} />

          <div className='submit__btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AccountDetail;
