import { Link } from 'react-router-dom';
import { currencyFormat } from '../../helpers/functions';
import { CardTitle } from '../../components/CardTitle';
import OpenAddEditBtn from '../../components/OpenAddEditBtn';

function AccountBalance() {
  
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

  return (
    <>
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
                  {currencyFormat(defaultCurrency, amount, formatNumberCountry)}
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
      </article>
      {
        <OpenAddEditBtn>
          <div className='open__btn__label'>Add Account</div>
        </OpenAddEditBtn>
      }
    </>
  );
}

export default AccountBalance;
