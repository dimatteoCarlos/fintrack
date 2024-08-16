import React, { useState } from 'react';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

import DropDownSelection from '../../../components/dropdownSelection/DropDownSelection.tsx';

import '../styles/forms-styles.css';

// const formTitle = 'New Profile';
/*
//temporary data structure
export const newProfileFormLabels: { [key: string]: string | JSX.Element }[] = [
  {
    labelText: 'Name',
    className: 'label--text',
    content: 'Name',
    icon: '',
  },
  {
    labelText: 'Last Name',
    className: 'label--text',
    content: 'Last Name',
    icon: '',
  },
  // { labelText: '', className: 'iconContent', content: <PlusSignSvg /> },
  {
    labelText: 'Add Money',
    className: 'label--text',
    content: 'Account',
    placeholder: 'Account',
    icon: <ArrowDawnSvg />,
  },

  {
    labelText: '',
    className: 'label--text',
    content: '0,00',
    icon: '',
  },
  {
    labelText: 'Type',
    className: 'label--text',
    content: 'Lending',
    icon: <ArrowDawnSvg />,
  },
];
*/
//------------------------
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

//Type Options
const typeSelectionProp = {
  title: 'lending',
  options: [
    { value: 'lending', label: 'Lending' },
    { value: 'borrowing', label: 'Borrowing' },
  ],
  variant: 'form', //define the customStyle to use in selection dropdown component
};

//----Temporary values----------
const initialNewProfileData = {
  name: '',
  lastname: '',
  account: '',
  type: 'lending',
  amount: '0,00',
};

type ProfileDataType = {
  name: string;
  lastname: string;
  account: string | number;
  type: string;
  amount: number | string;
};

//-------------------------
function NewProfile() {
  //-----states------
  const [profileData, setProfileData] = useState<ProfileDataType>(
    initialNewProfileData
  );

  const location = useLocation();
  // console.log('🚀 ~ NewProfile ~ location:', location);

  //---functions-----
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function typeSelectHandler(selectedOption: { value: string; label: string }) {
    setProfileData((prev) => ({ ...prev, type: selectedOption.value }));
    console.log('selectedOption', selectedOption);
  }

  function accountSelectHandler(selectedOption: {
    value: string;
    label: string;
  }) {
    setProfileData((prev) => ({ ...prev, account: selectedOption.value }));
    console.log('selectedOption', selectedOption);
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setProfileData(initialNewProfileData);
    console.log('submit form button');
  }

  return (
    <section className='profile__page__container page__container'>
      <TopWhiteSpace variant={'dark'} />

      <div className='profile__page__content page__content'>
        <div className='main__title--container'>
          <Link
            to={location.state.previousRoute}
            relative='path'
            className='iconLeftArrow'
          >
            {/* <Link to='..' relative='path' className='iconLeftArrow'> */}
            <LeftArrowLightSvg />
          </Link>

          <div className='form__title'>{'New Profile'}</div>
        </div>

        {/*  */}

        <form className='form__box'>
          <div className='container--profileName form__container'>
            <div className='input__box'>
              <label className='label form__title'>{'Name'}</label>
              <input
                type='text'
                className={`input__container`}
                placeholder={`Name`}
                name={'name'}
                onChange={inputHandler}
                value={profileData.name}
              />
            </div>

            <div className='input__box'>
              <label className='label form__title'>{'last name'}</label>
              <input
                type='text'
                className={`input__container`}
                placeholder={`last name`}
                name={'lastname'}
                onChange={inputHandler}
                value={profileData.lastname}
              />
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
                value={profileData.amount}
                style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
              />
            </div>

            <div className='input__box'>
              <label className='label form__title'>{'Type'}</label>
              <DropDownSelection
                dropDownOptions={typeSelectionProp}
                updateOptionHandler={typeSelectHandler}
              />
            </div>
          </div>

          {/* save */}

          <div className='submit__btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewProfile;
