//-------Add / Edit Button-----------C

import { ReactNode } from 'react';

type ChildrenPropType = { children: ReactNode };
function OpenAddEditBtn({ children }: ChildrenPropType) {
  function onClickHandler() {
    console.log(
      'Add new or Edit Item (category, pocket, debtor, account, ecc.)'
    );
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

export default OpenAddEditBtn;
