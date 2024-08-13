import { currencyFormat } from '../../../helpers/functions';

function BudgetBigBoxResult() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

  const resultAmount = 0;
  const remaining = 0;
  
  return (
    <div className='total__container flex-col-sb'>
    <div className='total__amount'>
      {currencyFormat(defaultCurrency, resultAmount, formatNumberCountry)}
    </div>

    <div className={`flex-row-sb displayScreen ${'light'}`}>
      <div className={`displayScreen--concept ${'dark'}`}>
        {'Remaining'}
      </div>

      <div className={`displayScreen--result ${'dark'}`}>
        {currencyFormat(defaultCurrency, remaining, formatNumberCountry)}
      </div>
    </div>
  </div>
  )
}

export default BudgetBigBoxResult
