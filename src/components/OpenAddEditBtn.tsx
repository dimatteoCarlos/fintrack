//-------Add / Edit Button-----------C

import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type OpenAddEditBtnPropType = {
  children: ReactNode;
  btnFunction: (btnFunctionArg: string) => void;
  btnFunctionArg: string;
  btnPreviousRoute?: string;
};

function OpenAddEditBtn({
  children,
  btnFunction,
  btnFunctionArg,
  btnPreviousRoute,
}: OpenAddEditBtnPropType): JSX.Element {
  function onClickHandler() {
    btnFunction(btnFunctionArg);
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
