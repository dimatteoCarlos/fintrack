import TrackerDebtsButton from './trackerStateButtons/TrackerDebtsButton';
import TrackerExpenseButton from './trackerStateButtons/TrackerExpenseButton';
import TrackerIncomeButton from './trackerStateButtons/TrackerIncomeButton';
import TrackerInvestmentButton from './trackerStateButtons/TrackerInvestmentButton';

function TrackerNavbar() {
  return (
    <nav className='trackerNavbar__container'>
      <TrackerExpenseButton />
      <TrackerIncomeButton />
      <TrackerInvestmentButton />
      <TrackerDebtsButton />
    </nav>
  );
}

export default TrackerNavbar;
