// /------Form Title--------

import { Link, useLocation } from 'react-router-dom';

import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import './formComponentStyles/formComponentStyles.css';

type FormtTitleTypeProp = {
  formTitle: string;
};

function FormTitle({ formTitle }: FormtTitleTypeProp) {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  return (
    <div className='main__title--container'>
      <Link to={'..'} relative='path' className='iconLeftArrow'>
        <LeftArrowSvg />
      </Link>

      <div className='form__title'>{formTitle}{currentRoute}</div>
    </div>
  );
}

export default FormTitle;

