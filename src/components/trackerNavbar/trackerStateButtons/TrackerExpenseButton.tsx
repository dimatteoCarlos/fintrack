import TrackerStateButton from './TrackerStateButton.tsx';
import ExpenseSvg from '../../../assets/trackerNavbarSvg/ExpenseSvg.svg';
import { useLocation } from 'react-router-dom';


function TrackerExpenseButton() {
  const location = useLocation();
  const trackerState=location.pathname.split('/')[2]
  const isActive = !!trackerState? trackerState.toLowerCase() == 'expense':true;
  console.log('🚀 ~ TrackerExpenseButton ~ isActive:', isActive, trackerState);

  return (
    <>
      <div className='trackerStateButton__container'>
        <div className={`trackerStateButton ${isActive ? 'active' : ''}`}>
          <TrackerStateButton>
            <ExpenseSvg />
          </TrackerStateButton>
        </div>
        <div className='trackerStateButton__state--title'>{'Expense'}</div>
      </div>
    </>
  );
}

export default TrackerExpenseButton;
