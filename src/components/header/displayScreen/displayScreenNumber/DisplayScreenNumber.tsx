import { currencyFormat } from '../../../../helpers/functions.ts';
import '../displayScreenStyles.css';

type DisplayScreenNumberPropType = {
  amount: number;
  chosenCurrency: string;
  countryCurrency: string;
};

export function DisplayScreenNumber({
  amount = 0,
  chosenCurrency,
  countryCurrency,
}: DisplayScreenNumberPropType) {
  return (
    <div className='displayScreen displayScreen--number'>
      <div className='displayScreen--concept'>{'Available budget'}</div>
      <div className='displayScreen--result'>
        {currencyFormat(chosenCurrency, amount, countryCurrency)}
      </div>
    </div>
  );
}

export default DisplayScreenNumber;
