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

  const availableBudget = 0;
  //-------------------------------

  return (
    <div className='trackerLayout'>
      <div className='layout__header'>
        <div className='headerContent__container'>
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

      <>
        <div className='content__presentation'>
          <div className='cards__presentation cards__presentation--tracker'>
            <Outlet />
          </div>
        </div>
      </>
    </div>
  );
}

export default TrackerLayout;
