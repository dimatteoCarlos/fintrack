import TrackerStateButton from './TrackerStateButton.tsx';
import DebtsSvg from '../../../assets/trackerNavbarSvg/DebtsSvg.svg';
import { useLocation } from 'react-router-dom';

function TrackerDebtsButton() {


  return (
    <>
      <div className='trackerStateButton__container'>
        <div className={`trackerStateButton `}>
        <TrackerStateButton>
          <DebtsSvg />
        </TrackerStateButton>
        </div>
        <div className='trackerStateButton__state--title'>{'Debts'}</div>
      </div>
  
    </>
  );
}

export default TrackerDebtsButton;
