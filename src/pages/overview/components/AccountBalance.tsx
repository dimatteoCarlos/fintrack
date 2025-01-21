import { Link } from 'react-router-dom';
import { currencyFormat } from '../../../helpers/functions';
import { CardTitle } from '../../../general_components/CardTitle';
import { CreateNewAccountPropType } from '../Overview';
import { url_accounts } from '../../../endpoints';
import { useFetch } from '../../../hooks/useFetch';
import { CurrencyType, ExpenseAccountsType } from '../../../types/types';
import { CURRENCY_OPTIONS, DEFAULT_CURRENCY } from '../../../helpers/constants';

import OpenAddEditBtn from '../../../general_components/OpenAddEditBtn';

function AccountBalance({
  createNewAccount,
  originRoute,
}: CreateNewAccountPropType) {
  // //temporary values------------
  const defaultCurrency = DEFAULT_CURRENCY;
  const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];

  //Accounts
  type AccountToRenderType = {
    nameAccount: string;
    concept: string;
    balance: number;
    account_type?: string;
    type?: string;
    currency?: CurrencyType;
    id?: number;
    date?: Date; //starting_point
  };

  const ACCOUNT_DEFAULT: AccountToRenderType[] = [
    {
      nameAccount: 'acc name_1',
      concept: 'balance',
      balance: 0.932546,
      id: 2001,
      currency: 'cop',
      type: 'type1',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      balance: 9999999.99,
      id: 2002,
      type: 'type2',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance', //field
      balance: 987654.365,
      id: 2003,
      type: 'type2',
      currency: 'eur',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      balance: 123456.02,
      id: 2004,
      type: 'usd',
    },
  ];

  const { data, isLoading, error } =
    useFetch<ExpenseAccountsType>(url_accounts);
  console.log('accounts:', data, error, isLoading);

  const accountsToRender: AccountToRenderType[] =
    data && !isLoading && !error && data.accounts?.length
      ? // ? ACCOUNT_DEFAULT
        //temporaryly commented
        ACCOUNT_DEFAULT
      : // ?  data?.accounts?.map((acc, indx) => ({
        //     nameAccount: acc.name,
        //     concept: 'balance', //it is important to know the data structure from backend
        //     balance: acc.balance,
        //     type: acc.type,
        //     id: acc.id ?? `${acc.name + '_' + indx}`,
        //     currency: acc.currency ?? defaultCurrency,
        //   }))
        ACCOUNT_DEFAULT;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/*EXPENSE ACCOUNTS  */}
      <div className='presentation__card__title__container flx-row-sb'>
        <CardTitle>Accounts Balance</CardTitle>
        <Link className='flx-col-center icon ' to={'edit'}></Link>
      </div>

      <article className='goals__account'>
        {/* Account Balance  */}
        {accountsToRender.map((account) => {
          const { nameAccount, balance, type, id, currency } = account;
          {
            return (
              <Link
                to={`/overview/accounts/:${id}`}
                className='tile__container tile__container--account flx-col-sb'
                key={`account-${id}`}
              >
                <div className='tile__subtitle tile__subtitle--account'>
                  {nameAccount} ({type})
                </div>
                <div className='tile__title tile__title--account'>
                  {/* {concept}{' '} */}
                  {currencyFormat(
                    currency ?? defaultCurrency,
                    balance,
                    formatNumberCountry
                  )}
                </div>
              </Link>
            );
          }
        })}
      </article>

      {
        <OpenAddEditBtn
          btnFunction={createNewAccount}
          btnFunctionArg={originRoute}
          btnPreviousRoute={originRoute}
        >
          <div className='open__btn__label'>Add Account</div>
        </OpenAddEditBtn>
      }
    </>
  );
}

export default AccountBalance;
