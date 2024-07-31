import DisplayScreenNumber from '../../components/header/displayScreen/displayScreenNumber/DisplayScreenNumber';
import LogoMenuIcon from '../../components/header/LogoMenuIcon';
import TrackerNavbar from '../../components/trackerNavbar/TrackerNavbar';
import CardTrackerPresentation from './CardTrackerPresentation';
import { Outlet } from 'react-router-dom';

function TrackerLayout() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };

  const enteredCurrency = 'usd';

  const formatNumberCountry = currencyOptions[enteredCurrency];

  const availableBudget = 0;

  //-------------------------------

  return (
    <div className='trackerLayout'>
      <div className='trackerLayout__header'>
        <div className='headerContent__container'>
          <LogoMenuIcon />
          <DisplayScreenNumber
            amount={availableBudget}
            chosenCurrency={enteredCurrency}
            countryCurrency={formatNumberCountry}
          />
        </div>
      </div>

      <TrackerNavbar />
      <CardTrackerPresentation>
        <Outlet />
      </CardTrackerPresentation>
    </div>
  );
}

export default TrackerLayout;
