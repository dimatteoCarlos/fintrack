import { ReactNode } from 'react';
import './formSubmitBtn-style'
type FormSubmitBtnPropType = {
  // btnTitle?: string;
  children: ReactNode;

  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function FormSubmitBtn({
  // btnTitle,
  onClickHandler,
  children,
}: FormSubmitBtnPropType) {
  return (
    <div className='btn__container'>
      <button
        type='submit'
        className='submit__btn'
        onClick={onClickHandler}
        // id={btnTitle}
      >
        {/* {`${btnTitle}`} */}
        {children}
      </button>
    </div>
  );
}

export default FormSubmitBtn;
