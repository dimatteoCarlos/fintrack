import { useLocation, useNavigate } from 'react-router-dom';
import LeftArrowDarkSvg from '../../../assets/LeftArrowSvg.svg';

export function TitleHeader() {
  const location = useLocation();
  const previousRoute = location.pathname.split('/')[0]?? '/';
  const currentRoute = location.pathname.split('/')[1] 
  const navigateTo = useNavigate();

  return (
    <div className='title__header__container'>
      <div
        className='iconArrowLeftDark'
        // onClick={()=>navigateTo(-1)}
        onClick={() => navigateTo(previousRoute)}
      >
        <LeftArrowDarkSvg />
      </div>

      <div className='title__header'>{currentRoute}</div>
    </div>
  );
}

//----------------
type BigBoxResultPropType = {
  children: any;
};

export function BigBoxResult({ children }: BigBoxResultPropType) {
  return <div className='total__container'>{children}</div>;
}

//------------------
export function BudgetPresentation({ children }: any) {
  return (
    <div className='content__presentation--budget'>
      <div className='cards__presentation--budget'>{children}</div>
    </div>
  );
}

//-----Category List--------//
export function BudgetCardTitle({ children }: any) {
  return <div className='card__budget--title'>{children} </div>;
}

//----------------

export function StatusBoxContainer({ children }: any) {
  return <div className='box__container .row-flx-sb'>{children}</div>;
}

export function BoxRow({ children }: any) {
  return <div className='box__row row-flx-sb'>{children}</div>;
}
//---------------------

export function StatusSquare({ children }: any) {
  return <span className='status__square'>{children}</span>;
}

export function SpentBudget({ children }: any) {
  return <div className='spent__budget'>{children}</div>;
}
//-------Add / Edit Button-----------

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

//-----CardTilePocket----------
export function CardTilePocket({ children }: any) {
  return (
    <>
      <div className='card__tile__pocket line__container'>{children}</div>
    </>
  );
}

export function PocketLeftTile({ children }: any) {
  return (
    <>
      <div className='tile__left'>{children}</div>
    </>
  );
}

export function PocketRightTile({ children }: any) {
  return (
    <>
      <div className='tile__right'>{children}</div>
    </>
  );
}

//------------------
// export function BudgetPresentation({ children }: any) {
//   return (
//     <div className='content__presentation--budget'>
//       <div className='cards__presentation--budget'>{children}

//       </div>
//     </div>
//   );
// }
