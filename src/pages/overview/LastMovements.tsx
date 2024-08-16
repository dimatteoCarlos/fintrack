import ChevronRightSvg from '../../assets/ChevronRightSvg.svg';
import { Link } from 'react-router-dom';
import { CardTitle } from '../../components/CardTitle';
import ListContent from '../../components/listContent/ListContent.tsx';

function LastMovements() {
  //Last Movements

  const lastMovements = [
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },

    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: new Date(),
    },
  ];

  return (
    <>
      {/*LAST MOVEMENTS  */}
      <article className='goals__last__movements'>
        <div className='presentation__card__title__container'>
          <CardTitle>{'Last Movements'}</CardTitle>
        </div>
        <div className='main__subtitle'>Last 30 days</div>

        <ListContent lastMovements={lastMovements} />
      </article>

      <Link className='seeMore' to={''}>
        <div className='link' onClick={() => console.log('See More')}>
          {'See More'}
        </div>
        <ChevronRightSvg />{' '}
      </Link>
    </>
  );
}

export default LastMovements;
