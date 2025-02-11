// Importar React y el componente Select de react-select

import Select, { components } from 'react-select';
import { useEffect, useRef } from 'react';
import ArrowDownDarkSvg from '../../assets/ArrowDownDarkSvg.svg';
import ArrowDownLightSvg from '../../assets/ArrowDownLightSvg.svg';

// set the style options for tracker and form variant, and DropDownSelection component
//TRACKER DropDownSelection custom styles
const customStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    boxShadow: 'none',
    width: '100%',
    border: 'none',
    borderRadius: '0.75rem',
  }),

  control: (baseStyles: any) => ({
    ...baseStyles,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#e8e4da', //variant:tracker
    color: 'var(--dark)', //variant:tracker
    margin: '0',
    padding: '0',
    borderRadius: '0.75rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    cursor: 'pointer',
    // border:'1px solid red',
    // '&:hover': {
    //   border: 'none',
    // },
  }),

  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--dark)', //variant:tracker
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    zIndex: 9999,
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#e8e4da' : 'white',//variant:tracker
    color: 'var(--dark)',//variant:tracker
    ':active': { backgroundColor: '#e8e4da' },
    ':hover': { backgroundColor: 'rgba(232, 228, 218 , 0.4)' },
  }),
};

//FORM DropDownSelection custom styles
const formCustomStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    boxShadow: 'none',
    //variant:form
    border: '1px solid var(--creme)',
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
    backgroundColor: 'transparent', //variant:form
    color: 'var(--light, yellow)', //variant:form
    margin: '0',
    padding: '0',
    borderRadius: '0.75rem',
    textTransform: 'capitalize',
    fontSize: '0.875rem',
    cursor: 'pointer',
    // '&:hover': {
    //   border: 'none',
    // },
  }),

  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: 'var(--creme)', //variant: form
  }),

  menu: (baseStyles: any) => ({
    ...baseStyles,
    //variant: form
    backgroundColor: 'var(--dark)',
    color: 'var(--light)',
    width: '105%',
    margin: '0.5rem 0 0 -0.5rem',
    zIndex: 9999,
  }),

  option: (
    provided: any,
    state: any //check any
  ) =>
    //variant: form
    ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--dark1,rgba(51, 48, 48, 1) )'
        : 'transparent',
      color: 'var(--creme)',
      borderRadius: '1rem',
      padding: '0.5rem',
      ':active': { backgroundColor: '#e8e4da' },
      ':hover': { backgroundColor: 'hsla(0, 3.00%, 19.40%, 0.50)' },
    }),

  //variant: form
  singleValue: (style: any) => ({ ...style, color: 'var(--creme)' }),
};

//-------internal selection components------
const DropdownIndicator = (props: any) => {
  //check any
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
      value: any; //check any
      label: string;
    } | null
  ) => void;

  isReset: boolean;
  setIsReset: any; //check any
  optionKeySelected?: any; //is it needed? check any
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
  // console.log(menuPlacementPosition[variant])
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (isReset && selectRef) {
      selectRef.current.clearValue();
      //check wether this reset affects others like datepicker or any other select component present
      // setIsReset(false);
    }
  }, [isReset]);

  const selectedCustomStyles =
    variant === 'tracker'
      ? variantCustomStyles.tracker
      : variantCustomStyles.form;

  const menuPlacementPosition = variant === 'tracker' ? 'top' : 'bottom';
  // console.log(title, options)
  // Function to handle the change on selected option state
  const handleChange = (
    // selectedOption: { value: any; label: string } | null
    selectedOption: any //check any
  ) => {
    updateOptionHandler(selectedOption);
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
        isSearchable={false}
        isClearable
        defaultValue={title ? title : options[0]}
        ref={selectRef}
        menuPlacement={menuPlacementPosition}
        {
          //is the way to pass custom props to internal selecProps
          ...{ variant }
        }
      />
    </>
  );
}

export default DropDownSelection;
