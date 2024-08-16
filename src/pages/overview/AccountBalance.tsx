import { Link } from 'react-router-dom';
import { currencyFormat } from '../../helpers/functions';
import { CardTitle } from '../../components/CardTitle';
import OpenAddEditBtn from '../../components/OpenAddEditBtn';
import { CreateNewAccountPropType } from './Overview';

function AccountBalance({
  createNewAccount,
  originRoute,
}: CreateNewAccountPropType) {
  // //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

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

  // const navigateTo: NavigateFunction = useNavigate();

  // const location = useLocation();
  // const originRoute = location.pathname;

  // function createNewAccount(originRoute: string) {
  //   navigateTo(originRoute + '/new_account', {
  //     state: { previousRoute: originRoute },
  //   });
  // }

  return (
    <>
      {/*GOALS ACCOUNTS  */}
      <div className='presentation__card__title__container flx-row-sb'>
        <CardTitle>Accounts</CardTitle>
        <Link className='flx-col-center icon ' to={'/accounts/edit'}></Link>
      </div>
      <article className='goals__account'>
        {/* Account Balance  */}

        {accounts.map((account, indx) => {
          const { nameAccount, concept, amount } = account;
          console.log('🚀 ~ {accounts.map ~ concept:', concept);

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
                  {currencyFormat(defaultCurrency, amount, formatNumberCountry)}
                </div>
              </div>
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
