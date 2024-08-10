import { Link, useLocation, useNavigate } from 'react-router-dom';
import LeftArrowDarkSvg from '../../../assets/LeftArrowDarkSvg.svg';
//-----C
export function TitleHeader() {
  const location = useLocation();
  const previousRoute = location.pathname.split('/')[0] ?? '/';
  const currentRoute = location.pathname.split('/')[1];
  const navigateTo = useNavigate();

  return (
    <Link to='..' className='title__header__container'>
      <div
        className='iconArrowLeftDark'
        onClick={() => navigateTo(previousRoute)}
        // onClick={()=>navigateTo(-1)}
      >
        <LeftArrowDarkSvg />
      </div>

      <div className='title__header'>{currentRoute}</div>
    </Link>
  );
}

//----------------

export function BoxRow({ children }: any) {
  return <div className='box__row flx-row-sb'>{children}</div>;
}
//---------------------

export function StatusSquare({ children }: any) {
  return <span className='status__square'>{children}</span>;
}
