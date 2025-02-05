import { useState } from 'react';
import LeftArrowSvg from '../../../assets/LeftArrowSvg.svg';
import TopWhiteSpace from '../../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignSvg from '../../../assets/PlusSignSvg.svg';
import { Link } from 'react-router-dom';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';
import { validationData } from '../../../helpers/functions.ts';
import '../styles/forms-styles.css';
import useInputNumberHandler from '../../../hooks/useInputNumberHandler.tsx';
import { FormNumberInputType } from '../../../types/types.ts';
// import { useLocation } from 'react-router-dom';

//----Category Nature Tiles---------------
export const tileTitle = 'Category Nature';
export const tileLabels = [
  { labelText: 'Must', className: 'label--text' },
  { labelText: 'Need', className: 'label--text' },
  { labelText: 'Want', className: 'label--text' },
  { labelText: 'Other', className: 'label--text' },
  // { labelText: 'New One', className: 'label--text' },
];
//-------------------------------------------------
type CategoryDataType = {
  category: string;
  subcategory: string;
  amount: number | '';
  nature: string;
};
//-------------------------
function NewCategory() {
  const initialNewCategoryData: CategoryDataType = {
    category: '',
    subcategory: '',
    amount: '',
    nature: '',
  };

  //---states------
  const initialFormData: FormNumberInputType = {
    amount: '',
  };
  const [formData, setFormData] =
    useState<FormNumberInputType>(initialFormData);

  const [categoryData, setCategoryData] = useState<CategoryDataType>(
    initialNewCategoryData
  );
  const [activeNature, setActiveNature] = useState(
    initialNewCategoryData.nature
  );
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});

  //functions
  const { inputNumberHandlerFn } = useInputNumberHandler(
    setFormData,
    setValidationMessages,
    setCategoryData
  );
  //---------
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'amount') {
      inputNumberHandlerFn(name, value);
    } else {
      setCategoryData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    //adding function
    console.log('addHandler subcategory method PENDING to define');
  }

  function natureHandler(e: React.MouseEvent<HTMLButtonElement>) {
    // console.log('natureHandler', e.currentTarget.id);
    e.preventDefault();
    const activeNature = !!e.currentTarget.id ? e.currentTarget.id : '';
    setActiveNature(activeNature);
    setCategoryData((prev) => ({ ...prev, nature: activeNature }));
  }
  //--
  function onSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('onSubmitForm');
    //--data form validation
    const newValidationMessages = validationData(categoryData);
    // const newValidationMessages = { ...validationData(categoryData) };// console.log('mensajes:', { newValidationMessages });
    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }
    //--
    //new category data into database //POST ENDPOINT HERE
    console.log('New category data to POST:', { categoryData });
    //----------------------------------------------------
    //resetting form values
    setActiveNature(initialNewCategoryData.nature);
    setCategoryData(initialNewCategoryData);
    setValidationMessages({});
    setFormData(initialFormData);
  }
  //-----------------------
  return (
    <section className='page__container'>
      <TopWhiteSpace variant={'dark'} />

      <div className='page__content'>
        <div className='main__title--container'>
          {/* <Link to={location.state.previousRoute} relative='path' className='iconLeftArrow'
          > */
          /*this works but another way was used */}

          <Link to='..' relative='path' className='iconLeftArrow'>
            <LeftArrowSvg />
          </Link>
          <div className='form__title'>{'New Category'}</div>
        </div>

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
              </label>
              <span className='validation__errMsg'>
                {validationMessages['subcategory']}
              </span>
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
              {/* functionalitiy and data structure of this add button for category and subcategories is PENDING */}
            </button>

            <div className='input__box'>
              <label htmlFor='amount' className='label form__title'>
                {'budget'}&nbsp;
                <span
                  className='validation__errMsg'
                  style={{
                    color: validationMessages['amount']
                      ?.toLowerCase()
                      .includes('format:')
                      ? 'var(--lightSuccess)'
                      : 'var(--error)',
                  }}
                >
                  {validationMessages['amount']?.replace('Format:', '')}
                </span>
              </label>

              <input
                className={'input__container'}
                type='text'
                name='amount'
                placeholder={'amount'}
                value={formData.amount}
                onChange={inputHandler}
              />
            </div>
          </div>

          {/* convert to a Component of tiles or badges */}
          <div className='container--nature'>
            <div className='form__title form__title--tiles'>
              {tileTitle}
              <div className='validation__errMsg'>
                {validationMessages['nature']}
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
                      activeNature.toLowerCase() ===
                      label.labelText.toLowerCase()
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
