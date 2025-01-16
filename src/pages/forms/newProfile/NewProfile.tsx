import React, { useEffect, useState } from 'react';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';

import DropDownSelection from '../../../general_components/dropdownSelection/DropDownSelection.tsx';

import '../styles/forms-styles.css';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  DebtorNewProfileType,
  DebtsTypeMovementType,
  DebtType,
  ExpenseAccountsType,
} from '../../../types/types.ts';
import { url_accounts } from '../../../endpoints.ts';
import {
  ACCOUNT_OPTIONS_DEFAULT,
  DEFAULT_DEBTOR_TYPE,
} from '../../../helpers/constants.ts';
import { validationData } from '../../../helpers/functions.ts';

// const formTitle = 'New Profile';
/*
 */
//------------------------
//Account Options

//Type Options
const typeSelectionProp = {
  title: 'type', //select type
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
  type: '',
  amount: 0,
};

type ProfileDataType = {
  name: string;
  lastname: string;
  account: string | number;
  type: string;
  amount: number | string | undefined;
};

//-----------------------
function NewProfile() {
  //-----states------
  const [profileData, setProfileData] = useState<ProfileDataType>(
    initialNewProfileData
  );

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  const [isReset, setIsReset] = useState<boolean>(false);

  const {
    data,
    isLoading,
    error: accountError,
  } = useFetch<ExpenseAccountsType>(url_accounts);

  const optionsExpenseAccounts =
    !accountError && !isLoading && data?.accounts?.length
      ? data.accounts.map((acc, _) => ({
          value: acc.name,
          label: acc.name,
        }))
      : ACCOUNT_OPTIONS_DEFAULT;

  const accountSelectionProp = {
    title: 'Available Account',
    options: optionsExpenseAccounts,
    variant: 'form', //define the custom styles to use in selection dropdown component
  };

  const location = useLocation();

  //---functions-----
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const valueToSave =
      e.target.name === 'amount'
        ? Number(e.target.value) //NO ACEPTA VALORES QUE EMPIEZAN POR 0,  0.001 POR EJEMPLO
        : e.target.value;
    setProfileData((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }

  function typeSelectHandler(selectedOption: any) {
    if (selectedOption) {
      console.log('selectedOption desde typeSelectHandler', { selectedOption });
      setProfileData((prev: any) => ({ ...prev, type: selectedOption.value }));
    } else {
      console.log('No option selected for type');
    }

    // setProfileData((prev: any) => ({ ...prev, type: selectedOption.value }));
  }

  function accountSelectHandler(
    selectedOption: any
    // , optionKeySelected: any
  ) {
    setProfileData((prev: any) => ({
      ...prev,
      account: selectedOption?.value,
    }));

    // setProfileData((prev: any) => ({
    //   ...prev,
    //   [optionKeySelected]: selectedOption?.value,
    // }));

    console.log(
      'selectedOption desde accountSelectHandler NewProfile',
      selectedOption
    );
  }
  //------------------
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('onSubmitForm');

    const newValidationMessages = validationData(profileData);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //POST the new profile data into database?
console.log('data to POST:', {profileData})
    //reset form values
    setIsReset(true);

    setValidationMessages({});
    
    
    setTimeout(() => setIsReset(false), 500);
    setProfileData(initialNewProfileData);
    console.log('submit form button');
  }

  return (
    <section className='profile__page__container page__container '>
      <TopWhiteSpace variant={'dark'} />

      <div className='profile__page__content page__content'>
        <div className='main__title--container '>
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

        <form className='form__box'>
          <div className='container--profileName form__container '>
            <div className='input__box'>
              <label htmlFor='name' className='label form__title'>
                {'Name'}
                <span className='validation__errMsg'>
                  {validationMessages['name']}
                </span>
              </label>
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
              <label htmlFor='lastname' className='label form__title'>
                {'last name'}
                <span className='validation__errMsg'>
                  {validationMessages['lastname']}
                </span>
              </label>
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

              {/* accounts*/}

              <DropDownSelection
                dropDownOptions={accountSelectionProp}
                updateOptionHandler={accountSelectHandler}
                optionKeySelected='account'
                isReset={isReset}
                setIsReset={setIsReset}
                // optionKeySelected={profileData['account']}
              />

              <span className='validation__errMsg'>
                {validationMessages['account']}
              </span>

              <input
                type='number'
                className={`input__container input__container--amount`}
                placeholder={`0`}
                name={'amount'}
                onChange={inputHandler}
                value={Number(profileData.amount) || ''}
                style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
              />

              <span className='validation__errMsg'>
                {validationMessages['amount']}
              </span>
            </div>

            <div className='input__box'>
              <label className='label form__title'>
                {'type'}
                <span className='validation__errMsg'>
                  {validationMessages['type']}
                </span>
              </label>

              {/* action debtor type */}

              <DropDownSelection
                dropDownOptions={typeSelectionProp}
                updateOptionHandler={typeSelectHandler}
                isReset={isReset}
                setIsReset={setIsReset}
                optionKeySelected='type'
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
