import SavingGoals from './components/SavingGoals';
import AccountBalance from './components/AccountBalance';
import Investment from './components/Investment';
import LastMovements from './components/LastMovements';
import LastDebts from './components/LastDebts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../endpoints';

import {
  BudgetType,
  IncomeInfoType,
  // IncomeType,
  ExpensesInfoType,
  // ExpenseType,
  DebtorsListType,
  // DebtorType,
} from '../../types/types';
import { useFetch } from '../../hooks/useFetch';

export type CreateNewAccountPropType = {
  originRoute: string;
  createNewAccount(originRoute: string): void;
};

function Overview() {
  const navigateTo: NavigateFunction = useNavigate();

  const location = useLocation();
  const originRoute = location.pathname;
  // console.log({ originRoute });

  //===============================================

  const url_expenses = BASE_URL + '/' + 'expenses';
  const expenses = useFetch<ExpensesInfoType>(url_expenses);

  const url_budget = BASE_URL + '/' + 'budget';
  const budget = useFetch<BudgetType>(url_budget);

  const url_income = BASE_URL + '/' + 'income';
  const income = useFetch<IncomeInfoType>(url_income);

  const url_debtors = BASE_URL + '/' + 'debtors';
  const debtors = useFetch<DebtorsListType>(url_debtors);

  const url_debtors_debt = BASE_URL + '/' + 'debtors/debt';
  const debts = useFetch<any>(url_debtors_debt);

  const url_categories = BASE_URL + '/' + 'categories';
  const categories = useFetch<any>(url_categories);

  const url_investment_acc = BASE_URL + '/' + 'investment-accounts';
  const investment_acc = useFetch<any>(url_investment_acc);

  const url_accounts = BASE_URL + '/' + 'accounts';
  const accounts = useFetch<any>(url_accounts);

  const url_investment = BASE_URL + '/' + 'investment';
  const investment = useFetch<any>(url_investment);

  // categories
  // accounts
  // investment

  // const url_investment = BASE_URL + '/' + 'investment-accounts';
  // const investment = useFetch<any>(url_investment);

  console.log({
    accounts,
    budget,
    categories,
    debtors,
    debts,
    expenses,
    income,
    investment,
    investment_acc,
  });

  //===============================================

  function createNewAccount(originRoute: string) {
    navigateTo(originRoute + '/new_account', {
      state: { previousRoute: originRoute },
    });
  }

  return (
    <section className='content__presentation'>
      <div className='cards__presentation'>
        
        <SavingGoals />

        <AccountBalance
          createNewAccount={createNewAccount}
          originRoute={originRoute}
        />

        <Investment
          createNewAccount={createNewAccount}
          originRoute={originRoute}
        />

        <LastMovements />

        <LastDebts />

      </div>
    </section>
  );
}
export default Overview;
