import React from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import ArrowDawnSvg from '../../../assets/ArrowDownSvg.svg';
import './newPocketForm.css';
import { EventHandler } from 'react';
const formTitle = 'New Pocket';

export const newPocketFormLabels: { [key: string]: string | JSX.Element }[] = [
  {
    labelText: 'Name',
    className: 'label--text',
    content: 'Purpose/name',
    icon: '',
  },
  {
    labelText: 'Note',
    className: 'label--text',
    content: 'Description',
    icon: '',
  },
  // { labelText: '', className: 'iconContent', content: <PlusSignSvg /> },
  // {
  //   labelText: 'Target Amount',
  //   className: 'label--text',
  //   content: 'Target',
  //   placeholder: 'Saved',
  //   icon: '',
  // },

  {
    labelText: 'Desired Date',
    className: 'label--text',
    content: 'MM/DD/YYYY',
    icon: <ArrowDawnSvg />,
  },
];

const targetAmount = {
  labelText: 'Target Amount',
  className: 'label--text',
  content: 'Target',
  placeholder: 'Saved',
  icon: '',
};

const NewPocket = () => {
  function inputHandler() {
    console.log('input');
  }

  function toggleSelectedAction() {
    console.log('crumb');
  }

  return (
    <section className='pocket__page__container'>
      <TopWhiteSpace bgc={'dark'} />

      <div className='pocket__page__content'>
        <form action='submit' className='form__box'>
          <div className='pocket__main__title--container'>
            <div className='iconLeftArrow'>
              <LeftArrowSvg />
            </div>

            <div className='form__title'>{formTitle}</div>
          </div>

          <div className='container--PocketName'>
            {newPocketFormLabels.map((item, indx) => {
              const { labelText, content, className, icon } = item;

              // console.log(className, crypto.randomUUID(), indx);

              return (
                <React.Fragment
                  key={`${className}-${crypto.randomUUID()}-${indx}`}
                >
                  {/* {labelText == 'Target Amount' && (
                    <button className={'bullet--input'} onClick={addHandler}>
                      <PlusSignSvg />
                    </button>
                  )} */}

                  {labelText !== 'Target Amount' && (
                    <div className='input--bullet'>
                      <label className='label form__title'>{labelText}</label>

                      <input
                        type='text'
                        className={`bullet bullet--input`}
                        placeholder={`${content}`}
                        onChange={inputHandler}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            <div className='input--bullet'>
              <label className='label form__title'>
                {targetAmount.labelText}
              </label>

              <div className='targetAmount  bullet--input'>
                {targetAmount.content}
                <input
                  type='text'
                  className={`input__targetAmount`}
                  placeholder={`${targetAmount.placeholder}`}
                  // onChange={inputHandler}
                />
              </div>

              <div className='date input--bullet'>
                <label className='label form__title'>{'Desired Date'}</label>

                <input
                  type='text'
                  className={`bullet bullet--input`}
                  placeholder={`MM/DD/YYYY`}
                  onChange={inputHandler}
                />
              </div>
            </div>
          </div>

          <div className='btn__container'>
            <button
              type='submit'
              className='submit__btn'
              // onClick={PocketNatureHandler}
              id={'save'}
            >
              {`${'Save'}`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewPocket;
