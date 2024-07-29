import './state.css';
import Logo from '../../assets/logo.svg';
import ArrowDownIcon from '../../assets/arrowDownSvg.svg';
import MenuIcon from '../../assets/navbarState/menuSvg.svg';
import TrackerIcon from '../../assets/navbarState/plusSvg.svg';

import NavbarStates from '../trackerNavbar/TrackerNavbar.tsx';
import NavbarTracker from '../mainNavbar/MainNavbar.tsx';
import { useState } from 'react';
import { changeCurrency } from '../../helpers/functions.ts';

// states controls navbar

const labelsOfExpenseIncome: { [key: string]: { [key: string]: string } } = {
  expense: {
    cardBtmTit: 'Category',
    cardBtmScreenLabel: 'Category/Subcategory',
  },
  income: { cardBtmTit: 'source', cardBtmScreenLabel: 'Source of income' },
};
//-------------
type ExpenseIncomeTypeProp = {
  stateName: string;
};

const ExpenseIncome = ({ stateName }: ExpenseIncomeTypeProp) => {
  //HACER UN CONTEXT PARA QUE LA SELECCION DEL CURRENCY ESTE DISPONIBLE COMO GLOBAL STATE EN TODAS LAS VISTAS,
  //why not make a context to assure the same currency is used as a global state, and be available on all the views

  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');

  function toggleCurrency() {
    const current =changeCurrency(currency);

    console.log('current:', current, typeof current);

    setCurrency((prev) => current(prev));
  }

  return (
    <section className='home__layout'>
      <header className='home__header'>
        <div className='home__top--whiteSpace'></div>

        <header className='header__container'>
          <div className='header__content'>
            <div className='header__logoAndIcon'>
              {/* <div className='logo__container'> */}
              <Logo />
              {/* </div> */}
              {/* <div className='menuIcon__container'> */}
              <MenuIcon />
              {/* </div> */}
            </div>

            <div className='screen'>
              <div className='screen--concept'>{'Available budget'}</div>
              <div className='screen--result'>{'$0,000.00'}</div>
            </div>
            <NavbarStates activeState={stateName} />
          </div>
        </header>
      </header>

      <div className='content__presentation'>
        <div className='state__cards'>
          <div className='state__card--top'>

            <div className='card--title'>{'Amount'}</div>


            <div className='card__screen'>
              <div className='screen--result'>{'0,000.00'}</div>
              <div className='icon-currency' onClick={toggleCurrency}>
                {currency.toUpperCase()}
              </div>
            </div>

            <div className='card--title'>{'Account'}</div>

            <div className='card__screen'>
              <div className='screen--concept'>{'Available Account'}</div>

              <div className='screen--icon icon--arrow'>
                <ArrowDownIcon />
              </div>
            </div>
          </div>

          <div className='stack__sep'>
            <span className='circleL'></span>
            <span className='bar'></span>
            <span className='circleR'></span>
          </div>

          <div className='state__card--bottom'>
            <div className='card--title'>
              {labelsOfExpenseIncome[stateName].cardBtmTit}
            </div>
            <div className='card__screen'>
              <div className='screen--concept'>
                {labelsOfExpenseIncome[stateName].cardBtmScreenLabel}
              </div>

              <div className='screen--icon icon--arrow'>
                <ArrowDownIcon />
              </div>
            </div>
            <div className='card--title'>Note</div>
            <div className='card__note'>
              <div className='card__screen'>
                <div className='screen--concept'>{'Description'}</div>
              </div>
              <div className='tracker__icon'>
                <TrackerIcon className='iconPlus' />
              </div>
            </div>
          </div>
        </div>

        <nav className='navbar__tracker'>
          <NavbarTracker
          // activeState={stateTracker}
          />
        </nav>
      </div>
    </section>
  );
};

export default ExpenseIncome;
