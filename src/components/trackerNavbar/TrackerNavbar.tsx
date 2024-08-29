import TrackerDebtsButton from './trackerStateButtons/TrackerDebtsButton';
import TrackerExpenseButton from './trackerStateButtons/TrackerExpenseButton';
import TrackerIncomeButton from './trackerStateButtons/TrackerIncomeButton';
import TrackerInvestmentButton from './trackerStateButtons/TrackerInvestmentButton';
import './trackerStateButtons/styles/trackerStateButton-style.css';

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
