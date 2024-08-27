import DebtsSvg from '../../assets/mainNavbarSvg/DebtsSvg.svg';
import { NavLink } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function DebtsButton() {
  return (
    <>
      <NavLink
        to='/debts/debtors'
        className={`${classNavLink} 
   `}
      >
        <div className='iconContainer flx-col-center'>
          <DebtsSvg />
        </div>

        <span className='button--label'>{`debts`}</span>
      </NavLink>
    </>
  );
}

export default DebtsButton;
