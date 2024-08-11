import AccountingBox from './components/AccountingBox';
import './styles/accounting-styles.css';
import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import { Link } from 'react-router-dom';
function Accounting() {
  const accounting = [
    { title: 'TD', amount: 9999999999.99 },
    { title: 'Regions', amount: 9999999999.999 },
    { title: 'BBVA', amount: 0 },
    { title: 'Binance (investment)', amount: 9999999999.99 },
    { title: 'Crypto.com (investment)', amount: 9999999999.99 },
    { title: 'IBKR (investment)', amount: 9999999999.99 },
  ];

  return (
    <>
      <section className='accounting__layout'>
        <div className='accounting__container'>
          <Link to={'..'} className='accounting__header'>
            <div className='accounting__header--icon'>
              <LeftArrowSvg />
            </div>

            <div className='accounting__title'>{'accounting'}</div>
          </Link>
          
          {accounting.map((balance, indx) => (
            <AccountingBox {...balance} key={`acc-${indx}`} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Accounting;
