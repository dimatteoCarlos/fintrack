import { currencyFormat } from '../../../../helpers/functions.ts';
import '../displayScreenStyles.css';

type DisplayScreenNumberPropType = {
  amount: number;
  chosenCurrency: string;
  countryCurrency: string;
  titleConcept: string;
  variant: string;
};

export function DisplayScreenNumber({
  amount = 0,
  chosenCurrency,
  countryCurrency,
  titleConcept,
  variant,
}: DisplayScreenNumberPropType) {
  return (
    <div className={`displayScreen ${variant}`}>
      {/* <div className={`displayScreen--concept ${variant}`}>{titleConcept}</div>
      <div className={`displayScreen--result ${variant}`}>
        {currencyFormat(chosenCurrency, amount, countryCurrency)}
      </div> */}
    </div>
  );
}

export default DisplayScreenNumber;
