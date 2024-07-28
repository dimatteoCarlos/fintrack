import React from 'react';

type FormInputBulletTypeProp = {
  labelText: string | JSX.Element | number;
  content: string | JSX.Element | number;
  inputHandler: () => void;
  classContent: string;
};

function FormInputBullet({
  labelText,
  content,
  inputHandler,
  classContent,
}: FormInputBulletTypeProp) {
  return (
    <>
      <div className='input--bullet'>
        <label className='label form__title'>{labelText}</label>

        <input
          type='text'
          className={`bullet bullet--input ${classContent}`}
          placeholder={`${content}`}
          onChange={inputHandler}
        />
      </div>
    </>
  );
}

export default FormInputBullet;
