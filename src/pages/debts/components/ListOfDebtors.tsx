import { BoxContainer, BoxRow } from './boxComponents';
import { currencyFormat } from '../../../helpers/functions';

function ListOfDebtors() {
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
      <article className='list__main__container'>
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
                  {currencyFormat('usd', amount, 'en-US')}
                </div>
              </BoxRow>
              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <span className='status__square'></span>
                    <div className='box__subtitle'>{type} </div>
                  </div>
                </BoxRow>
              </BoxRow>
            </BoxContainer>
          );
        })}
      </article>
    </>
  );
}

export default ListOfDebtors;
