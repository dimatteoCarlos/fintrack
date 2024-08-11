import AccountingBox from './components/AccountingBox';
import './styles/accounting-styles.css';
import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import { TitleHeader } from '../../components/TitleHeader';
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
        <div className='headerContent__container'>
          <Link to={'..'} className='title__header__container'>
            <div className='iconArrowLeftDark'>
              <LeftArrowSvg />
            </div>

            <div className='title__header accounting__title'>
              {'Accounting'}
            </div>
          </Link>
          );
        </div>

        {accounting.map((balance, indx) => (
          <AccountingBox {...balance} key={`acc-${indx}`} />
        ))}
      </section>
    </>
  );
}

export default Accounting;
