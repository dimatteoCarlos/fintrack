import AccountingBox from './components/AccountingBox';
import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import { Link, useLocation } from 'react-router-dom';
import TopWhiteSpace from '../../general_components/topWhiteSpace/TopWhiteSpace.tsx';
import './styles/accounting-styles.css';

function Accounting() {
  const location = useLocation();
  const previousRoute = location.state?.originRoute || '/tracker/expense';

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
          {/* <Link to={'/tracker/expense'} className='accounting__header'> */}
          <Link to={previousRoute} className='accounting__header'>
            <div className='accounting__header--icon'>
              <LeftArrowSvg />
            </div>

            <div className='accounting__title'>{'Accounting'}</div>
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
