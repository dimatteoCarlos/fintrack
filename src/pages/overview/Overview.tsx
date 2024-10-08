import SavingGoals from './components/SavingGoals';
import AccountBalance from './components/AccountBalance';
import Investment from './components/Investment';
import LastMovements from './components/LastMovements';
import LastDebts from './components/LastDebts';
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
