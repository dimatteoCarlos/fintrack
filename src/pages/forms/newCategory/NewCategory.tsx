import React from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
import './newCategoryForm.css';
import { EventHandler } from 'react';
const formTitle = 'New Category';

export const newCategoryFormLabels: { [key: string]: string | JSX.Element }[] =
  [
    {
      labelText: 'Category Name',
      className: 'label--text',
      content: 'Category Name',
    },
    {
      labelText: 'Subcategory',
      className: 'label--text',
      content: 'Category Name',
    },
    { labelText: '', className: 'iconContent', content: <PlusSignSvg /> },
    { labelText: 'Budget', className: 'label--text', content: 'Amount' },
  ];

export const natureTitle = 'Category Nature';

export const natureLabels = [
  { labelText: 'Must', className: 'label--text' },

  { labelText: 'Need', className: 'label--text' },

  { labelText: 'Want', className: 'label--text' },
  { labelText: 'Other', className: 'label--text' },
];

const NewCategory = () => {
  function inputHandler() {
    console.log('input');
  }

  function toggleSelectedAction() {
    console.log('crumb');
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('addHandler');
  }

  function categoryNatureHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('categoryNatureHandler');
    e.preventDefault();
  }

  return (
    <section className='page__container'>
      <TopWhiteSpace bgc={'dark'} />

      <div className='page__content'>
        <form action='submit' className='form__box'>
          <div className='main__title--container'>
            <div className='iconLeftArrow'>
              <LeftArrowSvg />
            </div>

            <div className='form__title'>{formTitle}</div>
          </div>

          <div className='container--categoryName'>
            {newCategoryFormLabels.map((item, indx) => {
              const { labelText, content, className } = item;

              // console.log(className, crypto.randomUUID(), indx);

              return (
                <React.Fragment
                  key={`${className}-${crypto.randomUUID()}-${indx}`}
                >
                  {className == 'iconContent' && (
                    <button className={'bullet--input'} onClick={addHandler}>
                      <PlusSignSvg />
                    </button>
                  )}

                  {className !== 'iconContent' && (
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

          <div className='container--categoryNature'>
            <div className='form__title form__title--categoryNature'>
              {natureTitle}
            </div>
            <div className='categoryNature__tiles'>
              {natureLabels.map((label, indx) => {
                return (
                  <button
                    className='categoryNature__btn'
                    onClick={categoryNatureHandler}
                    key={`${indx}-tile`}
                    id={`${label}`}
                  >
                    {label.labelText}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='btn__container'>
            <button
              type='submit'
              className='submit__btn'
              // onClick={categoryNatureHandler}
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

export default NewCategory;
