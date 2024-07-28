import TopWhiteSpace from '../topWhiteSpace/TopWhiteSpace.tsx';
import HeaderContent from './HeaderContent.tsx';

import LogoMenuIcon from './LogoMenuIcon.tsx';
import { GlobalStatesType } from '../../pages/tracker/expense/Expense.tsx';
import DisplayScreenNumber from './displayScreen/displayScreenNumber/DisplayScreenNumber.tsx';
import './headerStyle.css';

function Header({
  availableBudget,
  enteredCurrency,
  selectedCountry,
}: GlobalStatesType): JSX.Element {
  return (
    <>
      <header className='home__header'>
        <TopWhiteSpace bgc='light' />
        <div className='header__container'>
          <HeaderContent>
            <LogoMenuIcon />
            <DisplayScreenNumber
              amount={availableBudget}
              chosenCurrency={enteredCurrency}
              countryCurrency={selectedCountry}
            />
          </HeaderContent>
        </div>

        {/* <NavbarStates activeState={stateName} /> */}
      </header>
    </>
  );
}

export default Header;
