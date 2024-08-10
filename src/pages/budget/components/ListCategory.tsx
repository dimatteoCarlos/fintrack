import { BoxRow } from '../../../components/boxComponents.tsx';
import { StatusSquare } from './VariousComponents.tsx';

function ListCategory() {
  //List Category
  const categories = [
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
  ];

  return (
    <>
      {/*LIST CATEGORY  */}

      <article className='list__main__container'>
        {categories.map((category, indx) => {
          const { categoryName, spent, statusTitle, budget } = category;

          return (
            <div className='box__container .flx-row-sb' key={indx}>
              <BoxRow>
                <div className='box__title'>{categoryName} </div>
                <div className='box__title'>{spent} </div>
              </BoxRow>

              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <StatusSquare />
                    <div className='box__subtitle'>{statusTitle} </div>
                  </div>
                </BoxRow>
                <div className='box__subtitle'>{budget} </div>
              </BoxRow>
            </div>
          );
        })}
      </article>
    </>
  );
}

export default ListCategory;
