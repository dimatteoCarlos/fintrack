import { useState } from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';

import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';
import '../styles/forms-styles.css';
import { validationData } from '../../../helpers/functions.ts';

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

  // { labelText: 'New One', className: 'label--text' },
];
//------------------------------------

type CategoryDataType = {
  category: string;
  subcategory: string;
  budget: number | string;
  nature: string;
};

const initialNewCategoryData: CategoryDataType = {
  category: '',
  subcategory: '',
  budget: '',
  nature: '',
};

//-------------------------
function NewCategory() {
  // const location = useLocation();
  //---states------n
  const [categoryData, setCategoryData] = useState<CategoryDataType>(
    initialNewCategoryData
  );
  const [activeCategory, setActiveCategory] = useState('');

  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //functions
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { name, value } = e.target;

    const valueToSave =
      name === 'budget' ? (value !== '' ? parseFloat(value) : 0) : value;

    setCategoryData((prev) => ({ ...prev, [name]: valueToSave }));
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    //adding function
    console.log('addHandler subcategory to define');
  }

  function natureHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // console.log('natureHandler', e.currentTarget.id);
    const activeNature = !!e.currentTarget.id ? e.currentTarget.id : '';
    setActiveCategory(activeNature);
    setCategoryData((prev) => ({ ...prev, nature: activeNature }));
  }
  //--
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('onSubmitForm');

    //--
    const newValidationMessages = { ...validationData(categoryData) };
    console.log('mensajes:', { newValidationMessages });

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    //--
    //function to save categoryData in DB
    //POST the new profile data into database
    console.log('data to POST:', { categoryData });

    //resetting form values
    setActiveCategory('');
    setCategoryData(initialNewCategoryData);
    setValidationMessages({});
  }
  //-----------------------
  return (
    <section className='page__container'>
      <TopWhiteSpace variant={'dark'} />

      {/* main title component */}
      <div className='page__content'>
        {/* main__title could be a component */}

        <div className='main__title--container'>
          {/* <Link
            to={location.state.previousRoute}
            relative='path'
            className='iconLeftArrow'
          > */}

          <Link to='..' relative='path' className='iconLeftArrow'>
            <LeftArrowSvg />
          </Link>
          <div className='form__title'>{'New Category'}</div>
        </div>

        {/*  */}

        <form className='form__box'>
          <div className='container--categoryName form__container'>
            <div className='input__box'>
              <label htmlFor='category' className='label form__title'>
                {'Category Name'}&nbsp;
                <div className='validation__errMsg'>
                  {validationMessages['category']}
                </div>
              </label>

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
              <label htmlFor='subcategory' className='label form__title'>
                {'subcategory'}&nbsp;
                <div className='validation__errMsg'>
                  {validationMessages['subcategory']}
                </div>
              </label>

              <input
                type='text'
                className={`input__container`}
                placeholder={`category name`}
                name={'subcategory'}
                onChange={inputHandler}
                value={categoryData.subcategory}
              />
            </div>

            <button className={'input__container'} onClick={addHandler}>
              <PlusSignSvg />
            </button>

            <div className='input__box'>
              <label htmlFor='budget' className='label form__title'>
                {'budget'}&nbsp;
                <div className='validation__errMsg'>
                  {validationMessages['budget']}
                </div>
              </label>

              <input
                className={`input__container`}
                type='number'
                name={'budget'}
                placeholder={`amount`}
                onChange={inputHandler}
                value={categoryData['budget']}
              />
            </div>
          </div>

          {/* convert to a Component of tiles or badges */}
          <div className='container--nature'>
            <div className='form__title form__title--tiles'>
              {tileTitle}
              <div className='validation__errMsg'>
                {validationMessages['category']}
              </div>
            </div>

            <div className='nature__tiles'>
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
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewCategory;
