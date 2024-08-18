import { Link } from 'react-router-dom';
import { useState } from 'react';
import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import Dots3LightSvg from '../../../assets/Dots3LightSvg.svg';
import ListContent from '../../../components/listContent/ListContent';
import { CardTitle } from '../../../components/CardTitle';
import FormSubmitBtn from '../../../components/formSubmitBtn/FormSubmitBtn.tsx';
import DropDownSelection from '../../../components/dropdownSelection/DropDownSelection';

import { StatusSquare } from '../../../components/boxComponents.tsx';
import SummaryDetailBox from '../../../components/summaryDetailBox/SummaryDetailBox.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
import '../styles/forms-styles.css';

function DebtorDetail() {
  //temporary data
  const debtorInfo = {
    name: 'Name, LastName',
    account: '',
    amount: '0',
  };

  //summary data
  const summaryData = {
    title: 'amount',
    amount: 2222.11,
    subtitle1: '',
    subtitle2: 'type',
    status: <StatusSquare />,
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

  const initialDebtorDetail = {
    debtorInfo,
    lastMovements,
  };

  const [debtorDetail, setDebtorDetail] = useState(initialDebtorDetail);

  //--functions---
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDebtorDetail((prevState) => ({
      ...prevState,
      debtorInfo: { ...debtorInfo, [e.target.name]: e.target.value },
    }));
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('submit btn clicked');
    e.preventDefault();
    setDebtorDetail(initialDebtorDetail);
  }

  function accountSelectHandler(selectedOption: {
    value: string;
    label: string;
  }) {
    setDebtorDetail((prev) => ({
      ...prev,
      debtorInfo: { ...debtorInfo, account: selectedOption.value },
    }));
    console.log('selectedOption', selectedOption);
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
            <div className='form__title'>{debtorInfo.name}</div>
            <Link to='accounts/edit' className='flx-col-center icon3dots'>
              <Dots3LightSvg />
            </Link>
          </div>
        </div>

        <SummaryDetailBox summaryData={summaryData}></SummaryDetailBox>

        <form className='form__box'>
          <div className='form__container'>
            <div className='input__box'>
              <label className='label form__title'>{'Add Money'}</label>

              <DropDownSelection
                dropDownOptions={accountSelectionProp}
                updateOptionHandler={accountSelectHandler}
              />

              <div className='inputAmountAndPlusSign'>
                <input
                  type='text'
                  className={`input__container input__container--amount`}
                  placeholder={`0,00`}
                  name={'amount'}
                  onChange={inputHandler}
                  value={debtorDetail.debtorInfo.amount}
                  style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
                />

                <Link to='' className='flx-col-center iconPlusSign'>
                  <PlusSignSvg />
                </Link>
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
      </section>
    </>
  );
}

export default DebtorDetail;
