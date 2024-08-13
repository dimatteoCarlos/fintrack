import './styles/budget-styles.css';

import { currencyFormat } from '../../helpers/functions';
import { CardTitle } from '../../components/CardTitle';
import ListCategory from './components/ListCategory';
import ListPocket from './components/ListPocket';
import { TitleHeader } from '../../components/titleHeader/TitleHeader';
import OpenAddEditBtn from '../../components/OpenAddEditBtn';
import { Outlet } from 'react-router-dom';
import Categories from './categories/Categories';
import BudgetBigBoxResult from './components/BudgetBigBoxResult';

function BudgetLayout() {
  //temporary values------------
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  // const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];

  // const resultAmount = 0;
  // const remaining = 0;

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

        <BudgetBigBoxResult />

        <Categories />
      </div>
    </>
  );
}

export default BudgetLayout;
