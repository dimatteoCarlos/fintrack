import {
  BigBoxResult,
  BoxRow,
  Button,
  CardTitle,
  OpenAddEditBtn,
  Presentation,
  StatusSquare,
  TitleHeader,
} from '../overview/overviewComponents/OverviewComponents';

import './overview-styles/overview-styles.css';

import { currencyFormat } from '../../helpers/functions';
import Dots3LightSvg from '../../assets/Dots3LightSvg.svg';
import { Link } from 'react-router-dom';

//
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
    status: 'status prediction',
  };

  const saved = {
    title: 'saved',
    concept: 'Current (w/return)',
    amount: 0,
    actual: 'Actual (no investment)',
  };
  const remaining = {
    title: 'remaining',
    concept: 'Current (w/return)',
    amount: 0,
    actual: 'Actual (no investment)',
  };
  const income = {
    title: 'Monthly Income (Avg.)',
    concept: '',
    amount: 0,
    status: '% status',
  };
  const expenses = {
    title: 'Monthly Expenses (Avg.)',
    concept: '',
    amount: 0,
    status: '% status',
  };

  //Accounts

  const accounts = [
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 0,
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 999999999.99,
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 0,
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
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
      balanceType: '% Loss',
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
      balanceType: '% Loss',
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
      balanceType: '% Loss',
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
      <main className='overviewLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader />
          </div>
        </div>

        <BigBoxResult>
          <div className='bigBox__frame'>
            {bigScreenInfo.map((info, indx) => {
              const { title, amount } = info;

              return (
                <div
                  className='bigBox__frame__screenRow flx-row-sb'
                  key={`row-${indx}`}
                >
                  <div className='bigBox__screenRow--title '>{title}</div>
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
        </BigBoxResult>

        <Presentation>
          <div className='presentation__card__title__container flx-row-sb'>
            <CardTitle>Saving Goals</CardTitle>
            <Link className='flx-col-center icon ' to={'/accounts/edit'}>
              <Dots3LightSvg />{' '}
            </Link>
          </div>

          {/* SAVING GOALS component  */}

          {/* GOALS HEAD INFO  */}
          <article className='goals__main__info'>
            <div className='tile__container tile__container--goal'>
              <div className='tile__container__col'>
                <div className='tile__subtitle'>{goal.title}</div>
              </div>

              <div className='tile__container__col'>
                <div className='tile__title'>
                  {/* 0,000.00 */}
                  {currencyFormat(
                    defaultCurrency,
                    goal.amount,
                    formatNumberCountry
                  )}
                </div>
                <div className='tile__status__container flx-row-sb'>
                  <StatusSquare></StatusSquare>

                  <div className='tile__subtitle tile__status--goal'>
                    {goal.status}
                  </div>
                </div>
              </div>
            </div>

            {/* GOALS INDICATORS  */}
            {/* Goal info  row card  w first 2 cards */}

            <div className='tiles__container flx-row-sb'>
              <div className='tile__container tile__container__col tile__container__col--goalInfo'>
                <div className='tile__subtitle'>{saved.title}</div>
                <div className='tile__title tile__title--goalInfo'>
                  {saved.concept}
                </div>
                <div className='tile__subtitle'>{saved.actual}</div>
              </div>

              <div className='tile__container tile__container__col tile__container__col--goalInfo'>
                <div className='tile__subtitle'>{remaining.title}</div>
                <div className='tile__title tile__title--goalInfo'>
                  {remaining.concept}
                </div>
                <div className='tile__subtitle'>{remaining.actual}</div>
              </div>
            </div>

            {/* Goal info  row card  w second pair of cards*/}
            <div className='tiles__container flx-row-sb'>
              {/* Goal info left column*/}
              <div className='tile__container tile__container__col tile__container__col--goalInfo'>
                <div className='tile__subtitle letterSpaceSmall'>
                  {income.title}
                </div>
                <div className='tile__title '>
                  {currencyFormat(
                    defaultCurrency,
                    income.amount,
                    formatNumberCountry
                  )}
                </div>
                <div className='tile__status__container flx-row-sb'>
                  <StatusSquare></StatusSquare>

                  <div className='tile__subtitle tile__status--goal'>
                    {income.status}
                  </div>
                </div>
              </div>

              {/* Goal info right column*/}

              <div className='tile__container tile__container__col tile__container__col--goalInfo'>
                <div className='tile__subtitle letterSpaceSmall'>
                  {expenses.title}
                </div>
                <div className='tile__title '>
                  {currencyFormat(
                    defaultCurrency,
                    expenses.amount,
                    formatNumberCountry
                  )}
                </div>
                <div className='tile__status__container flx-row-sb'>
                  <StatusSquare></StatusSquare>

                  <div className='tile__subtitle tile__status--goal'>
                    {expenses.status}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/*GOALS ACCOUNTS  */}
          <div className='presentation__card__title__container flx-row-sb'>
            <CardTitle>Accounts</CardTitle>
            <Link className='flx-col-center icon ' to={'/accounts/edit'}>
              {/* <Dots3LightSvg />{' '} */}
            </Link>
          </div>

          <article className='goals__account'>
            {/* Account Balance  */}

            {accounts.map((account, indx) => {
              const { nameAccount, concept, amount } = account;

              {
                return (
                  <div
                    className='tile__container tile__container--account flx-col-sb'
                    key={`account-${indx}`}
                  >
                    <div className='tile__subtitle tile__subtitle--account'>
                      {nameAccount}
                    </div>
                    <div className='tile__title tile__title--account'>
                      {/* {concept}{' '} */}
                      {currencyFormat(
                        defaultCurrency,
                        amount,
                        formatNumberCountry
                      )}
                    </div>
                  </div>
                );
              }
            })}

            {/* <div className='tile__container tile__container--account flx-col-sb'>
              <div className='tile__subtitle tile__subtitle--account'>
                {'nameAccount'}
              </div>
              <div className='tile__title tile__title--account'>
                {'concept'} <span>{'amount'}</span>
              </div>
            </div>
            <div className='tile__container tile__container--account flx-col-sb'>
              <div className='tile__subtitle tile__subtitle--account'>
                {'nameAccount'}
              </div>
              <div className='tile__title tile__title--account'>
                {'concept'} <span>{'amount'}</span>
              </div>
            </div>
            <div className='tile__container tile__container--account flx-col-sb'>
              <div className='tile__subtitle tile__subtitle--account'>
                {'nameAccount'}
              </div>
              <div className='tile__title tile__title--account'>
                {'concept'} <span>{'amount'}</span>
              </div>
            </div> */}

            {/* para last movement y debts, buscar componente Box container y hacer listas, para cada article o section */}
          </article>
          {
            <OpenAddEditBtn>
              <div className='open__btn__label'>Add Account</div>
            </OpenAddEditBtn>
          }

          {/*GOALS INVESTMENT  */}
          <div className='presentation__card__title__container flx-row-sb'>
            <CardTitle>Investment</CardTitle>
            {/* <Link className='flx-col-center icon ' to={'/accounts/edit'}> */}
            {/* <Dots3LightSvg />{' '} */}
            {/* </Link> */}
          </div>

          <article className='goals__investment'>
            {/* Account Balance  */}

            {investment.map((investment, indx) => {
              const { title1, subtitle1, capital, title2, balanceType } =
                investment;

              {
                return (
                  <div
                    className='tile__container tile__container--investment flx-row-sb'
                    key={`account-${indx}`}
                  >
                    <div className='tile__container__col tile__container__col--investment col--investment--left'>
                      <div className='tile__title tile__title--account'>
                        {title1}
                      </div>
                      <div className='tile__subtitle tile__subtitle--account'>
                        {subtitle1}

                        {/* {currencyFormat(
                          defaultCurrency,
                          0,
                          formatNumberCountry
                        )} */}
                      </div>
                    </div>

                    <div className='tile__container__col tile__container__col--investment col--investment--right'>
                      <div className='tile__title tile__title--account'>
                        {title2}
                      </div>
                      <div className='tile__status--investment--right '>
                        <StatusSquare></StatusSquare>

                        <div className='tile__subtitle subtitle__status__investment--right '>
                          {balanceType}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </article>
        </Presentation>
      </main>
    </>
  );
}

export default OverviewLayout;
