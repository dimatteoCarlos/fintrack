import React, { useState } from 'react';
import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';
import LeftArrowLightSvg from '../../../assets/LeftArrowSvg.svg';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';
import DropDownSelection from '../../../general_components/dropdownSelection/DropDownSelection.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import FormDatepicker from '../../../general_components/datepicker/Datepicker.tsx';
import {
  ACCOUNT_TYPE_DEFAULT,
  CURRENCY_OPTIONS,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';
import '../styles/forms-styles.css';
import { CurrencyType } from '../../../types/types.ts';
import { validationData } from '../../../helpers/functions.ts';
import { FormNumberInputType } from '../../../types/types.ts';
import InputNumberFormHandler from '../../../general_components/inputNumberHandler/InputNumberFormHandler.tsx';
import LabelNumberValidation from '../../../general_components/labelNumberValidation/LabelNumberValidation.tsx';
//-----temporarily 'till decide how to handle currencies
const defaultCurrency = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('', { formatNumberCountry });

//----Temporary data----------
type AccountDataType = {
  name: string;
  date: Date;
  type: string;
  amount: number | string; //later verifyin and fixed input
  currency: string;
};
const initialNewAccountData = {
  name: '', //'Account Name',
  type: '', //'Account Type',
  date: new Date(), //'Starting Point'
  amount: '', // 'Value'
  currency: 'usd',
};
const ACCOUNT_TYPE_OPTIONS_DEFAULT = {
  title: 'Type',
  options: ACCOUNT_TYPE_DEFAULT,
  variant: 'form',
};
const formDataNumber = { keyName: 'amount', title: 'value' };

const initialFormData: FormNumberInputType = {
  [formDataNumber.keyName]: '',
};

//-------------------------------
function NewAccount() {
  const location = useLocation();
  //---states------
  const [accountData, setAccountData] = useState<AccountDataType>(
    initialNewAccountData
  );

  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  const [isReset, setIsReset] = useState<boolean>(false);

  const [formData, setFormData] =
    useState<FormNumberInputType>(initialFormData);

  //---functions-----

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    // const valueToSave = name === 'value' ? parseFloat(value) : value;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  }

  function accountTypeSelectHandler(selectedOption: any) {
    setAccountData((acc: AccountDataType) => ({
      ...acc,
      type: selectedOption?.value,
    }));
  }

  function changeStartingPoint(selectedDate: Date) {
    setAccountData((acc) => ({ ...acc, date: selectedDate }));
    console.log('selected starting point:', selectedDate);
  }

  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setAccountData((acc) => ({ ...acc, currency: currency }));
  }
  //---
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('On submit Form');
    e.preventDefault();
    //--data form validation
    const newValidationMessages = { ...validationData(accountData) };
    console.log('mensajes:', { newValidationMessages });

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }
    //--
    //POST TO THE ENDPOINT FOR ACCOUNT DATA HERE
    console.log('data to POST:', { accountData });
    //resetting form values
    setIsReset(true);
    setCurrency(defaultCurrency);
    setValidationMessages({});
    setAccountData(initialNewAccountData);
    setFormData(initialFormData);
    // after a delay, change isReset to false
    setTimeout(() => setIsReset(false), 500);
  }

  //----
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
            <LeftArrowLightSvg />
          </Link>
          <div className='form__title'>{'New Account'}</div>
        </div>

        <form className='form__box'>
          <div className=' form__container'>
            <div className='input__box'>
              <label htmlFor='name' className='label form__title'>
                {'Account Name'} &nbsp;
                <span className='validation__errMsg'>
                  {validationMessages['name']}
                </span>
              </label>

              <input
                type='text'
                className='input__container'
                placeholder='Account Name'
                name='name'
                onChange={inputHandler}
                value={accountData.name}
              />
            </div>
            <div className='input__box'>
              <label className='label form__title'>
                Account Type &nbsp;
                <span className='validation__errMsg'>
                  {validationMessages['type']}
                </span>
              </label>

              <DropDownSelection
                dropDownOptions={ACCOUNT_TYPE_OPTIONS_DEFAULT}
                updateOptionHandler={accountTypeSelectHandler}
                isReset={isReset}
                setIsReset={setIsReset}
                // optionKeySelected='type'
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
                    isReset={isReset}
                  ></FormDatepicker>
                </div>
              </div>

              <div className='account__currency'>
                <div className='label form__title'>Currency</div>
                <CurrencyBadge
                  variant={'form'}
                  updateOutsideCurrencyData={updateDataCurrency}
                  currency={currency}
                />
              </div>
            </div>

            <div className='input__box'>
              <LabelNumberValidation
                formDataNumber={formDataNumber}
                validationMessages={validationMessages}
                variant='form'
              />

              <InputNumberFormHandler
                validationMessages={validationMessages}
                setValidationMessages={setValidationMessages}
                keyName={formDataNumber.keyName}
                placeholderText={formDataNumber.keyName}
                formData={formData}
                setFormData={setFormData}
                setStateData={setAccountData}
              />

              {/* <input
                style={{ fontSize: '1.25rem', padding: '0 0.75rem' }}
              /> */}
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
