//--------------------------
//applied styles : generalStyles.css
type ChildrenPropType = { children: React.ReactNode };

//-----BoxContainer ---------------------
export function BoxContainer({ children }: ChildrenPropType) {
  return <div className='box__container .flx-row-sb'>{children}</div>;
}

//-----BoxRow ---------------------
export function BoxRow({ children }: ChildrenPropType) {
  return <div className='box__row flx-row-sb'>{children}</div>;
}

//-----StatusSquare ---------------------
export function StatusSquare({ children }: any) {
  return <span className='status__square'>{children}</span>;
}
