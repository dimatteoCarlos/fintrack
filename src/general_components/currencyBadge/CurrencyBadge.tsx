import { useState } from 'react';
import { changeCurrency } from '../../helpers/functions';
import './styles/currency-style.css'
import { CurrencyType } from '../../types/types';

type CurrencyBadgePropType = {
  variant: string;
  updateOutsideCurrencyData?: (currency: CurrencyType) => void;
};
function CurrencyBadge({
  variant,
  updateOutsideCurrencyData,
}: CurrencyBadgePropType) {
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';

  //----functions------------
  function toggleCurrency() {
    const newCurrency = changeCurrency(currency);
    setCurrency(newCurrency);
    updateOutsideCurrencyData!(newCurrency);
    console.log('🚀 ~ toggleCurrency ~ newCurrency:', newCurrency);
  }

  //---states------
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);
  return (
    <div className={`icon-currency ${variant}`} onClick={toggleCurrency}>
      {currency.toUpperCase()}
    </div>
  );
}

export default CurrencyBadge;
