import WalletSvg from '../../assets/mainNavbarSvg/WalletSvg.svg';
import { NavLink, useLocation } from 'react-router-dom';

const classNavLink = `mainNavbarButton
${({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')}
`;

function BudgetButton() {
  const btnName = 'budget';
  const isBtnActive =
    useLocation().pathname.split('/')[1] == btnName ? 'active' : '';

  return (
    <>
      <NavLink
        to='/budget/categories'
        className={`${classNavLink} ${isBtnActive}`}
      >
        <div className='iconContainer flx-col-center'>
          <WalletSvg />
        </div>

        <span className='button--label'>{`budget`}</span>
      </NavLink>
    </>
  );
}

export default BudgetButton;
