import { BoxContainer, BoxRow } from './boxComponents';
import { currencyFormat } from '../../../helpers/functions';
import { useFetch } from '../../../hooks/useFetch';
import { DebtsType } from '../../../types/types';
import { url_debtors_debt } from '../../../endpoints';

export type DebtsToRender = {
  type?: 'debtor' | 'lender';
  debtor_name: string;
  total_amount_borrowed: number;
  total_amount_lent: number;
  net_amount: number;
  currency?: string;
  transaction_count?: number;
};

const typeOfDebtorfn = (
  borrowed: number,
  lent: number
): 'debtor' | 'lender' => {
  const diff = lent - borrowed;
  // const type = diff > 0 ? 'debtor' : diff < 0 ? 'lender' : 'none';
  const type = diff >= 0 ? 'debtor' : 'lender';

  return type;
};

function ListOfDebtors() {
  //Temporarily Dummy data
  const defaultDebts: DebtsToRender[] = [
    {
      debtor_name: 'name',

      total_amount_borrowed: 0,
      total_amount_lent: 0,
      net_amount: 0,
      type: 'debtor',
    },
    {
      debtor_name: 'name',

      total_amount_borrowed: 0,
      total_amount_lent: 0,
      net_amount: 0,
      type: 'lender',
    },
    {
      debtor_name: 'name',

      total_amount_borrowed: 0,
      total_amount_lent: 0,
      net_amount: 0,
      type: 'debtor',
    },
    {
      debtor_name: 'name',

      total_amount_borrowed: 0,
      total_amount_lent: 0,
      net_amount: 0,
      type: 'debtor',
    },
    {
      debtor_name: 'name',

      total_amount_borrowed: 0,
      total_amount_lent: 0,
      net_amount: 0,
      type: 'lender',
    },
  ];

  const { data, isLoading, error } = useFetch<DebtsType>(url_debtors_debt);
  // console.log('data:', data);

  const debtList: DebtsToRender[] =
    data && !isLoading && !error && data.result?.length
      ? data.result.map((debt) => {
          const {
            debtor_name,
            total_amount_borrowed,
            total_amount_lent,
            net_amount,
          } = debt;

          return {
            debtor_name,
            total_amount_borrowed,
            total_amount_lent,
            net_amount,
            type: typeOfDebtorfn(total_amount_borrowed, total_amount_lent),
          };
        })
      : defaultDebts;

  return (
    <>
      <article className='list__main__container'>
        {debtList.map((debtor, indx) => {
          const {
            debtor_name: name,
            total_amount_borrowed,
            total_amount_lent,
            net_amount,
          } = debtor;
          const transactionType =
            -total_amount_borrowed + total_amount_lent < 0
              ? 'Lender'
              : 'Debtor';
          return (
            <BoxContainer key={indx}>
              <BoxRow>
                <div className='box__title'>{name}</div>
                <div className='box__title'>
                  {' '}
                  {currencyFormat('usd', net_amount, 'en-US')}
                </div>
              </BoxRow>
              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <span className='status__square'></span>
                    <div className='box__subtitle'>{transactionType} </div>
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
