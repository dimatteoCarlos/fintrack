import SavingGoals from './SavingGoals';
import AccountBalance from './AccountBalance';
import Investment from './Investment';
import LastMovements from './LastMovements';
import LastDebts from './LastDebts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export type CreateNewAccountPropType = {
  originRoute: string;
  createNewAccount(originRoute: string): void;
};
function Overview() {
  const navigateTo: NavigateFunction = useNavigate();

  const location = useLocation();
  const originRoute = location.pathname;

  function createNewAccount(originRoute: string) {
    navigateTo(originRoute + '/new_account', {
      state: { previousRoute: originRoute },
    });
  }

  return (
    <section className='content__presentation'>
      <div className='cards__presentation'>
        <SavingGoals />

        <AccountBalance
          createNewAccount={createNewAccount}
          originRoute={originRoute}
        />

        <Investment
          createNewAccount={createNewAccount}
          originRoute={originRoute}
        />

        <LastMovements />

        <LastDebts />
      </div>
    </section>
  );
}
export default Overview;
