//amount input
//screen__container

export function CardStatePresentation({ children }: any) {
  return (
    <div className='content__presentation'>
      <div className='state__cards'>{children}</div>
    </div>
  );
}

export function CardStateTop({ children }: any) {
  return (
    <>
      <div className='state__card--top'> {children}</div>
    </>
  );
}

export function CardTitle({ children }: any) {
  return <div className='card--title'> {children}</div>;
}

export function AmountInputScreen({ children }: any) {
  return (
    <>
      <div className='card__screen'>{children}</div>
    </>
  );
}

export function CardSeparator() {
  return (
    <div className='stack__sep'>
      <span className='circleL'></span>
      <span className='bar'></span>
      <span className='circleR'></span>
    </div>
  );
}

export function CardNote() {
  return (
    <div className='card__note'>
      <div className='card__screen'>
        <div className='screen--concept'>{'Description'}</div>
      </div>
      <div className='tracker__icon'></div>
    </div>
  );
}

//---------------------
export function CardTypeAndDateContainer({ children }: any) {
  return <div className='card__typeDate__container'>{children}</div>;
}

//---
export function CardType({ children }: any) {
  return <div className='card__typeDate--type'>{children}</div>;
}

export function CardTypeScreen({ children }: any) {
  return <div className='card__screen--type'>{children}</div>;
}

//---
export function CardDate({ children }: any) {
  return <div className='card__typeDate--date'>{children}</div>;
}

export function CardDateScreen({ children }: any) {
  return <div className='card__screen--date'>{children}</div>;
}







