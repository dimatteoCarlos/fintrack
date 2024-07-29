type currencyFormatType = {
  number: number;
  chosenCurrency: string;
  countryFormat: string;
};

//-------------------------

export function currencyFormat(
  chosenCurrency = 'USD',
  number = 0,
  countryFormat = 'en-US'
) {
  const formatFn = new Intl.NumberFormat(countryFormat, {
    style: 'currency',
    currency: chosenCurrency,
  });
  return formatFn.format(number);
}

//--------------------
export function digitRound(n = Number.MIN_VALUE, digit = 2) {
  return Math.round(n * Math.pow(10, digit)) / Math.pow(10, digit);
}

//-------------------------
export function changeCurrency(currency: 'cop' | 'usd') {
  if (currency == 'usd') {
    return 'cop';
  } else if (currency == 'cop') {
    return 'usd';
  } else {
    return 'usd';
  }
}
//-------------------------
