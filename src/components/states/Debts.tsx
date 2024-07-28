import './state.css';
import Logo from '../../assets/logo.svg';
import ArrowDownIcon from '../../assets/arrowDownSvg.svg';
import MenuIcon from '../../assets/navbarState/menuSvg.svg';
import TrackerIcon from '../../assets/navbarState/plusSvg.svg';

import NavbarStates from '../trackerNavbar/TrackerNavbar.tsx';
import NavbarTracker from '../mainNavbar/MainNavbar.tsx';
import { useState } from 'react';

// states controls navbar

const Debts = () => {
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const [typeInv, setTypeInv] = useState<'lend' | 'borrow'>('lend');

  function toggleCurrency() {
    const current = (currency: 'cop' | 'usd') => {
      if (currency == 'usd') {
        return 'cop';
      } else if (currency == 'cop') {
        return 'usd';
      } else {
        return 'usd';
      }
    };

    console.log('current:', current, typeof current);

    setCurrency((prev) => current(prev));
  }

  function toggleTypeInv() {
    const current = (type: 'lend' | 'borrow') => {
      if (typeInv == 'lend') {
        return 'borrow';
      } else if (typeInv == 'borrow') {
        return 'lend';
      } else {
        return 'lend';
      }
    };

    console.log('current:', current, typeof current);

    setTypeInv((prev) => current(prev));
  }

  return (
    <section className='home__layout'>
      <header className='home__header'>
        <div className='home__top--whiteSpace'></div>

        <header className='header__container'>
          <div className='header__content'>
            <div className='header__logoAndIcon'>
              <div className='logo__container'>
                <Logo className='logo' />
              </div>
              <div className='menuIcon__container'>
                <MenuIcon className='menuIcon' />
              </div>
            </div>

            <div className='screen'>
              <div className='screen--concept'>{'Available budget'}</div>
              <div className='screen--result'>{'$0,000.00'}</div>
            </div>
            <NavbarStates activeState={'debts'} />
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

            <div className='card--title'>{'Debtor'}</div>

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
            <div className='card__typeDate'>
              <div className='card__typeDate--type'>
                <div className='card--title'>{'Type'}</div>
                <div className='card__screen--type'>
                  <div className='screen--concept' onClick={toggleTypeInv}>
                    {typeInv}
                  </div>
                </div>
              </div>
              <div className='card__typeDate--date'>
                <div className='card--title'>{'Date'}</div>
                <div className='card__screen'>
                  <div className='screen--concept'>{'MM/DD/YY'}</div>
                </div>
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
          <NavbarTracker />
        </nav>
      </div>
    </section>
  );
};

export default Debts;
