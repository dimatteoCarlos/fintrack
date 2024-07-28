import TrackerStateButton from './TrackerStateButton';
import IncomeSvg from '../../../assets/trackerNavbarSvg/IncomeSvg.svg';

import { useLocation } from 'react-router-dom';
function TrackerIncomeButton() {
  return (
    <>
      <div className='trackerStateButton__container'>
        <div
          className={`trackerStateButton`}
        >
          <TrackerStateButton>
            <IncomeSvg />
          </TrackerStateButton>
        </div>
        <div className='trackerStateButton__state--title'>{'Income'}</div>
      </div>
    </>
  );
}

export default TrackerIncomeButton;
