import { useState } from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
import { Link, useLocation } from 'react-router-dom';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import '../styles/forms-styles.css';

//---------Form Field Names----------
// const formTitle = 'New Category';

// export const newCategoryFormLabels: {
//   [key: string]: string | JSX.Element | number;
// }[] = [
//   {
//     labelText: 'Category Name',
//     className: 'label--text',
//     content: 'Category Name',
//   },
//   {
//     labelText: 'Subcategory',
//     className: 'label--text',
//     content: 'Category Name',
//   },
//   { labelText: '', className: 'iconContent', content: <PlusSignSvg /> },
//   { labelText: 'Budget', className: 'label--text', content: 'Amount' },
// ];

//---------------
export const tileTitle = 'Category Nature';

export const tileLabels = [
  { labelText: 'Must', className: 'label--text' },

  { labelText: 'Need', className: 'label--text' },

  { labelText: 'Want', className: 'label--text' },
  { labelText: 'Other', className: 'label--text' },
];
//------------------------------------

const initialNewCategoryData = {
  category: '',
  subcategory: '',
  budget: 0.0,
  nature: '',
};

type CategoryDataType = {
  category: string;
  subcategory: string;
  budget: string | number;
  nature: string;
};

//-------------------------
function NewCategory() {
  const location = useLocation();
  //---states------
  const [categoryData, setCategoryData] = useState<CategoryDataType>(
    initialNewCategoryData
  );
  const [activeCategory, setActiveCategory] = useState('');

  // console.log('🚀 ~ NewCategory ~ location:', location);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setCategoryData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('addHandler');
  }

  function natureHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // console.log('natureHandler', e.currentTarget.id);
    const activeNature = !!e.currentTarget.id ? e.currentTarget.id : '';
    setActiveCategory(activeNature);
    setCategoryData((prev) => ({ ...prev, nature: activeNature }));
  }

  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setActiveCategory('');
    setCategoryData(initialNewCategoryData);
  }

  return (
    <section className='page__container'>
      <TopWhiteSpace variant={'dark'} />

      {/* main title component */}
      <div className='page__content'>
        {/* main__title could be a component */}

        <div className='main__title--container'>
          <Link
            to={location.state.previousRoute}
            relative='path'
            className='iconLeftArrow'
          >
            {/* <Link to='..' relative='path' className='iconLeftArrow'> */}
            <LeftArrowSvg />
          </Link>
          <div className='form__title'>{'New Category'}</div>
        </div>

        {/*  */}

        <form className='form__box'>
          <div className='container--categoryName form__container'>
            <div className='input__box'>
              <label className='label form__title'>{'Category Name'}</label>

              <input
                type='text'
                className={`input__container`}
                placeholder={`Category Name`}
                name={'category'}
                onChange={inputHandler}
                value={categoryData.category}
              />
            </div>

            <div className='input__box'>
              <label className='label form__title'>{'subcategory'}</label>

              <input
                type='text'
                className={`input__container`}
                placeholder={`category name`}
                name={'subcategory'}
                onChange={inputHandler}
                value={categoryData.subcategory}
              />
            </div>

            <button
              className={'bullet--input input__container'}
              onClick={addHandler}
            >
              <PlusSignSvg />
            </button>

            <div className='input__box'>
              <label className='label form__title'>{'budget'}</label>

              <input
                // type='text'
                type='number'
                className={`input__container`}
                placeholder={`amount`}
                name={'budget'}
                onChange={inputHandler}
                value={categoryData.budget}
              />
            </div>
          </div>

          {/* convert to a Component of tiles or badges */}
          <div className='container--nature'>
            <div className='form__title form__title--tiles'>{tileTitle}</div>

            <div className='nature__tiles tiles__container'>
              {tileLabels.map((label, indx) => {
                // console.log(label.labelText);
                return (
                  <button
                    className='nature__btn tile__button'
                    onClick={natureHandler}
                    key={`${indx}-tile`}
                    id={`${label.labelText.toLowerCase()}`}
                    style={
                      activeCategory == label.labelText.toLowerCase()
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
            <FormSubmitBtn onClickHandler={onSubmitForm}>save</FormSubmitBtn>

            {/* <button
              type='submit'
              className='submit__btn'
              onClick={onSubmitForm}
              id={'save'}
            >
              {`${'Save'}`}
            </button> */}
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewCategory;
