// Importa React y el componente Select de react-select

import Select, { components } from 'react-select';
import ArrowDownDarkSvg from './ArrowDownDarkSvg.svg';

// Define las opciones para el select
// const options1 = [
//   { value: 'account_01', label: 'Account_01' },
//   { value: 'account_02', label: 'Account_02' },
//   { value: 'account_03', label: 'Account_03' },
// ];

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
    color: '#141414',
    fontWeight: '500',
    fontSize: '0.875rem',

    // '&:hover': {
    //   border: 'none',
    // },
  }),

  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: '#141414',
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

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator
      {...props}
      className='custom-dropdown-indicator'
    >
      <ArrowDownDarkSvg />
    </components.DropdownIndicator>
  );
};

export type SelectComponentPropType = {
  options: {
    value: any;
    label: string;
  }[];
};

// Define el componente
function SelectComponent({dropDownOptions}:any) {
const {title, options} = dropDownOptions;
  console.log(title, options)
  // Función para manejar el cambio en el select
  const handleChange = (
    selectedOption: { value: any; label: string } | null
  ) => {
    console.log('Opción seleccionada:', selectedOption);
  };

  return (
    <>
      {/* <div className='card--title'>Account</div> */}
      <Select
        options={options}
        onChange={handleChange}
        placeholder={title}
        styles={customStyles}
        closeMenuOnSelect={true}
        components={{ DropdownIndicator }}
        isSearchable
      />
    </>
  );
}

export default SelectComponent;
