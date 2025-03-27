import Select, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  StylesConfig,
  SelectInstance,
  SingleValue,
  MultiValue,
} from 'react-select';
import { useEffect, useRef } from 'react';
import ArrowDownDarkSvg from '../../assets/ArrowDownDarkSvg.svg';
import ArrowDownLightSvg from '../../assets/ArrowDownLightSvg.svg';
import { VariantType } from '../../types/types';

export type DropdownOption = { value: string; label: string };

export interface DropdownSelectPropType {
  dropDownOptions: {
    title: string;
    options: DropdownOption[];
    variant: VariantType;
  };
  updateOptionHandler: (selectedOption: DropdownOption | null) => void;
  setIsReset: (value: boolean) => void;
  isReset: boolean;
}

// 1.  `create a DropdownIndicator function that returns DropdownIndicator as component
const createDropdownIndicator =
  (variant: VariantType) =>
  (
    props: DropdownIndicatorProps<
      DropdownOption,
      false,
      GroupBase<DropdownOption>
    >
  ) =>
    (
      <components.DropdownIndicator {...props}>
        {variant === 'tracker' ? <ArrowDownDarkSvg /> : <ArrowDownLightSvg />}
      </components.DropdownIndicator>
    );

// ✅ 2. Styles function based on `variant`
const createStyles = (
  variant: VariantType
): StylesConfig<DropdownOption, false, GroupBase<DropdownOption>> => ({
  control: (base) => ({
    ...base,
    backgroundColor: variant === 'tracker' ? '#e8e4da' : 'var(--dark)',
    color: variant === 'tracker' ? 'var(--dark)' : 'var(--light)',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    textTransform: 'capitalize' as const,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: variant === 'tracker' ? 'white' : 'var(--dark)',
    color: variant === 'tracker' ? 'var(--dark)' : 'var(--light)',
  }),
  singleValue: (base) => ({
    ...base,
    color: variant === 'tracker' ? 'var(--dark)' : 'var(--creme)',
  }),
});

// ✅ 3. Main component
function DropDownSelection({
  dropDownOptions,
  updateOptionHandler,
  isReset,
  setIsReset,
}: DropdownSelectPropType) {
  const { title, options, variant } = dropDownOptions;
  const selectRef =
    useRef<SelectInstance<DropdownOption, false, GroupBase<DropdownOption>>>(
      null
    );

  useEffect(() => {
    if (isReset && selectRef.current) {
      selectRef.current.clearValue();
      setIsReset(false);
    }
  }, [isReset, setIsReset]);

  const handleChange = (
    newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>
  ) => {
    updateOptionHandler(newValue as SingleValue<DropdownOption>);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder={title}
      styles={createStyles(variant)}
      closeMenuOnSelect
      isSearchable={false}
      isClearable
      defaultValue={options.find((opt) => opt.label === title) || options[0]}
      ref={selectRef}
      menuPlacement={variant === 'tracker' ? 'top' : 'bottom'}
      components={{
        DropdownIndicator: createDropdownIndicator(variant), // passing variant without select props`
      }}
    />
  );
}

export default DropDownSelection;
