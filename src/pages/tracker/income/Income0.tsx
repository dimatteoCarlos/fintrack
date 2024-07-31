import '../../styles/generalStyles.css';
import Header from '../../../components/header/Header.tsx';

import TrackerNavbar from '../../../components/trackerNavbar/TrackerNavbar.tsx';

export type GlobalStatesType = {
  availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};

function Income() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };

  const enteredCurrency = 'eur';

  const selectedCountry = currencyOptions[enteredCurrency];

  const availableBudget = 0;

  const globalStates: GlobalStatesType = {
    availableBudget,
    enteredCurrency,
    selectedCountry,
  };

  //-----------------

  return (
    <>
      <div className="expense"
    style={{color:'yellow'}}
    >
      INCOME
    </div>
    </>
  );
}

export default Income;

