import WalletSvg from '../../assets/mainNavbarSvg/WalletSvg.svg';
import { NavLink } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function BudgetButton() {
  return (
    <>
      <NavLink to='/budget' className={classNavLink}>
        <div className='iconContainer flx-col-center'>
          <WalletSvg />
        </div>

        <span className='button--label'>{`budget`}</span>
      </NavLink>
    </>
  );
}

export default BudgetButton;
