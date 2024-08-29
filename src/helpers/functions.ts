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

//--------------------------
export function digitRound(n = Number.MIN_VALUE, digit = 2) {
  return Math.round(n * Math.pow(10, digit)) / Math.pow(10, digit);
}

//--------------------------
export function changeCurrency(currency: 'cop' | 'usd') {
  if (currency.toLocaleLowerCase() == 'usd') {
    return 'cop';
  } else if (currency.toLocaleLowerCase() == 'cop') {
    return 'usd';
  } else {
    return 'usd';
  }
}
//----------------------------
export function numberFormat(
  x: number | string,
  formatNumberCountry: string = 'en-US'
) {
  if (Number.isNaN(Number.parseFloat(x.toString()))) {
    return 0;
  }

  const enteredNumber = Number.parseFloat(x.toString());

  const formatter = new Intl.NumberFormat(formatNumberCountry, {
    useGrouping: true,
  });

  const formattedNumber = formatter.format(Number(enteredNumber));

  // console.log(formattedNumber);

  return formattedNumber;
}
//-------------------------
export function showDate(date: Date, countryFormat = 'es-ES') {
  const formattedDate = date.toLocaleDateString(countryFormat, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // console.log(formattedDate);

  return formattedDate;
}
//-------------------------
export function capitlizeFirstWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
//-------------------------
