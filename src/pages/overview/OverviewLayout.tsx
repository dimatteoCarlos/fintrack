import './overview-styles.css';

import Overview from './Overview';

import { BigBoxResult } from './components/BigBoxResult';
import FunctionalPageLayoutHeader from './components/FunctionalPageLayoutHeader';
import { TitleHeader } from './components/TitleHeader';
import { Outlet } from 'react-router-dom';

//
function OverviewLayout() {
  //Temporary Dummy data
  //Saving Goals
  const bigScreenInfo = [
    { title: 'net worth', amount: 0 },
    { title: 'income', amount: 0 },
    { title: 'expenses', amount: 0 },
  ];

  return (
    <main className='overviewLayout'>
      <FunctionalPageLayoutHeader>
        <TitleHeader />
      </FunctionalPageLayoutHeader>

      <BigBoxResult bigScreenInfo={bigScreenInfo} />
      {/* <Outlet/> */}
      <Overview />
    </main>
  );
}

export default OverviewLayout;
