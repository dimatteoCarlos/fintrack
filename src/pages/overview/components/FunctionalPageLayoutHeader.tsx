import { ReactNode } from 'react';
type ChildrenPropType = { children: ReactNode };


export function FunctionalPageLayoutHeader({ children }: ChildrenPropType) {
  return (
    <div className='layout__header'>
      <div className='headerContent__container'>{children}</div>
    </div>
  );
}
export default FunctionalPageLayoutHeader;
