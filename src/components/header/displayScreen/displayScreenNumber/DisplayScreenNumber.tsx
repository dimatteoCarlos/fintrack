import { currencyFormat } from '../../../../helpers/functions.ts';
import '../displayScreenStyles.css';

type DisplayScreenNumberPropType = {
  amount: number;
  chosenCurrency: string;
  countryCurrency: string;
  titleConcept: string;
};

export function DisplayScreenNumber({
  amount = 0,
  chosenCurrency,
  countryCurrency,
  titleConcept,
}: DisplayScreenNumberPropType) {
  return (
    <div className='displayScreen displayScreen--number'>
      <div className='displayScreen--concept'>{titleConcept}</div>
      <div className='displayScreen--result'>
        {currencyFormat(chosenCurrency, amount, countryCurrency)}
      </div>
    </div>
  );
}

export default DisplayScreenNumber;
