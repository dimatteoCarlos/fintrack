import React from 'react';
import ArrowDownSvg from '../../assets/ArrowDownSvg.svg';
import './formComponentStyles/formComponentStyles.css';

//Selection option without library

type FormSelectionBulletTypeProp = {
  labelText: string | JSX.Element | number;
  content: string | JSX.Element | number;
  inputHandler?: () => void;
  options: { option: string }[];
};

function FormSelectionBullet({
  labelText,
  content,
  inputHandler,
  options,
  
}: FormSelectionBulletTypeProp) {
  return (
    <>
      <div className='card__bullet__container'>
        <label className='label form__title'>{labelText}</label>

        <div className='selection__container bullet--input '>
          <div className='textContent'>{`${content}`}</div>

          <select className={`select`}>
            <option value='Select'></option>
            {/* <option value='Select'>{content}</option> */}

            {options.map((op, _) => (
              <option key={`${_}-${op}`} value={op.option}>
                {op.option}
              </option>
            ))}
          </select>
          <span className='iconArrowDown'>
            <ArrowDownSvg />
          </span>
        </div>
      </div>
    </>
  );
}

export default FormSelectionBullet;
