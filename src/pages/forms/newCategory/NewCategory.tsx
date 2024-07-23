import LeftArrowSvg from '../../../../assets/LeftArrowSvg.svg';
// import LeftArrow from '../../../../assets/LeftArrowSvg.tsx';
import TopWhiteSpace from '../../../../components/topWhiteSpace/TopWhiteSpace.tsx';
import PlusSignBtn from './PlusSignBtn.tsx';
import { PlusSignIcon } from './PlusSignIcon.tsx';
import './newCategoryForm.css';
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
    { labelText: '', className: 'iconContent', content: <PlusSignIcon /> },
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

  return (
    <section className='page__container'>
      <TopWhiteSpace bgc={'dark'} />

      <div className='page__content'>
        <form action='submit' className='form__box'>
          <div className='main__title--container'>
            <LeftArrowSvg className='iconLeftArrow' />
            <div className='form__title'>{formTitle}</div>
          </div>

          <div className='container--categoryName'>
            {newCategoryFormLabels.map((item, indx) => {
              const { labelText, content, className } = item;

              return (
                <>
                  {/* {className == 'iconContent' && <PlusSignBtn />} */}

                  {className !== 'iconContent' && (
                    <div
                      className='input--bullet'
                      key={`${labelText}-${crypto.randomUUID()}`}
                    >
                      <label className='label form__title'>{labelText}</label>
                      <input
                        key={`input-${labelText}-${crypto.randomUUID()}`}
                        type='text'
                        className={`bullet bullet--input`}
                        placeholder={`${content}`}
                        onChange={inputHandler}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCategory;
