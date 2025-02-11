// Importa React y el componente Select de react-select

import Select, { components } from 'react-select';
import { useRef, useEffect } from 'react';
import ArrowDownDarkSvg from '../../../assets/ArrowDownDarkSvg.svg';
// set the style options for select element. Define las opciones para el select

const customStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    boxShadow: 'none',
    width: '100%',
    border: 'none',
    borderRadius: '0.75rem',
    // border: '1px solid var(--creme)',
    // backgroundColor: 'var(--creme)',
    // borderRadius: '1rem',
    // height: '2.625rem',
    // padding: '0 0.25rem',
    // margin: '0',
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
    //check any
    ...provided,
    backgroundColor: state.isSelected ? '#e8e4da' : 'white',
    color: 'var(--dark)',
    ':active': { backgroundColor: '#e8e4da' },
    ':hover': { backgroundColor: 'rgba(232, 228, 218 , 0.4)' },
  }),
};

const DropdownIndicator = (props: any) => {
  //check any
  return (
    <components.DropdownIndicator
      {...props}
      className='custom-dropdown-indicator'
    >
      <ArrowDownDarkSvg />
    </components.DropdownIndicator>
  );
};
// export type SelectComponentPropType = {
//   options: {
//     value: any;
//     label: string;
//   }[];
// };
// Define el componente
function SelectComponent({
  dropDownOptions,
  setSelectState,

  isReset,
  setIsReset,
  optionKeySelected,
}: any) {
  //check any
  const { title, options } = dropDownOptions;

  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (isReset && selectRef) {
      selectRef.current.clearValue();
      //check wether this reset affects others like datepicker
      setIsReset(false); //verify this behavior
    }
  }, [isReset]);
  // console.log(title, options)

  // Función para manejar el cambio en el select
  const handleChange = (
    selectedOption: { value: any; label: string } | null //check any
  ) => {
    // console.log('tests:', optionKeySelected);

    setSelectState((prev: any) => ({
      //check any
      ...prev,
      [optionKeySelected]: selectedOption?.value,
    }));

    // console.log('Opción seleccionada:', selectedOption);
  };

  return (
    <>
      <Select
        options={options}
        onChange={handleChange}
        placeholder={title}
        styles={customStyles}
        closeMenuOnSelect={true}
        components={{ DropdownIndicator }}
        isSearchable={false}
        isClearable
        defaultValue={title ? title : options[0]}
        ref={selectRef}
        menuPlacement='top'

        // Asigna el valor actual del select
        // value={dropDownOptions.options.find(
        //   (option: { value: string }) => option.value === optionKeySelected.value
        // ) || null}
      />
    </>
  );
}

export default SelectComponent;
