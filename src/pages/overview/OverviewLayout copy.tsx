import {
  BigBoxResult,
  BoxContainer,
  BoxRow,
  DebtsCardTitle,
  DisplayMainScreen,
  OpenAddEditBtn,
  Presentation,
  StatusSquare,
  TitleHeader,
} from '../overview/overviewComponents/OverviewComponents';

import { currencyFormat } from '../../helpers/functions';

function OverviewLayout() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

  //Temporary Dummy data
  //Saving Goals
  const bigScreenInfo = [
    { title: 'net worth', amount: 0 },
    { title: 'income', amount: 0 },
    { title: 'expenses', amount: 0 },
  ];

  const goal = {
    title: 'goal',
    amount: 0,
    status: (
      <span>
        <StatusSquare />
        status prediction
      </span>
    ),
  };
  const saved = {
    title: 'saved',
    concept: 'Current (w/return)',
    amount: 0,
    actual: 'Actual (no investment)',
  };
  const remaining = {
    title: 'saved',
    concept: 'Current (w/return)',
    amount: 0,
    actual: 'Actual (no investment)',
  };

  //Accounts

  const accounts = [
    {
      name: 'acc name',
      title: 'balance',
      amount: 0,
    },
    {
      name: 'acc name',
      title: 'balance',
      amount: 0,
    },
    {
      name: 'acc name',
      title: 'balance',
      amount: 0,
    },
    {
      name: 'acc name',
      title: 'balance',
      amount: 0,
    },
  ];

  //Investment

  const investment = [
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 0,
      title2: 'factual balance',
      status: (
        <span>
          <StatusSquare />
        </span>
      ),
      balanceType: { loss: 0, earn: 0 },
    },
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 0,
      title2: 'factual balance',
      status: (
        <span>
          <StatusSquare />
        </span>
      ),
      balanceType: { loss: 0, earn: 0 },
    },
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 0,
      title2: 'factual balance',
      status: (
        <span>
          <StatusSquare />
        </span>
      ),
      balanceType: { loss: 0, earn: 0 },
    },
  ];

  //Last Movements
  const lastMovements = [
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },

    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
  ];

  //Last Debts
  const latestDebtsRecords = [
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },

    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
    {
      categoryName: 'Category Name',
      Record: 'record',
      description: 'Description',
      date: 'MM/DD',
    },
  ];

  return (
    <>
      <div className='overviewLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader />
          </div>
        </div>

        <BigBoxResult>
          <DisplayMainScreen>
            <div className='displayScreen bigBox__container'>
              <div className='bigBox__frame'>
                {bigScreenInfo.map((info, indx) => {
                  const { title, amount } = info;

                  return (
                    <div
                      className='bigBox__frame__screenRow'
                      key={`row-${indx}`}
                    >
                      <div className='bigBox__screenRow--title'>{title}</div>
                      <div className='bigBox__screenRow--amount'>
                        {currencyFormat(
                          defaultCurrency,
                          amount,
                          formatNumberCountry
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </DisplayMainScreen>
        </BigBoxResult>

        <Presentation>
          <DebtsCardTitle>Summary</DebtsCardTitle>

          <div className='list__main__container'>
            {
              // debtors.map((debtor, indx) => {
              // const { name, lastname, amount, type } = debtor;
              // return (
              //   <BoxContainer key={indx}>
              //     <BoxRow>
              //       <div className='box__title'>
              //         {name}, {lastname}{' '}
              //       </div>
              //       <div className='box__title'>
              //         {' '}
              //         {currencyFormat(
              //           defaultCurrency,
              //           amount,
              //           formatNumberCountry
              //         )}
              //       </div>
              //     </BoxRow>
              //     <BoxRow>
              //       <BoxRow>
              //         <div className='flx-row-sb'>
              //           <StatusSquare />
              //           <div className='box__subtitle'>{type} </div>
              //         </div>
              //       </BoxRow>
              //       {/* <div className='box__subtitle'> </div> */}
              //     </BoxRow>
              //   </BoxContainer>
              // );
              // })
            }
          </div>
          {/*           
          <OpenAddEditBtn>
            <div className='open__btn__label'>New Debtor</div>
          </OpenAddEditBtn> */}
        </Presentation>
      </div>
    </>
  );
}

export default OverviewLayout;
