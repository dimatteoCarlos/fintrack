import { numberFormat } from '../../helpers/functions';
// import { currencyFormat } from '../../../helpers/functions';
import { StatusSquare } from '../boxComponents';
import './styles/summaryDetailBox-style.css';

//temporary values------------
const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
const defaultCurrency = 'usd';
const formatNumberCountry = currencyOptions[defaultCurrency];

//----------------------------

type SummaryDetailPropType = {
  summaryData: {
    title: string;
    amount: number;
    subtitle1: string;
    subtitle2: string;
    status: JSX.Element;
  };
};

function SummaryDetailBox({ summaryData }: SummaryDetailPropType) {
  const { title, subtitle1, subtitle2, amount } = summaryData;
  return (
    <>
      <div className='summary__container'>
        <div className='summary__title'>{title}</div>
        <div className='summary__data'>
          <div className='summary__data--amount'>
            <span> {'$'}</span>
            <span>
              {' '}
              {/* {currencyFormat(defaultCurrency, amount, formatNumberCountry)} */}
              {/* {amount.toFixed(2)} */}
              {/* {new Intl.NumberFormat('en-US').format(amount)} */}
              {numberFormat(amount, formatNumberCountry)}
            </span>
          </div>

          <div className='summary__data--subtitle1'>{subtitle1}</div>

          <div className='summary__data--status '>
            <StatusSquare />{' '}
            <div className='summary__data--subtitle2'>{subtitle2}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryDetailBox;
