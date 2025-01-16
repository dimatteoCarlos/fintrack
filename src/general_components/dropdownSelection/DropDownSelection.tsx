// Importar React y el componente Select de react-select

import Select, { components } from 'react-select';
import { useEffect, useRef, useState } from 'react';
import ArrowDownDarkSvg from '../../assets/ArrowDownDarkSvg.svg';
import ArrowDownLightSvg from '../../assets/ArrowDownLightSvg.svg';

// styles and components of DropDownSelection

//TRACKER DropDownSelection custom styles
const customStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    width: '100%',
    border: 'none',
    borderRadius: '0.75rem',
  }),

  control: (baseStyles: any) => ({
    ...baseStyles,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#e8e4da',
    borderRadius: '0.75rem',
    color: 'var(--creme)',
    fontWeight: '500',
    fontSize: '0.875rem',
    // border:'1px solid red',

    // '&:hover': {
    //   border: 'none',
    // },
  }),

  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: '#141414',
    // border:'1px solid red',
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    zIndex: 9999,
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#e8e4da' : 'white',
    color: '#141414',
    ':active': { backgroundColor: '#e8e4da' },
    ':hover': { backgroundColor: 'rgba(232, 228, 218 , 0.4)' },
  }),
};

//FORM DropDownSelection custom styles
const formCustomStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    border: '1px solid var(--creme)',
    boxShadow: 'none',
    backgroundColor: 'var(--dark)',
    borderRadius: '1rem',
    height: '2.625rem',
    padding: '0 0.25rem',
    margin: '0',

    // width: '100%',
    // border: 'none',
  }),

  control: (baseStyles: any) => ({
    ...baseStyles,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    margin: '0',
    padding: '0',
    color: 'var(--light, yellow)',
    textTransform: 'capitalize',
    fontSize: '0.875rem',
    cursor: 'pointer',
    // '&:hover': {
    //   border: 'none',
    // },
  }),

  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--creme)',
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: 'var(--dark)',
    color: 'var(--light)',
    width: '105%',
    margin: '0.5rem 0 0 -0.5rem',
    zIndex: 9999,
  }),

  option: (provided: any, state: any) => ({
    ...provided,

    backgroundColor: state.isSelected
      ? 'var(--dark1,rgba(51, 48, 48, 1) )'
      : 'transparent',

    borderRadius: '1rem',
    padding: '0.5rem',
    color: 'var(--creme)',

    ':active': { backgroundColor: '#e8e4da' },
    ':hover': { backgroundColor: 'rgba(51, 48, 48, 0.5)' },
  }),

  singleValue: (style: any) => ({ ...style, color: 'var(--creme)' }),
};

//-------internal selection components------
const DropdownIndicator = (props: any) => {
  // console.log(variant);
  const { variant } = props.selectProps;

  return (
    <components.DropdownIndicator
      {...props}
      className='custom-dropdown-indicator'
    >
      {variant === 'tracker' ? <ArrowDownDarkSvg /> : <ArrowDownLightSvg />}
    </components.DropdownIndicator>
  );
};

//----------------------------------
export type DropdownSelectPropType = {
  dropDownOptions: {
    title: string;
    options: {
      value: string;
      label: string;
    }[];
    variant: string;
  };

  updateOptionHandler: (
    selectedOption: {
      value: any;
      label: string;
    } | null
    // optionKeySelected: any
  ) => void;

  isReset?: boolean;
  setIsReset?: any; //fix later
  optionKeySelected?: any;
};

const variantCustomStyles = {
  tracker: customStyles,
  form: formCustomStyles,
};

//---------------------------------------
// Define the component
function DropDownSelection({
  dropDownOptions,
  updateOptionHandler,
  isReset,
}: // optionKeySelected,
DropdownSelectPropType) {
  const { title, options, variant } = dropDownOptions;

  const selectRef = useRef<any>(null);
  useEffect(() => {
    if (isReset && selectRef) {
      selectRef.current.clearValue();
      // setIsReset(false);
      //check wether this reset affects others like datepicker
    }
  }, [isReset]);

  const selectedCustomStyles =
    variant === 'tracker'
      ? variantCustomStyles.tracker
      : variantCustomStyles.form;

  // console.log(title, options)

  // Function to handle the change on selected option state
  const handleChange = (
    // selectedOption: { value: any; label: string } | null
    selectedOption: any
  ) => {
    updateOptionHandler(
      selectedOption
      // , optionKeySelected
    );
    console.log('Opción seleccionada: desde DropDownSelection', selectedOption);
  };

  return (
    <>
      <Select
        options={options}
        onChange={handleChange}
        placeholder={title}
        styles={selectedCustomStyles}
        closeMenuOnSelect={true}
        components={{ DropdownIndicator }}
        isSearchable
        isClearable
        defaultValue={title ? title : options[0]}
        ref={selectRef}
        {
          ...{ variant } //is the way to pass custom props to internal selecProps
        }
      />
    </>
  );
}

export default DropDownSelection;
