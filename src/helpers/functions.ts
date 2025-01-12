import { CurrencyType } from "../types/types";

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
export function changeCurrency(currency: CurrencyType) {
  if (currency.toLocaleLowerCase() == 'usd') {
    return 'cop';
  } else if (currency.toLocaleLowerCase() == 'cop') {
    return 'usd';
  } else {
    return 'usd';
  }
}
//-------------------------
export function numberFormat(
  x: number | string,
  formatNumberCountry: string = 'en-US'
): string {
  // Convertir la entrada a número. Si no es válido, devolver una cadena vacía.
  const enteredNumber = parseFloat(x.toString());

  // Verificar si el valor es un número válido
  if (isNaN(enteredNumber)) {
    return ''; // Puedes devolver '' o lanzar un error si prefieres un manejo más estricto.
  }

  // Crear el formateador de números con la configuración regional.
  const formatter = new Intl.NumberFormat(formatNumberCountry, {
    useGrouping: true,
  });

  // Formatear el número y devolverlo
  return formatter.format(enteredNumber);
}

//-------------------------

export function showDate(date: Date, countryFormat = 'es-ES') {
  const formattedDate = date.toLocaleDateString(countryFormat, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log(formattedDate);

  return formattedDate;
}

//-------------------------
export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//-------------------------

export function validationData(stateToValidate: {
  [key: string]: string | number | undefined | null;
}) {
  const errorValidationMessages: { [key: string]: string } = {};

  for (const key in stateToValidate) {
    const value = stateToValidate[key];

    if (!value) {
      errorValidationMessages[key] = `* Please provide the ${capitalize(key)}`;
      continue;
    }

    if (typeof value === 'number' && value < 0) {
      errorValidationMessages[key] = `* ${capitalize(key)} must be positive`;
    }

    if (typeof value === 'string' && !value) {
      errorValidationMessages[key] = `* Please provide the ${capitalize(key)}`;
    }
  }
  return errorValidationMessages;
} //fn

export const CURRENCY_OPTIONS = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' }
