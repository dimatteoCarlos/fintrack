import AddSvg from '../../assets/mainNavbarSvg/AddSvg.svg';
import { NavLink } from 'react-router-dom';

const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;

function TrackerButton() {
  return (
    <>
      <NavLink to='/tracker/expense' className={classNavLink}>
        <div className='iconContainer flx-col-center'>
          <AddSvg />
        </div>

        <span className='button--label'>{`tracker`}</span>
      </NavLink>
    </>
  );
}

export default TrackerButton;
