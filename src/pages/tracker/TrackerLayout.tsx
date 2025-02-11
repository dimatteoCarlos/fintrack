import LogoMenuIcon from '../../general_components/header/LogoMenuIcon';
import TrackerNavbar from '../../general_components/trackerNavbar/TrackerNavbar';
import { Outlet } from 'react-router-dom';
import { currencyFormat } from '../../helpers/functions';

import './styles/tracker-style.css';
import { CURRENCY_OPTIONS, DEFAULT_CURRENCY } from '../../helpers/constants';

function TrackerLayout() {
  //temporary values------------
  const defaultCurrency = DEFAULT_CURRENCY;
  const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
  const availableBudget = 0; //Need to define where to get this, wether from backend or frontend
  //-------------------------------
  return (
    <>
      {/* <div className='trackerLayout bordered'> */}
      <div className='layout__header'>
        <div className='headerContent__container '>
          <LogoMenuIcon />
          <div className={`displayScreen ${'light'}`}>
            <div className={`displayScreen--concept ${'dark'}`}>
              {'Available Budget'}
            </div>
            <div className={`displayScreen--result ${'dark'}`}>
              {currencyFormat(
                defaultCurrency,
                availableBudget,
                formatNumberCountry
              )}
            </div>
          </div>
        </div>
      </div>
      <TrackerNavbar />
      <div className='cards__presentation--tracker'>
        <Outlet />
      </div>
    </>
  );
}

export default TrackerLayout;
