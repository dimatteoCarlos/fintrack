import { changeCurrency } from '../../helpers/functions';
import './styles/currency-style.css';
import { CurrencyType } from '../../types/types';

type CurrencyBadgePropType = {
  variant: string;
  updateOutsideCurrencyData?: (currency: CurrencyType) => void;
  currency: CurrencyType;
  setCurrency?: React.Dispatch<React.SetStateAction<CurrencyType>>;
};
function CurrencyBadge({
  variant,
  updateOutsideCurrencyData,
  currency,
}: CurrencyBadgePropType) {
  //----functions------------
  function toggleCurrency() {
    const newCurrency = changeCurrency(currency);
    updateOutsideCurrencyData!(newCurrency);
    console.log('🚀 ~ toggleCurrency ~ newCurrency:', newCurrency);
  }

  return (
    <div className={`icon-currency ${variant}`} onClick={toggleCurrency}>
      {currency.toUpperCase()}
    </div>
  );
}

export default CurrencyBadge;
