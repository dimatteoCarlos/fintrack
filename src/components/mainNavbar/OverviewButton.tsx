import OverviewSvg from '../../assets/mainNavbarSvg/OverviewSvg.svg';
import { NavLink, useLocation } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function OverviewButton() {
  const btnName = 'overview';
  const isBtnActive = useLocation().pathname.split('/')[1]==btnName?'active':'';
  return (
    <>
   <NavLink to='/overview/accounts' className={`${classNavLink} ${isBtnActive}`}>
        <div className='iconContainer flx-col-center'>
          <OverviewSvg />
        </div>

        <span className='button--label'>{`overview`}</span>
      </NavLink>
    </>
  );
}

export default OverviewButton;
