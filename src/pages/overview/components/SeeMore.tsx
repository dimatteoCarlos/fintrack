import { Link } from 'react-router-dom';
import LeftArrowDarkSvg from '../../../assets/LeftArrowDarkSvg.svg';

type ChildrenPropType = { children?: React.ReactNode; previousRoute: string };
//--------------------------------------------------------
export function SeeMore({ children, previousRoute }: ChildrenPropType) {
  function onClickHandler() {
    console.log('Message:', 'This is the See More page rendering');
  }

  return (
    <div className='see_more'>
      <button
        onClick={onClickHandler}
        style={{ backgroundColor: 'white', color: 'brown', padding: '0.5rem' }}
      >
        <Link to={previousRoute} relative='path' className='iconArrowLeftDark'>
          <LeftArrowDarkSvg />
        </Link>
        {children}
      </button>
    </div>
  );
}
