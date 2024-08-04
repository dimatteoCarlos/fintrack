//another version of Title Header comnponent
export function TitleHeader2({ children }: any) {
  return <div className='title__header__container'>{children}</div>;
}

export default TitleHeader2;

//-----------TitleHeader--------C verify
import { useLocation, useNavigate } from 'react-router-dom';
import LeftArrowDarkSvg from '../../../assets/LeftArrowSvg.svg';

export function TitleHeader() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  const previousRoute = location.pathname.split('/')[0] ?? '/';

  return (
    <div className='title__header__container'>
      <div
        className='iconArrowLeftDark'
        onClick={() => navigateTo(previousRoute)}
      >
        <LeftArrowDarkSvg />
      </div>

      <div className='title__header'>{currentRoute}</div>
    </div>
  );
}

//----------------
//-------BigBoxResult---------
type BigBoxResultPropType = {
  children: any;
};

export function BigBoxResult({ children }: BigBoxResultPropType) {
  return <div className='bigBox__container'>{children}</div>;
}

//------------------

export function DisplayMainScreen({
children
}: any) {
  return (
    <div className='displayScreen'>
     {children}
      </div>
  );
}

//--------------------------C
export function Presentation({ children }: any) {
  return (
    <article className='content__presentation'>
      <div className='cards__presentation'>{children}</div>
    </article>
  );
}

//-----Summary---------------C
export function DebtsCardTitle({ children }: any) {
  return <div className='presentation__card--title'>{children} </div>;
}

//-----BoxContainer -----------C
export function BoxContainer({ children }: any) {
  return <div className='box__container .row-flx-sb'>{children}</div>;
}

export function BoxRow({ children }: any) {
  return <div className='box__row row-flx-sb'>{children}</div>;
}

export function StatusSquare({ children }: any) {
  return <span className='status__square'>{children}</span>;
}


//-------Add / Edit Button-----------C

export function OpenAddEditBtn({ children }: any) {
  function onClickHandler() {
    console.log('Add new or Edit a Category');
  }
  return (
    <button
      className='line__container flx-row-jc add__edit__btn'
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}




