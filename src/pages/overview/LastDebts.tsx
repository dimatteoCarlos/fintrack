import React from 'react';
import {
  BoxContainer,
  BoxRow,
  Button,

} from './components/VariousComponents';
import ChevronRightSvg from '../../assets/ChevronRightSvg.svg';
import { CardTitle } from '../../components/CardTitle';

function LastDebts() {
  //Last Debts
  const latestDebtsrecords = [
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: 'MM/DD',
    },

    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      record: 'Record',
      description: 'Description',
      date: 'MM/DD',
    },
  ];

  return (
    <>
      {/*LAST DEBTS  */}
      <article className='goals__last__movements'>
        <div className='presentation__card__title__container flx-row-sb'>
          <CardTitle>Last Debts</CardTitle>
          {/* <CardTitle><div className='main__subtitle'>Last 30 days</div></CardTitle> */}
        </div>

        <div className='main__subtitle'>Latest records</div>

        <div className='list__main__container'>
          {latestDebtsrecords.map((movement, indx) => {
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

      {/* 
          <Link className='seeMore' to={'/accounts/edit'}>
            <div className='link'>See More</div> <ChevronRightSvg />{' '}
          </Link> */}

      <Button>
        <div className='seeMore'>
          See More <ChevronRightSvg />
        </div>
      </Button>
    </>
  );
}

export default LastDebts;
