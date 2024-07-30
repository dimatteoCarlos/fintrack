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





export  function InputSelection() {
  return (
    <div style={{color:'red'}}>
      Input Selection
    </div>
  )
}
//********************* */

