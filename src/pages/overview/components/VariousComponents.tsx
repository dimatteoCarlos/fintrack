type ChildrenPropType = { children: React.ReactNode };

//temporary values------------
const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
const defaultCurrency = 'usd';
const formatNumberCountry = currencyOptions[defaultCurrency];



//-----BoxContainer -----------C
export function BoxContainer({ children }: ChildrenPropType) {
  return <div className='box__container .flx-row-sb'>{children}</div>;
}

//-----BoxRow -----------C
export function BoxRow({ children }: ChildrenPropType) {
  return <div className='box__row flx-row-sb'>{children}</div>;
}

export function StatusSquare() {
  return (
    <>
      <span className='status__square'></span>
    </>
  );
}

//-------Add / Edit Button-----------C
export function Button({ children }: ChildrenPropType) {
  function onClickHandler() {
    console.log('A button was clicked');
  }
  return <button onClick={onClickHandler}>{children}</button>;
}

//---------------------------------------------
export function OpenAddEditBtn({ children }: ChildrenPropType) {
  function onClickHandler() {
    console.log('A button was clicked');
  }
  return (
    <div className='line__container flx-row-jc add__edit__btn'>
      <button onClick={onClickHandler}>{children}</button>
    </div>
  );
}
//--------------------------------------------------------
export function SeeMore({ children }: ChildrenPropType) {
  function onClickHandler() {
    console.log('A button was clicked');
  }

  return (
    <div className='see_more'>
      <button onClick={onClickHandler}>{children}</button>
    </div>
  );
}
