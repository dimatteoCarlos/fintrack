import { ReactNode } from 'react';
import './styles/formSubmitBtn-style.css'
type FormSubmitBtnPropType = {
  children: ReactNode;

  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function FormSubmitBtn({
  onClickHandler,
  children,
}: FormSubmitBtnPropType) {
  return (
    <div className='btn__container'
    style={{marginTop:'1rem'}}>
      <button
        type='submit'
        className='submit__btn'
        onClick={onClickHandler}
      >
        {children}
      </button>
    </div>
  );
}

export default FormSubmitBtn;
