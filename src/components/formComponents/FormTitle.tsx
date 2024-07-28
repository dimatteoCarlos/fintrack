import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import './formComponentStyles/formComponentStyles.css';

type FormtTitleTypeProp = {
  formTitle: string;
};

function FormTitle({ formTitle }: FormtTitleTypeProp) {
  return (
    <div className='account__main__title--container'>
      <div className='iconLeftArrow'>
        <LeftArrowSvg />
      </div>

      <div className='form__title'>{formTitle}</div>
    </div>
  );
}

export default FormTitle;
