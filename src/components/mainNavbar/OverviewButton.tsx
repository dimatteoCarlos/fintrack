import OverviewSvg from '../../assets/mainNavbarSvg/OverviewSvg.svg';
import { NavLink } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function OverviewButton() {
  return (
    <>
      <NavLink to='/budget' className={classNavLink}>
        <div className='iconContainer flx-col-center'>
          <OverviewSvg />
        </div>

        <span className='button--label'>{`overview`}</span>
      </NavLink>
    </>
  );
}

export default OverviewButton;
