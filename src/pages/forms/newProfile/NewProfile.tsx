import React from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import ArrowDawnSvg from '../../../assets/ArrowDownSvg.svg';
import './newProfileForm.css';
import { EventHandler } from 'react';

const formTitle = 'New Profile';

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

const NewProfile = () => {
  function inputHandler() {
    console.log('input');
  }

  function toggleSelectedAction() {
    console.log('crumb');
  }

  return (
    <section className='profile__page__container'>
      <TopWhiteSpace bgc={'dark'} />

      <div className='profile__page__content'>
        <form action='submit' className='form__box'>
          <div className='profile__main__title--container'>
            <div className='iconLeftArrow'>
              <LeftArrowSvg />
            </div>

            <div className='form__title'>{formTitle}</div>
          </div>

          <div className='container--profileName'>
            {newProfileFormLabels.map((item, indx) => {
              const { labelText, content, className, icon } = item;

              // console.log(className, crypto.randomUUID(), indx);

              return (
                <React.Fragment
                  key={`${className}-${crypto.randomUUID()}-${indx}`}
                >
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
          </div>

          <div className='btn__container'>
            <button
              type='submit'
              className='submit__btn'
              // onClick={ProfileNatureHandler}
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

export default NewProfile;
