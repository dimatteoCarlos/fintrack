//-----------TitleHeader--------C verify
import { useLocation, useNavigate } from 'react-router-dom';
import LeftArrowDarkSvg from '../../../assets/LeftArrowSvg.svg';

//------TitleHeader--------C take it from Budget Comp
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

//-------BigBoxResult---------
type BigBoxResultPropType = {
  children: any;
};

export function BigBoxResult({ children }: BigBoxResultPropType) {
  return <div className='bigBox__container'>{children}</div>;
}

//------------------
// not used yet in overview
export function DisplayMainScreen({ children }: any) {
  return <div className='displayScreen'>{children}</div>;
}

//----------------
//bigBoxScreenRow

//--------------------------NC 'cause different paddings
export function Presentation({ children }: any) {
  return (
    <section className='content__presentation'>
      <div className='cards__presentation'>{children}</div>
    </section>
  );
}

//-----Summary---------------C
export function CardTitle({ children }: any) {
  return <div className='presentation__card--title'>{children} </div>;
}

//-----BoxContainer -----------C
// export function BoxContainer({ children }: any) {
//   return <div className='box__container .flx-row-sb'>{children}</div>;
// }

export function BoxRow({ children }: any) {
  return <div className='box__row flx-row-sb'>{children}</div>;
}

export function StatusSquare({ children }: any) {
  return (
    <>
      <span className='status__square'></span>
      {children}
    </>
  );
}

//-------Add / Edit Button-----------C

export function Button({ children }: any) {
  function onClickHandler() {
    console.log('Add new or Edit button w/o container');
  }
  return (
    <button
      // className='line__container flx-row-jc add__edit__btn'
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export function OpenAddEditBtn({ children }: any) {
  return (
    <div className='line__container flx-row-jc add__edit__btn'>
      <Button>{children}</Button>
    </div>
  );
}
