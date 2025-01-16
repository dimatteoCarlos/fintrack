import { Link } from 'react-router-dom';
import { currencyFormat } from '../../../helpers/functions';
import { CardTitle } from '../../../general_components/CardTitle';
import OpenAddEditBtn from '../../../general_components/OpenAddEditBtn';
import { CreateNewAccountPropType } from '../Overview';
import { url_accounts } from '../../../endpoints';
import { useFetch } from '../../../hooks/useFetch';
import { ExpenseAccountsType } from '../../../types/types';
import { CURRENCY_OPTIONS } from '../../../helpers/constants';

function AccountBalance({
  createNewAccount,
  originRoute,
}: CreateNewAccountPropType) {
  // //temporary values------------
  const defaultCurrency = 'usd';
  const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];

  //Accounts

  type AccountToRenderType = {
    nameAccount: string;
    concept: string;
    amount: number;
    type: string;
  };

  const defaultAccounts: AccountToRenderType[] = [
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 0,

      type: 'type',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 999999999.99,
      type: 'type',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 0,
      type: 'type',
    },
    {
      nameAccount: 'acc name',
      concept: 'balance',
      amount: 0,
      type: 'type',
    },
  ];

  const { data, isLoading, error } =
    useFetch<ExpenseAccountsType>(url_accounts);
  // console.log('accounts:', data, error, isLoading);

  const accountsToRender: AccountToRenderType[] =
    data && !isLoading && !error && data.accounts?.length
      ? defaultAccounts
      : //temporaryly commented
        // data.accounts.map((acc) => ({
        //   nameAccount: acc.name,
        //   concept: 'balance', //it is important to know the data stored in database
        //   amount: acc.balance,
        //   type: acc.type,
        // }))

        defaultAccounts;

  // const navigateTo: NavigateFunction = useNavigate();

  // const location = useLocation();
  // const originRoute = location.pathname;

  // function createNewAccount(originRoute: string) {
  //   navigateTo(originRoute + '/new_account', {
  //     state: { previousRoute: originRoute },
  //   });
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/*EXPENSE ACCOUNTS  */}
      <div className='presentation__card__title__container flx-row-sb'>
        <CardTitle>Accounts</CardTitle>
        <Link className='flx-col-center icon ' to={'/accounts/edit'}></Link>
      </div>
      <article className='goals__account'>
        {/* Account Balance  */}

        {accountsToRender.map((account, indx) => {
          const { nameAccount, amount, type } = account;

          {
            return (
              <Link
                to={`/overview/accounts/:${indx}`}
                className='tile__container tile__container--account flx-col-sb'
                key={`account-${indx}`}
              >
                <div className='tile__subtitle tile__subtitle--account'>
                  {nameAccount} ({type})
                </div>
                <div className='tile__title tile__title--account'>
                  {/* {concept}{' '} */}
                  {currencyFormat(defaultCurrency, amount, formatNumberCountry)}
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
