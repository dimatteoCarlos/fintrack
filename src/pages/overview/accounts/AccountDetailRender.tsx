import React from 'react';
import ChevronRightSvg from '../../assets/ChevronRightSvg.svg';
import { Link } from 'react-router-dom';
import { CardTitle } from '../../components/CardTitle';
import { BoxContainer, BoxRow } from '../../components/boxComponents';

type LastMovementsPropType={
  lastMovements:{[key:string]:string}[]
}

function LastMovements({lastMovements}:LastMovementsPropType) {
  //Last Movements
  // const lastMovements = [
  //   {
  //     categoryName: 'Category Name',
  //     record: 'Record',
  //     description: 'Description',
  //     date: 'MM/DD',
  //   },

  //   {
  //     categoryName: 'Category Name',
  //     record: 'Record',
  //     description: 'Description',
  //     date: 'MM/DD',
  //   },
  //   {
  //     categoryName: 'Category Name',
  //     record: 'Record',
  //     description: 'Description',
  //     date: 'MM/DD',
  //   },
  //   {
  //     categoryName: 'Category Name',
  //     record: 'Record',
  //     description: 'Description',
  //     date: 'MM/DD',
  //   },
  // ];

  return (
    <>
      {/*LAST MOVEMENTS  */}
      <article className='goals__last__movements'>
        <div className='presentation__card__title__container'>
          <CardTitle>Last Movements</CardTitle>
        </div>

        {/* <article className='goals__last__movements'> */}
        <div className='main__subtitle'>Last 30 days</div>

        <div className='list__main__container'>
          {lastMovements.map((movement, indx) => {
            const { categoryName, record, description, date } = movement;

            return (
              <BoxContainer key={indx}>
                <BoxRow>
                  <div className='box__title'>{categoryName} </div>
                  <div className='box__title'>
                    {record}
                    {/* {currencyFormat(
                        defaultCurrency,
                        amount,
                        formatNumberCountry
                      )} */}
                  </div>
                </BoxRow>
                <BoxRow>
                  <BoxRow>
                    <div className='flx-row-sb'>
                      {/* <StatusSquare /> */}
                      <div className='box__subtitle'>{description} </div>
                    </div>
                  </BoxRow>
                  <div className='box__subtitle'> {date}</div>
                </BoxRow>
              </BoxContainer>
            );
          })}
        </div>
      </article>

      <Link className='seeMore' to={''}>
        <div className='link' onClick={()=>(console.log('See More'))}>See More</div> <ChevronRightSvg />{' '}

      </Link>
    </>
  );
}

export default LastMovements;
