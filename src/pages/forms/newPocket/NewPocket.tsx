//NewPocket.tsx
import { useState } from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';

import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';
import { validationData } from '../../../helpers/functions.ts';
import { CurrencyType } from '../../../types/types.ts';
import FormDatepicker from '../../../general_components/datepicker/Datepicker.tsx';
import '../styles/forms-styles.css';

//----Temporary initial values----------
type PocketDataType = {
  name: string;
  note: string;
  target: number;
  saved?: number;
  date: Date;
  currency?: CurrencyType;
};
const initialNewPocketData: PocketDataType = {
  name: '',
  note: '',
  target: 0.0,
  date: new Date(),
};

//-------------------------

function NewPocket() {
  const location = useLocation();

  //where to get saved
  const saved = 0.0;

  //---states------
  const [pocketData, setPocketData] =
    useState<PocketDataType>(initialNewPocketData);

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  const [isReset, setIsReset] = useState<boolean>(false);

  //functions---
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { name, value } = e.target;

    const valueToSave =
      // name === 'target' ? (value !== '' ? parseFloat(value) : 0) : value;
      name === 'target' ? (value !== '' ? parseFloat(value) : 0) : value;

    setPocketData((prev) => ({ ...prev, [name]: valueToSave }));
  }

  //--
  function changeDesiredDate(selectedDate: Date): void {
    setPocketData((data) => ({
      ...data,
      // desiredDate: selectedDate.toDateString(),
      date: selectedDate,
    }));
    //it is a string
  }
  //---
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('onSubmitForm');

    //--
    const newValidationMessages = { ...validationData(pocketData) };
    console.log('mensajes:', { newValidationMessages });

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //--
    //POST the new profile data into database
    console.log('data to POST:', { pocketData });

    //resetting form values
    setIsReset(true);
    setValidationMessages({});

    setPocketData(initialNewPocketData);
    setPocketData((prev) => ({ ...prev, date: new Date() }));
    setTimeout(() => setIsReset(false), 500);
  }

  return (
    <section className='newPocket__page page__container'>
      <TopWhiteSpace variant={'dark'} />

      <div className='page__content'>
        <div className='main__title--container'>
          <Link
            to={location.state.previousRoute}
            relative='path'
            className='iconLeftArrow'
          >
            <LeftArrowSvg />
          </Link>

          <div className='form__title'>{'New Pocket'}</div>
        </div>

        {/*  */}

        <form className='form__box'>
          <div className='container--pocketName form__container'>
            <div className='input__box'>
              <label htmlFor='name' className='label form__title'>
                {'Name'}&nbsp;
                <span className='validation__errMsg'>
                  {validationMessages['name']}
                </span>
              </label>

              <input
                type='text'
                className={`input__container`}
                placeholder={`${'purpose/name'}`}
                onChange={inputHandler}
                name={'name'}
                value={pocketData['name']}
              />
            </div>
            <div className='input__box'>
              <label htmlFor='note' className='label form__title'>
                {'Note'}&nbsp;
                <span className='validation__errMsg'>
                  {validationMessages['note']}
                </span>
              </label>

              <input
                type='text'
                className={`input__container`}
                placeholder={`${'description'}`}
                onChange={inputHandler}
                name={'note'}
                value={pocketData['note']}
              />
            </div>{' '}
            <label htmlFor='' className='form__title1'>
              {'target amount'}
              <div className='validation__errMsg'>
                {validationMessages['target']}
              </div>
            </label>
            <div className='targetAmount input__container '>
              <div className='target__label__amount '>
                <label htmlFor='target' className='label__target'>
                  {'target'}
                </label>

                <input
                  className={'input__targetAmount'}
                  type='number'
                  name='target'
                  placeholder={'target'}
                  onChange={inputHandler}
                  value={pocketData['target']}
                />
              </div>
              <div className='target__label__saved'>
                saved: {pocketData['saved'] ?? saved}
                {/* <input
                  type='number'
                  name='saved'
                  className={'input__savedAmount'}
                  placeholder={'saved'}
                  onChange={inputHandler}
                  value={pocketData['saved']}
                /> */}
              </div>
            </div>
            {/* datepicker */}
            <label className='label '>
              {'Desired Date'}&nbsp;
              <span className='validation__errMsg'>
                {validationMessages['date']}
              </span>
            </label>
            <div className='form__datepicker__container'>
              <FormDatepicker
                changeDate={changeDesiredDate}
                date={pocketData.date}
                variant={'form'}
                isReset={isReset}
              />
            </div>
          </div>

          <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
        </form>
      </div>
    </section>
  );
}

export default NewPocket;
