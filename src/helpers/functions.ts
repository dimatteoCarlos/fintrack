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
  if (currency.toLocaleLowerCase() == 'usd') {
    return 'cop';
  } else if (currency.toLocaleLowerCase() == 'cop') {
    return 'usd';
  } else {
    return 'usd';
  }
}
//-------------------------
export function numberFormat(x: number | string, formatNumberCountry: string) {
  if (Number.isNaN(Number.parseFloat(x.toString()))) {
    return 0;
  }

  const enteredNumber = Number.parseFloat(x.toString());
  
  const formatter = new Intl.NumberFormat(formatNumberCountry, {
    useGrouping: true,
  });

  const formattedNumber = formatter.format(Number(enteredNumber));

  console.log(Number(formattedNumber), formattedNumber);

  return formattedNumber;
}
//-------------------------
