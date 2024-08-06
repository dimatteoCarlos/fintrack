import AddSvg from '../../assets/mainNavbarSvg/AddSvg.svg';
import { NavLink, useLocation } from 'react-router-dom';



const classNavLink = `mainNavbarButton ${({
  isActive,
}: {
  isActive: boolean;
}) => (isActive ? 'active' : '')}`;


function TrackerButton() {
  const btnName = 'tracker';
  const isBtnActive = useLocation().pathname.split('/')[1]==btnName?'active':'';

  return (
    <>
      <NavLink to='/tracker/expense' className={`${classNavLink} ${isBtnActive}`}>
        <div className='iconContainer flx-col-center'>
          <AddSvg />
        </div>

        <span className='button--label'>{`tracker`}</span>
      </NavLink>
    </>
  );
}

export default TrackerButton;
