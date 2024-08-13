import { useState } from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
import { Link, useLocation } from 'react-router-dom';
import './newCategoryForm.css';

//---------Form Field Names----------
const formTitle = 'New Category';

export const newCategoryFormLabels: {
  [key: string]: string | JSX.Element | number;
}[] = [
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

//---------------
export const natureTitle = 'Category Nature';

export const natureLabels = [
  { labelText: 'Must', className: 'label--text' },

  { labelText: 'Need', className: 'label--text' },

  { labelText: 'Want', className: 'label--text' },
  { labelText: 'Other', className: 'label--text' },
];

//-------------------------
function NewCategory() {
  const location = useLocation();
  console.log('🚀 ~ NewCategory ~ location:', location);

  const [activeCategory, setActiveCategory] = useState('');

  function inputHandler() {
    console.log('input');
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('addHandler');
  }

  function categoryNatureHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('categoryNatureHandler', e.currentTarget.id);
    setActiveCategory(e.currentTarget.id);

    const categoryNature = e.currentTarget.id.toLowerCase();
    console.log('🚀 ~ categoryNatureHandler ~ categoryNature:', categoryNature);
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setActiveCategory('');
    console.log('submit function');
  }

  return (
    <section className='page__container'>
      <TopWhiteSpace variant={'dark'} />

      {/* main title component */}
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
          <div className='container--categoryName form__container'>
            {newCategoryFormLabels.map((item, indx) => {
              const { labelText, content, className } = item;

              // console.log(className, crypto.randomUUID(), indx);

              return (
                <div key={`${className}-${crypto.randomUUID()}-${indx}`}>
                  {className == 'iconContent' && (
                    <button
                      className={'bullet--input input__container'}
                      onClick={addHandler}
                    >
                      <PlusSignSvg />
                    </button>
                  )}

                  {className !== 'iconContent' && (
                    <div className='input--bullet input__box'>
                      <label className='label form__title'>{labelText}</label>

                      <input
                        type='text'
                        className={`bullet bullet--input input__container`}
                        placeholder={`${content}`}
                        onChange={inputHandler}
                        // value=''
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Component of tiles or badges */}
          <div className='container--categoryNature'>
            <div className='form__title form__title--categoryNature form__title--tiles'>
              {natureTitle}
            </div>

            <div className='categoryNature__tiles tiles__container'>
              {natureLabels.map((label, indx) => {
                return (
                  <button
                    className='categoryNature__btn tile__button'
                    onClick={categoryNatureHandler}
                    key={`${indx}-tile`}
                    id={`${label.labelText}`}
                    style={
                      activeCategory == label.labelText
                        ? {
                            backgroundColor: 'var(--creme)',
                            color: 'var(--dark)',
                          }
                        : {}
                    }
                  >
                    {label.labelText}
                  </button>
                );
              })}
            </div>
          </div>
          {/* save */}
          <div className='submit__btn__container'>
            <button
              type='submit'
              className='submit__btn'
              onClick={onSubmitForm}
              id={'save'}
            >
              {`${'Save'}`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewCategory;
