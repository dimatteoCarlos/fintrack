import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import ArrowDownSvg from '../../../assets/ArrowDownSvg.svg';
import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
import FormDatepicker from '../../../components/datepicker/Datepicker.tsx';
import '../styles/forms-styles.css';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

//---------Form Field Names----------
const formTitle = 'New Pocket';

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

const targetAmount = {
  labelText: 'target amount',
  className: 'label text',
  content: 'target',
  placeholder: 'Saved',
  icon: '',
};

//-------------------------

function NewPocket() {
  const initialNewPocketData = {
    name: '',
    note: '',
    target: 0,
    date: new Date(),
  };

  //---states------

  const [pocketData, setPocketData] = useState(initialNewPocketData);
  const location = useLocation();
  console.log('🚀 ~ NewCategory ~ location:', location);

  function changeDesiredDate(selectedDate: Date): void {
    setPocketData((data) => ({ ...data, desiredDate: selectedDate }));
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPocketData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('submit function');
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
            {/* <Link to='..' relative='path' className='iconLeftArrow'> */}
            <LeftArrowSvg />
          </Link>

          <div className='form__title'>{formTitle}</div>
        </div>
        {/*  */}

        <form className='form__box'>
          <div className='form__container'>
            {newPocketFormLabels.map((item, indx) => {
              const { labelText, content, className, icon } = item;
              const labeltext = labelText
                .toString()
                .toLowerCase()
                .split('_')
                .join('');
              console.log(
                '🚀 ~ {newPocketFormLabels.map ~ labeltext:',
                labeltext
              );

              return (
                <div key={`${className}-${crypto.randomUUID()}-${indx}`}>
                  {labelText !== 'target amount' &&
                    labelText !== 'desired date' && (
                      <div className='input__box'>
                        <label className='label form__title'>{labelText}</label>
                        <input
                          type='text'
                          className={`input__container`}
                          placeholder={`${content}`}
                          onChange={inputHandler}
                          name={`${labeltext
                            .toString()
                            .toLowerCase()
                            .split('_')
                            .join('')}`}
                          // value={`${pocketData[`${labeltext}`]}`}
                        />
                      </div>
                    )}
                </div>
              );
            })}

            {/* <div className='input__box '> */}
            <label className='form__title1'>{targetAmount.labelText}</label>

            <div className='targetAmount input__container'>
              {targetAmount.content}

              {/* <textarea */}
              <input
                type='text'
                name='targetAmount'
                className={`input__targetAmount`}
                placeholder={`${targetAmount.placeholder}`}
                maxLength={150}
                onChange={inputHandler}
                // value={''}
                // rows={3}
              />
            </div>

            {/* datepicker */}
            {/* <div className='date input__box'> */}
            <label className='label '>{'Desired Date'}</label>

            <div className='form__datepicker__container'>
              <FormDatepicker
                changeDate={changeDesiredDate}
                date={pocketData.date}
                variant={'form'}
              ></FormDatepicker>
            </div>

            {/* </div> */}
            {/* </div> */}
          </div>

          {/* save */}

          {/* <div className='submit__btn__container'>
            <button
              type='submit'
              className='submit__btn'
              onClick={onSubmitForm}
              id={'save'}
            >
              {`${'Save'}`}
            </button>
          </div> */}

          <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>
        </form>
      </div>
    </section>
  );
}

export default NewPocket;
