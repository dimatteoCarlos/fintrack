//--------------------------C
type ChildrenPropType = { children: React.ReactNode };

//-----BoxContainer ---------------------C
export function BoxContainer({ children }: ChildrenPropType) {
  return <div className='box__container .flx-row-sb'>{children}</div>;
}

export function BoxRow({ children }: ChildrenPropType) {
  return <div className='box__row flx-row-sb'>{children}</div>;
}

export function StatusSquare({ children }: any) {
  return <span className='status__square'>{children}</span>;
}
