import AccountingBox from './components/AccountingBox';
import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import { Link } from 'react-router-dom';
import './styles/accounting-styles.css';
import TopWhiteSpace from '../../components/topWhiteSpace/TopWhiteSpace';
// import TopWhiteSpace from '../../../components/topWhiteSpace/TopWhiteSpace.tsx';

function Accounting() {
  const accounting = [
    { title: 'Account_1', amount: 9999999999.99 },
    { title: 'Account_2', amount: 9999999999.999 },
    { title: 'Account_3', amount: 0 },
    { title: 'Account_4 (investment)', amount: 9999999999.99 },
    { title: 'Acc_5.com (investment)', amount: 9999999999.99 },
    { title: 'Account_6 (investment)', amount: 9999999999.99 },
  ];

  return (
    <>
      <section className='accounting__layout'>
        <TopWhiteSpace variant={'dark'} />

        <div className='accounting__container'>
          <Link to={'/tracker/expense'} className='accounting__header'>
            <div className='accounting__header--icon'>
              <LeftArrowSvg />
            </div>

            <div className='accounting__title'>{'accounting'}</div>
          </Link>

          {accounting.map((balance, indx) => (
            <AccountingBox {...balance} key={`account-${indx}`} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Accounting;
