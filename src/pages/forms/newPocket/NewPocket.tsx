import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
import FormDatepicker from '../../../components/datepicker/Datepicker.tsx';
import '../styles/forms-styles.css';
import FormSubmitBtn from '../../../components/formSubmitBtn/FormSubmitBtn.tsx';

//---------Form Field Names----------
// const formTitle = 'New Pocket';
/*
export const newPocketFormLabels: {
  [key: string]: string | JSX.Element | number;
}[] = [
  {
    labelText: 'name',
    className: 'label--text',
    content: 'purpose/name',
    icon: '',
  },
  {
    labelText: 'note',
    className: 'label--text',
    content: 'description',
    icon: '',
  },

  {
    labelText: 'desired date',
    className: 'label--text',
    content: 'MM/DD/YYYY',
    icon: <ArrowDownSvg />,
  },
];
*/
// const targetAmount = {
//   labelText: 'target amount',
//   className: 'label text',
//   content: 'target',
//   placeholder: 'Saved',
//   icon: '',
// };

//-------------------------

function NewPocket() {
  const initialNewPocketData = {
    name: '',
    note: '',
    target: 'saved',
    date: new Date(),
  };

  //---states------

  const [pocketData, setPocketData] = useState(initialNewPocketData);
  const location = useLocation();
  // console.log('🚀 ~ NewCategory ~ location:', location);

  function changeDesiredDate(selectedDate: Date): void {
    setPocketData((data) => ({
      ...data,
      desiredDate: selectedDate.toDateString(),
    }));
    //Define the format of date data to be saved, Date or string.
    // setPocketData((data) => ({ ...data, desiredDate: selectedDate.toDateString() }));
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPocketData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    //function to handle pocketData
    console.log('submit function', 'data:', pocketData);
    setPocketData(initialNewPocketData);
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
          <div className='form__container'>
            <div className='input__box'>
              <label className='label form__title'>{'Name'}</label>
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
              <label className='label form__title'>{'Note'}</label>
              <input
                type='text'
                className={`input__container`}
                placeholder={`${'description'}`}
                onChange={inputHandler}
                name={'note'}
                value={pocketData['note']}
              />
            </div>

            <label className='form__title1'>{'target amount'}</label>

            <div className='targetAmount input__container'>
              {'target'}

              {/* <textarea */}

              <input
                type='text'
                name='target'
                className={'input__targetAmount'}
                placeholder={'saved'}
                maxLength={150}
                onChange={inputHandler}
                value={pocketData['target']}
                // rows={3}
              />
            </div>

            {/* datepicker */}

            <label className='label '>{'Desired Date'}</label>

            <div className='form__datepicker__container'>
              <FormDatepicker
                changeDate={changeDesiredDate}
                date={pocketData.date}
                variant={'form'}
              ></FormDatepicker>
            </div>
          </div>

          <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>

        </form>
      </div>
    </section>
  );
}

export default NewPocket;
