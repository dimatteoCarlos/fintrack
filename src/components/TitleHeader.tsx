import { Link, useLocation } from 'react-router-dom';
import LeftArrowDarkSvg from '../assets/LeftArrowDarkSvg.svg';

// /------TitleHeader--------C
export function TitleHeader() {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];

  return (
    <Link to={'..'} className='title__header__container'>
      <div className='iconArrowLeftDark'>
        <LeftArrowDarkSvg />
      </div>

      <div className='title__header'>{currentRoute}</div>
    </Link>
  );
}
