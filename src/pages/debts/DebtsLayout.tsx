import DebtsBigBoxResult from './components/DebtsBigBoxResult.tsx';
import { TitleHeader } from '../../components/titleHeader/TitleHeader.tsx';

import Debtors from './debtors/Debtors.tsx';
import './styles/debts-styles.css';

function DebtsLayout() {

  //temporary values------------

  const bigScreenInfo = [{ title: "you're owed", amount: 0 }];

  return (
    <div className='debtsLayout'>
      <div className='layout__header'>
        <div className='headerContent__container'>
          <TitleHeader />
        </div>
      </div>
      <DebtsBigBoxResult bigScreenInfo={bigScreenInfo}></DebtsBigBoxResult>
      <Debtors />
    </div>
  );
}

export default DebtsLayout;
