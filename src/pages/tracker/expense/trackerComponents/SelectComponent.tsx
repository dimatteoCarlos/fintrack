// Importa React y el componente Select de react-select

import Select, { components } from 'react-select';
import ArrowDownDarkSvg from './ArrowDownDarkSvg.svg';
import './selectComponent.css';

// Define las opciones para el select
const options = [
  { value: 'account_01', label: 'Account_01' },
  { value: 'account_02', label: 'Account_02' },
  { value: 'account_03', label: 'Account_03' },
];

const customStyles = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: '100%',
    backgroundColor: '#e8e4da',
    borderRadius: '0.75rem',
    border: 'none',
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#e8e4da',
    borderRadius: '0.75rem',
    color: '#141414',
    fontWeight: '500',
    fontSize: '0.875rem',

    '&:hover': {
      border: 'none',
    },
  }),

  placeholder: (baseStyle) => ({
    ...baseStyle,
    color: '#141414',
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),

  option: (provided, state) => ({
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

// Define el componente
const MySelectComponent = () => {
  // Función para manejar el cambio en el select
  const handleChange = ({ selectedOption }: any) => {
    console.log('Opción seleccionada:', selectedOption);
  };

  return (
    <>
      <div className='card--title'>Account</div>
      <Select
        options={options}
        onChange={handleChange}
        placeholder='Available Account'
        styles={customStyles}
        closeMenuOnSelect={true}
        components={{ DropdownIndicator }}
      />
    </>
  );
};

export default MySelectComponent;
