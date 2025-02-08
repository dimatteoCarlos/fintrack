import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge';
import LabelNumberValidation from '../../../general_components/labelNumberValidation/LabelNumberValidation';
import { capitalize } from '../../../helpers/functions';
import { CurrencyType } from '../../../types/types';
import SelectComponent from './SelectComponent';

type TopCardPropType = {
  topCardElements: {
    titles: { title1: string; title2: string };
    value: string;

    selectOptions: {
      title: string;

      options: {
        value: string;
        label: string;
      }[];
    };
  };

  validationMessages: { [key: string]: string };

  updateTrackerData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  trackerName: string;

  updateCurrency: (x: CurrencyType) => void;
  currency: CurrencyType;
  selectedValue: string;
  setSelectState: React.Dispatch<React.SetStateAction<any>>; //check this later
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopCard = ({
  topCardElements,
  validationMessages,
  updateTrackerData,
  trackerName,
  updateCurrency,
  currency,

  setSelectState,
  selectedValue,

  isReset,
  setIsReset,
}: TopCardPropType): JSX.Element => {
  const {
    titles: { title1 },
    titles: { title2 },
    value,
    selectOptions: topCardOptions,
  } = topCardElements;

  return (
    <>
      <div className='state__card--top  '>
        <LabelNumberValidation
          formDataNumber={{ keyName: title1, title: title1 }}
          validationMessages={validationMessages}
          variant='tracker'
        />

        <div className='card__screen'>
          {/* make the input number a component? */}
          <input
            className='inputNumber'
            name={title1}
            type='text'
            placeholder={trackerName}
            value={value} //amountValue
            onChange={updateTrackerData} //onAmountChange
          />

          <CurrencyBadge
            variant={'tracker'}
            updateOutsideCurrencyData={updateCurrency}
            currency={currency}
          />
        </div>

        <div className='card--title'>
          {capitalize(title2)}
          <span className='validation__errMsg'>
            {' '}
            {validationMessages[title2]}
          </span>
        </div>

        <SelectComponent
          dropDownOptions={topCardOptions}
          isReset={isReset}
          setIsReset={setIsReset}
          optionKeySelected={title2}
          setSelectState={setSelectState} //setSelectedAccount
          selectedValue={selectedValue} //selectedAccount
        />
      </div>
    </>
  );
};

export default TopCard;
