import { CurrencyType, StatusType } from '../types/types';
import { DATE_TIME_FORMAT_DEFAULT } from './constants';

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

type OpcType = {
  currentOpc: any;
  opc1: any;
  opc2: any;
  opc3: any;
};

export function genericToggle({ currentOpc, opc1, opc2, opc3 }: OpcType) {
  // Crear un arreglo con las opciones
  const options = [opc1, opc2, opc3];

  // Encontrar el índice de la opción actual en el arreglo
  const currentIndex = options.indexOf(currentOpc);

  // Si no se encuentra la opción actual (caso inesperado), retornar la primera opción
  if (currentIndex === -1) {
    return opc1;
  }

  // Calcular el siguiente índice cíclicamente
  const nextIndex = (currentIndex + 1) % options.length;

  // Retornar la siguiente opción
  return options[nextIndex];
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

export // Lista de códigos de monedas más comunes según ISO 4217 (ejemplo)
const validCurrencyCodes = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SEK',
  'NZD',
  'MXN',
  'SGD',
  'HKD',
  'NOK',
  'KRW',
  'TRY',
  'INR',
  'BRL',
  'ZAR',
  'RUB',
  'PLN',
  'DKK',
  'HUF',
  'ILS',
  'CZK',
  'THB',
  'MYR',
  'PHP',
  'IDR',
  'KRW',
  'SAR',
  'EGP',
  'CLP',
  'COP',
  'ARS',
  'COP',
  'VND',
  'PKR',
  'MAD',
];

// Función para validar un código de moneda basado en ISO 4217
export function isValidCurrencyCode(currency: string): boolean {
  // Convertir el código a mayúsculas para comparación uniforme
  const upperCurrency = currency.toUpperCase();

  // Verificar si el código está en la lista de códigos válidos
  if (validCurrencyCodes.includes(upperCurrency)) {
    return true;
  }

  // Si el código no está en la lista, intentar con Intl.NumberFormat
  try {
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: upperCurrency,
    }).format(100);
    return true; // Si no lanza error, el código de moneda es válido
  } catch (e) {
    return false; // Si lanza error, el código de moneda no es válido
  }
}

// Función para formatear números con soporte opcional de moneda y decimales
export function numberFormatCurrency(
  x: number | string,
  formatNumberCountry: string = 'en-US',
  currency?: string, // Argumento opcional para la moneda
  decimals: number = 2 // Argumento opcional para el número de decimales (predeterminado: 2)
): string {
  // Convertir la entrada a número. Si no es válido, devolver una cadena vacía.
  const enteredNumber = parseFloat(x.toString());

  // Verificar si el valor es un número válido
  if (isNaN(enteredNumber)) {
    return ''; // Puedes devolver '' o lanzar un error si prefieres un manejo más estricto.
  }

  // Si se proporciona un código de moneda y es válido, usamos ese formato
  if (currency && isValidCurrencyCode(currency)) {
    const formatter = new Intl.NumberFormat(formatNumberCountry, {
      style: 'currency',
      currency,
      useGrouping: true,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return formatter.format(enteredNumber); // Devolvemos el número formateado como moneda
  }

  // Si no se proporciona moneda, usamos solo la configuración regional para números
  const formatter = new Intl.NumberFormat(formatNumberCountry, {
    useGrouping: true,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Formatear el número y devolverlo
  return formatter.format(enteredNumber);
}
//-----------

export function showDate(date: Date, countryFormat = DATE_TIME_FORMAT_DEFAULT) {
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
export function isDateValid(dateStr: any) {
  return !isNaN(Number(new Date(dateStr))); //check if a valid timestamp is resturned
}

//-----------------------
export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//-------------------------

export function validationData(stateToValidate: {
  [key: string]: string | number | Date | undefined | null;
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

export const statusFn = (
  budget: number = 100,
  spent: number = 100
): StatusType => {
  const diff = budget - spent;
  // const type = diff >= 0 ? 'debtor' : diff < 0 ? 'lender' : 'none';
  // const type = diff <= 0 ? 'alert' : '';
  const type = diff >= 0;

  return type;
};
