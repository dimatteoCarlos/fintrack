import Header from '../../components/header/Header';

import MainNavbar from '../../components/mainNavbar/MainNavbar.tsx';

export type GlobalStatesType = {
  availableBudget: number;
  enteredCurrency: string;
  selectedCountry: string;
};
function Layout() {
  //-------------------------------

  return (
    <>
      <section className='home__layout'>
        <Header />
        {/* <MainNavbar /> */}
        <MainNavbar />
      </section>
    </>
  );
}

export default Layout;
