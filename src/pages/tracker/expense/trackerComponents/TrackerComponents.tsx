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



// export function InputNumber() {
//   return (
//     <>
//       <input
//         max={99999999999999}
//         maxLength={15}
//         className='inputNumber '
//         type='number'
//         placeholder={'0,000.00'}
//         value={''}
//       />
//     </>
//   );
// }
