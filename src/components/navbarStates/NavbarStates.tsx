import React from 'react';

import ExpenseIcon from '../../assets/navbarState/expenseSvg.svg';
import IncomeIcon from '../../assets/navbarState/incomeSvg.svg';
import InvestmentIcon from '../../assets/navbarState/investmentSvg.svg';
import DebtsIcon from '../../assets/navbarState/debtsSvg.svg';

type NavbarStatesTypeProp = { activeState: string };

const NavbarStates = ({ activeState }: NavbarStatesTypeProp) => {
  // states controls navbar

  function activeClassFn(activeState: string, stateName: string, ohterClasses?:string) {
    return (
      ohterClasses +
      (activeState.trim().toLowerCase() == stateName.trim().toLowerCase()
        ? ' active'
        : '')
    );
  }
  // const activeState=paramState;

  const navbarStates = [
    {
      stateText: 'expense',
      stateIcon: (
        <ExpenseIcon
          className={
            activeState.toLowerCase().trim() == 'expense'
              ? 'state__icon active'
              : 'state__icon'
          }
        />
      ),
    },

    {
      stateText: 'income',
      stateIcon: (
        <IncomeIcon
          className={`state__icon ${
            activeState.trim().toLowerCase() == 'income' ? 'active' : ''
          }`}
        />
      ),
    },
    {
      stateText: 'investment',
      stateIcon: (
        <InvestmentIcon className={activeClassFn(activeState, 'investment')} />
      ),
    },
    {
      stateText: 'debts',
      stateIcon: <DebtsIcon className={activeClassFn(activeState, 'debts')} />,
    },
  ];

  return (
    <>
      <nav className='navbar__states'>
        {navbarStates.map((state) => (
          <div className='navbar__state' key={`${state.stateText}`}>
            <div className='icon '>{state.stateIcon}</div>
            <div className='state--title'>{state.stateText}</div>
          </div>
        ))}
      </nav>
    </>
  );
};

export default NavbarStates;
