// Importa React y el componente Select de react-select

import Select, { GroupBase, StylesConfig } from 'react-select';

// Define las opciones para el select
const options = [
  { value: 'available_account', label: 'Available Account' },
  { value: 'account_02', label: 'Account_02' },
  { value: 'account_03', label: 'Account_03' },
];

type BaseStylesType={
  baseStyles:StylesConfig<{
    value: string;
    label: string;
}, false, GroupBase<{
    value: string;
    label: string;
}>> | undefined | any;
  // baseStyles:StylesConfig<{ value: string; label: string; }, false, GroupBase<{ value: string; label: string; }>> | undefined;
}

const customStyles = {
  container: ({baseStyles}:BaseStylesType) => ({
    ...baseStyles,
    width: '100%',
    backgroundColor: '#e8e4da',
    borderRadius: '50%',
    border: 'none',
  }),

  control: ({baseStyles}:BaseStylesType) => ({
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

  placeholder: ({baseStyles}:BaseStylesType) => ({
    ...baseStyles,
    color: '#141414',
  }),

  menu: ({baseStyles}:BaseStylesType) => ({
    ...baseStyles,
    zIndex: 9999,
  }),
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
      />
    </>
  );
};

export default MySelectComponent;
