import { currencyFormat } from '../../helpers/functions';

import './styles/budget-styles.css';

import { CardTitle } from '../../components/CardTitle';
import ListCategory from './components/ListCategory';
import ListPocket from './components/ListPocket';
import { TitleHeader } from '../../components/TitleHeader';
import OpenAddEditBtn from '../../components/OpenAddEditBtn';

function BudgetLayout() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

  const resultAmount = 0;
  const remaining = 0;

  //Temporarily Dummy data
  // const categories = [
  //   {
  //     categoryName: 'Category Name',
  //     spent: 'spent',
  //     statusTitle: 'status',
  //     budget: 'budget',
  //   },
  //   {
  //     categoryName: 'Category Name',
  //     spent: 'spent',
  //     statusTitle: 'status',
  //     budget: 'budget',
  //   },
  //   {
  //     categoryName: 'Category Name',
  //     spent: 'spent',
  //     statusTitle: 'status',
  //     budget: 'budget',
  //   },
  //   {
  //     categoryName: 'Category Name',
  //     spent: 'spent',
  //     statusTitle: 'status',
  //     budget: 'budget',
  //   },
  // ];

  return (
    <>
      <div className='budgetLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader></TitleHeader>
          </div>
        </div>

        {/* <BigBoxResult> */}
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

        {/* </BigBoxResult> */}

        <section className='content__presentation'>
          <div className='cards__presentation'>
            <CardTitle>Category List</CardTitle>

            <ListCategory />

            <OpenAddEditBtn>
              <div className='open__btn__label'>New Category</div>
            </OpenAddEditBtn>

            <CardTitle>Pockets</CardTitle>
            <ListPocket />

            <OpenAddEditBtn>
              <div className='open__btn__label'>New Pocket</div>
            </OpenAddEditBtn>
          </div>
        </section>
      </div>
    </>
  );
}

export default BudgetLayout;
