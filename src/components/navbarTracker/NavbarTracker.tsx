import React, { useState } from 'react';

import Add from '../../assets/navbarTracker/Add.svg';
import Debts from '../../assets/navbarTracker/Debts.svg';
import Overview from '../../assets/navbarTracker/Overview.svg';
import Wallet from '../../assets/navbarTracker/Wallet.svg';

// type TrackerStateType = {
//   activeState: 'tracker' | 'budget' | 'debts' | 'overview';
// };

const NavbarTracker = () =>
  // {activeState}:TrackerStateType

  {
    const [stateTracker, setStateTracker] = useState<string>('tracker');

    function activeClassFn(
      activeState: string,
      stateName: string,
      ohterClasses?: string
    ) {
      return (
        ohterClasses +
        (activeState.trim().toLowerCase() == stateName.trim().toLowerCase()
          ? ' active'
          : '')
      );
    }

    function activateTrackerControl(e: React.BaseSyntheticEvent<MouseEvent>) {
      e.preventDefault();

      // console.log(e.target);
      const trackerState = e.target.id.split('-')[0];
      setStateTracker((prev) => (!!trackerState ? trackerState : prev));

      console.log(trackerState);
    }

    return (
      <>
        <nav className='navbarTracker__controls'>
          <div
            id={'tracker-container'}
            className={activeClassFn(
              stateTracker,
              'tracker',
              'control__container'
            )}
          >
            <Add
              className='addIcon control--icon'
              onClick={activateTrackerControl}
              id={'tracker'}
            />
            {/* <img
              src='/tracker.png'
              alt=''
              className='addIcon control--icon'
              onClick={activateTrackerControl}
              id={'tracker'}
            /> */}
            <div id={'tracker-label'} className='control--label'>
              {'tracker'}
            </div>
          </div>

          <div
            id='budget-container'
            className={activeClassFn(
              stateTracker,
              'budget',
              'control__container'
            )}
          >
            {/* <Wallet
              className='walletIcon control--icon'
              id='budget'
              onClick={activateTrackerControl}
            /> */}

            <img
              src='/budget.png'
              alt=''
              className='walletIcon control--icon'
              id='budget'
              onClick={activateTrackerControl}
            />

            <div className='control--label' id='budget-label'>
              {'budget'}
            </div>
          </div>

          <div
            id={'debts-container'}
            className={activeClassFn(
              stateTracker,
              'debts',
              'control__container'
            )}
          >
            {/* <Debts
              className='debtsIcon control--icon '
              onClick={activateTrackerControl}
              id={'debts'}
            /> */}
            <img
              src='/debts.png'
              alt=''
              className='debtsIcon control--icon '
              onClick={activateTrackerControl}
              id={'debts'}
            />

            <div className='control--label' id='debts-label'>
              {'debts'}
            </div>
          </div>

          <div
            id={'overview-container'}
            className={activeClassFn(
              stateTracker,
              'overview',
              'control__container'
            )}
            // onClick={activateTrackerControl}
          >
            {/* <Overview
              id={'overview'}
              className='overviewIcon control--icon'
              onClick={activateTrackerControl}
            /> */}

            <img
              src='/overview.png'
              alt=''
              id={'overview'}
              className='overviewIcon control--icon'
              onClick={activateTrackerControl}
            />
            <div id='overview-label' className='control--label'>
              {'overview'}
            </div>
          </div>
        </nav>
      </>
    );
  };

export default NavbarTracker;
