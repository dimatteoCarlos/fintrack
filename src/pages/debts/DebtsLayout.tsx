import './styles/debts-styles.css';


import DebtsBigBoxResult from './components/DebtsBigBoxResult.tsx';
import ListOfDebtors from './components/ListOfDebtors.tsx';
import { TitleHeader } from '../../components/TitleHeader.tsx';
import OpenAddEditBtn from '../../components/OpenAddEditBtn.tsx';
import { CardTitle } from '../../components/CardTitle.tsx';

function DebtsLayout() {
  //temporary values------------
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  // const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  const bigScreenInfo = [{ title: "you're owed", amount: 0 }];

  return (
    <>
      <div className='debtsLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader />
          </div>
        </div>

        <DebtsBigBoxResult bigScreenInfo={bigScreenInfo}></DebtsBigBoxResult>

        <section className='content__presentation'>
          <div className='cards__presentation'>
            <CardTitle>Summary</CardTitle>

            <ListOfDebtors></ListOfDebtors>
            <OpenAddEditBtn>
              <div className='open__btn__label'>New Debtor</div>
            </OpenAddEditBtn>
          </div>
        </section>
      </div>
    </>
  );
}

export default DebtsLayout;
