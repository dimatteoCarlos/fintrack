import { url_investment_acc } from '../../../endpoints';
import { StatusSquare } from '../../../general_components/boxComponents';
import { CardTitle } from '../../../general_components/CardTitle';
import { currencyFormat } from '../../../helpers/functions';
import { useFetch } from '../../../hooks/useFetch';
import { InvestmentAccountsType } from '../../../types/types';
import { CreateNewAccountPropType } from '../Overview';
import OpenAddEditBtn from '../../../general_components/OpenAddEditBtn';

export type InvestmentAccountToRenderType = {
  title1: string;
  subtitle1: string;
  title2: string;
  capital: number;
  balanceType: string;
  type: string;
  currency: string;
};
//PENDIENTE REGLA DE NEGOCIO PARA VALORAR EL STATUS SQUARE Y PASAR EL ALERT
function InvestmentAccountBalance({
  createNewAccount,
  originRoute,
}: CreateNewAccountPropType) {
  //Investment temporary data
  //questions: does status have some conditional or variable style? semaforo? cual es la regla de negocio?
  //seems that balanceType has at least two possible values: loss / profit or earned
  //capital could be the amount of the investment or not needed?
  //factual balance is datum or calculated?

  const defaultInvestmentAcc = [
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      title2: 'factual balance',
      capital: 500123,
      balanceType: '% Loss',
      currency: 'eur',
      type: 'type',
    },
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 100000,
      title2: 'factual balance',
      balanceType: '% Loss',
      currency: 'yen',
      type: 'type',
    },
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 2750000,
      title2: 'factual balance',
      balanceType: '% Profit',
      currency: 'usd',
      type: 'type',
    },
    {
      title1: 'acc name',
      subtitle1: 'capital invested',
      capital: 987654.55,
      title2: 'factual balance',
      balanceType: '% Profit',
      currency: 'cop',
      type: 'type',
    },
  ];

  const { data, isLoading, error } =
    useFetch<InvestmentAccountsType>(url_investment_acc);
  // console.log('Investment_accounts:', data, error, isLoading);

  const accountsToRender: InvestmentAccountToRenderType[] =
    data && !error && !isLoading && data?.accounts?.length
      ? defaultInvestmentAcc
      : //temporaryly commented
        // ?   data?.accounts?.map((acc) => ({
        //   title1: acc.name,
        //   subtitle1: 'capital invested',
        //   capital: acc.balance,
        //   title2: 'factual balance',
        //   type: acc.type,
        //   balanceType: '% earned',
        //   currency: acc.currency,
        //   status: (
        //     <span>
        //       <StatusSquare />
        //     </span>
        //   ),
        // }))
        defaultInvestmentAcc;

  return (
    <>
      {/*GOALS INVESTMENT  */}
      <div className='presentation__card__title__container flx-row-sb'>
        <CardTitle>Investment</CardTitle>
      </div>

      <article className='goals__investment'>
        {/* Account Factual Balance  */}

        {accountsToRender!.map((investment, indx) => {
          const {
            title1,
            subtitle1,
            title2,
            balanceType,
            capital,
            type,
            currency,
          } = investment;

          // console.log('🚀 ~ {investment.map ~ capital:', capital);

          {
            return (
              <div
                className='tile__container tile__container--investment flx-row-sb'
                key={`account-${indx}`}
              >
                <div className='tile__container__col tile__container__col--investment col--investment--left'>
                  <div className='tile__title tile__title--account'>
                    {title1} ({type})
                  </div>
                  <div className='tile__subtitle tile__subtitle--account'>
                    {subtitle1} :
                    <span className='tile__title tile__title--account'>
                      {currencyFormat(
                        currency,
                        capital
                        // ,
                        // formatNumberCountry
                      )}
                    </span>
                  </div>
                </div>

                <div className='tile__container__col tile__container__col--investment col--investment--right'>
                  <div className='tile__title tile__title--account'>
                    {title2}
                  </div>
                  <div className='tile__status--investment--right '>
                    <StatusSquare
                      alert={0.5 - Math.random() < 0 ? 'alert' : ''} //temporary values
                    ></StatusSquare>
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

export default InvestmentAccountBalance;
