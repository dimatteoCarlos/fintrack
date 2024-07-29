import '../../styles/generalStyles.css';
import Header from '../../../components/header/Header.tsx';

import TrackerNavbar from '../../../components/trackerNavbar/TrackerNavbar.tsx';

export type GlobalStatesType = {
  availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};

function Expense() {
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
    style={{}}
    >
      EXPENSE
    </div>
      {/* <section className='home__layout'> */}
        {/* <Header {...globalStates} /> */}
        {/* <nav className='trackerNavbar__container'> */}
          {/* <TrackerNavbar /> */}
        {/* </nav> */}
      {/* </section> */}
    </>
  );
}

export default Expense;
