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
} from '../debts/debtsComponents/DebtsComponents';
import { currencyFormat } from '../../helpers/functions';

function DebtsLayout() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];
  const message = "you're owed";
  const total = 0;

  //Temporarily Dummy data
  const debtors = [
    {
      name: 'name',
      lastname: 'last name',
      amount: 0,
      type: 'debtor/lender',
    },
    {
      name: 'name',
      lastname: 'last name',
      amount: 0,
      type: 'debtor/lender',
    },
    {
      name: 'name',
      lastname: 'last name',
      amount: 0,
      type: 'debtor/lender',
    },
    {
      name: 'name',
      lastname: 'last name',
      amount: 0,
      type: 'debtor/lender',
    },
    {
      name: 'name',
      lastname: 'last name',
      amount: 0,
      type: 'debtor/lender',
    },
  ];

  

  return (
    <>
      <div className='debtsLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader />
          </div>
        </div>

        <BigBoxResult>
          <div className='bigBox__mainInfo'>{message.toUpperCase()}</div>

          <DisplayMainScreen>
            <div className='displayScreen--concept'>{'total'}</div>
            <div className='displayScreen--result'>
              {currencyFormat(defaultCurrency, total, formatNumberCountry)}
            </div>
          </DisplayMainScreen>
        </BigBoxResult>

        <Presentation>
          <DebtsCardTitle>Summary</DebtsCardTitle>

          <div className='list__main__container'>
            {debtors.map((debtor, indx) => {
              const { name, lastname, amount, type } = debtor;

              return (
                <BoxContainer key={indx}>
                  <BoxRow>
                    <div className='box__title'>
                      {name}, {lastname}{' '}
                    </div>
                    <div className='box__title'>
                      {' '}
                      {currencyFormat(
                        defaultCurrency,
                        amount,
                        formatNumberCountry
                      )}
                    </div>
                  </BoxRow>
                  <BoxRow>
                    <BoxRow>
                      <div className='row-flx-sb'>
                        <StatusSquare />
                        <div className='box__subtitle'>{type} </div>
                      </div>
                    </BoxRow>
                    <div className='box__subtitle'> </div>
                  </BoxRow>
                </BoxContainer>
              );
            })}
          </div>
          <OpenAddEditBtn>
            <div className='open__btn__label'>New Debtor</div>
          </OpenAddEditBtn>
        </Presentation>
      </div>
    </>
  );
}

export default DebtsLayout;
