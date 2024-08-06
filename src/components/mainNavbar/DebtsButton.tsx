import DebtsSvg from '../../assets/mainNavbarSvg/DebtsSvg.svg';
import { NavLink, useLocation } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function DebtsButton() {
  const btnName = 'debts';
  const isBtnActive = useLocation().pathname.split('/')[1]==btnName?'active':'';
  return (
    <>
   <NavLink to='/debts/debtors' className={`${classNavLink} ${isBtnActive}`}>
        <div className='iconContainer flx-col-center'>
          <DebtsSvg />
        </div>

        <span className='button--label'>{`debts`}</span>
      </NavLink>
    </>
  );
}

export default DebtsButton;
