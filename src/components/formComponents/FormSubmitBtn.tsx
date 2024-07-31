
import './formComponentStyles/formComponentStyles.css'
type FormSubmitBtnPropType = {
  btnTitle: string;
  
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function FormSubmitBtn({ btnTitle, onClickHandler }: FormSubmitBtnPropType) {
  return (
    <div className='btn__container'>
      <button
        type='submit'
        className='submit__btn'
        onClick={onClickHandler}
        id={btnTitle}
      >
        {`${btnTitle}`}
      </button>
    </div>
  );
}

export default FormSubmitBtn;
