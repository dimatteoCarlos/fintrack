import Header from '../../components/header/Header';
import TrackerNavbar from '../../components/trackerNavbar/TrackerNavbar';



export type GlobalStatesType = {
  availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};
function Layout() {

  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };

  const enteredCurrency = 'eur';

  const selectedCountry = currencyOptions[enteredCurrency];

  const availableBudget = 0;

  const globalStates: GlobalStatesType = {
    availableBudget,
    enteredCurrency,
    selectedCountry,
  };
//-------------------------------

  return (
    <>
      {/* <section className='home__layout'> */}
        <Header {...globalStates} />

        <TrackerNavbar />
      {/* </section> */}
    </>
  );
}

export default Layout;
