import React from 'react';
// import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import ArrowDownSvg from '../../../assets/ArrowDownSvg.svg';
import './newAccountForm.css';
import FormTitle from '../../../components/formComponents/FormTitle.tsx';
import FormSelectionBullet from '../../../components/formComponents/FormSelectionBullet.tsx';
import FormInputBullet from '../../../components/formComponents/FormInputBullet.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

export const newAccountFormLabels: { [key: string]: string | JSX.Element }[] = [
  {
    labelText: 'Account Name',
    classLabel: 'label--text',
    content: 'Name',
    icon: '',
  },

  {
    labelText: 'Account Type',
    classLabel: 'label--text',
    content: 'Type',
    icon: <ArrowDownSvg />,
  },

  {
    labelText: 'Starting Point',
    classLabel: 'label--text',
    content: 'MM/DD/YYYY',
    icon: <ArrowDownSvg />,
  },

  {
    labelText: 'Value',
    classLabel: 'label--number',
    content: '0,00',
    icon: '',
  },
];

const typesOptions = [
  { option: 'option1' },
  { option: 'option2' },
  { option: 'option3 is very long' },
];

const NewAccount = () => {
  function inputHandler() {
    console.log('input');
  }

  function toggleSelectedAction() {
    console.log('crumb');
  }

  function onSubmitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('submit btn clicked');
    e.preventDefault();
  }

  return (
    <section className='account__page__container'>
      <TopWhiteSpace bgc={'dark'} />

      <div className='account__page__content'>
        <form action='submit' className='form__box'>
          <FormTitle formTitle={'New Account'} />

          <div className='container--accountName'>
            {newAccountFormLabels.map((item, indx) => {
              const { labelText, content, classLabel, icon } = item;

              // console.log(className, crypto.randomUUID(), indx);

              return (
                <React.Fragment
                  key={`${classLabel}-${crypto.randomUUID()}-${indx}`}
                >
                  {(indx == 0 || indx == 3) && (
                    <>
                      <FormInputBullet
                        labelText={labelText}
                        classContent={classLabel}
                        content={content}
                        inputHandler={inputHandler}
                      />
                    </>
                  )}

                  {indx == 1 && (
                    <>
                      <FormSelectionBullet
                        labelText={labelText}
                        content={content}
                        inputHandler={inputHandler}
                        options={typesOptions}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}

            {/* 
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
            </div> */}
          </div>

          <div className='btn__container'>
            <FormSubmitBtn onClickHandler={onSubmitHandler} btnTitle={'Save'} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewAccount;
