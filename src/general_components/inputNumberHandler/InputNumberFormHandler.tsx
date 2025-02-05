import useInputNumberHandler from '../../hooks/useInputNumberHandler';
import { FormNumberInputType } from '../../types/types';

type InputNumberFormHandlerPropType<T> = {
  // title: string;
  validationMessages: {
    [key: string]: string;
  };
  setValidationMessages: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  keyName: string;
  placeholderText: string;

  formData: FormNumberInputType;
  setFormData: React.Dispatch<React.SetStateAction<FormNumberInputType>>;

  setStateData: React.Dispatch<React.SetStateAction<T>>;
  // stateData: T;
  // name: string;
  // value: string;
};

//------
function InputNumberFormHandler({
  // title,
  // validationMessages,
  setValidationMessages,
  keyName,
  placeholderText,
  formData,
  setFormData,
  setStateData,
}: InputNumberFormHandlerPropType<any>) {
  //check any

  const { inputNumberHandlerFn } = useInputNumberHandler(
    setFormData,
    setValidationMessages,
    setStateData
  );

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    inputNumberHandlerFn(name, value);
    // if (name === 'amount') {
    //   inputNumberHandlerFn(name, value);
    // } else {
    //   setStateData((prev) => ({ ...prev, [name]: value }));
    // }
  }
  return (
    <>
      {/* <label htmlFor={keyName} className='label form__title'>
        {title}&nbsp;
        <span
          className='validation__errMsg'
          style={{
            color: validationMessages[keyName]
              ?.toLowerCase()
              .includes('format:')
              ? 'var(--lightSuccess)'
              : 'var(--error)',
          }}
        >
          {validationMessages[keyName]?.replace('Format:', '')}
        </span>
      </label> */}

      <input
        className={'input__container'}
        type='text'
        name={keyName}
        placeholder={placeholderText}
        value={formData[keyName]}
        onChange={inputHandler}
      />
    </>
  );
}

export default InputNumberFormHandler;
