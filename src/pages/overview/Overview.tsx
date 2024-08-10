

import SavingGoals from './SavingGoals';
import AccountBalance from './AccountBalance';
import Investment from './Investment';
import LastMovements from './LastMovements';
import LastDebts from './LastDebts';


function Overview() {
  return (
    <section className='content__presentation'>
      <div className='cards__presentation'>
        <SavingGoals />

        <AccountBalance />

        <Investment />

        <LastMovements />

        <LastDebts />
      </div>
    </section>
  );
}
export default Overview;
