import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import Expense from './pages/tracker/expense/Expense.tsx';
import Income from './pages/tracker/income/Income.tsx';
import Investment from './pages/tracker/investment/Investment.tsx';
import Debts from './pages/tracker/debts/Debts.tsx';
import Categories from './pages/budget/categories/Categories.tsx';
// import CategoryDetail from './pages/budget/categories/CategoryDetail.tsx';
import Pockets from './pages/budget/pockets/Pockets.tsx';
// import PocketDetail from './pages/budget/pockets/PocketDetail.tsx';

import Debtors from './pages/debts/debtors/Debtors.tsx';
// import DebtorDetail from './pages/debts/debtors/DebtorDetail.tsx';

// import AccountDetail from './pages/overview/accounts/AccountDetail.tsx';

// import Accounts from './pages/overview/accounts/Accounts.tsx';
// import AccountDetail from './pages/forms/accountDetail/AccountDetail.tsx';
import CategoryDetail from './pages/forms/categoryDetail/CategoryDetail.tsx';
// import PocketDetail from './pages/forms/pocketDetail/PocketDetail.tsx';
import DebtorDetail from './pages/forms/debtorDetail/DebtorDetail.tsx';

import TrackerLayout from './pages/tracker/TrackerLayout.tsx';
import Layout from './pages/layout/Layout.tsx';
import BudgetLayout from './pages/budget/BudgetLayout.tsx';
import DebtsLayout from './pages/debts/DebtsLayout.tsx';
import OverviewLayout from './pages/overview/OverviewLayout.tsx';
import NotFoundPage from './pages/error/NotFoundPage.tsx';
import Accounting from './pages/accounting/Accounting.tsx';
import NewCategory from './pages/forms/newCategory/NewCategory.tsx';
import NewPocket from './pages/forms/newPocket/NewPocket.tsx';
import NewProfile from './pages/forms/newProfile/NewProfile.tsx';
import NewAccount from './pages/forms/newAccount/NewAccount.tsx';
import Overview from './pages/overview/Overview.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,

      children: [
        { index: true, element: <Navigate to='/tracker/expense' /> },
        {
          path: '/tracker',
          element: <TrackerLayout />,
          children: [
            { index: true, element: <Expense /> },
            { path: '/tracker/expense', element: <Expense /> },
            { path: '/tracker/income', element: <Income /> },
            { path: '/tracker/investment', element: <Investment /> },
            { path: '/tracker/debts', element: <Debts /> },
          ],
        },

        {
          path: '/budget',
          element: <BudgetLayout />,
          children: [
            { path: '/budget/categories', element: <Categories /> },
          ],
          // { path: '/budget/categories/new', element: <NewCategory /> },
          // {
          //   path: '/budget/categories/:categoryId',
          //   element: <CategoryDetail />,
          // },
          // { path: '/budget/pockets', element: <Pockets /> },
          // { path: '/budget/pockets/:pocketId', element: <PocketDetail /> },
        },

        {
          path: '/debts',
          element: <DebtsLayout />,
          children: [
            { index: true, element: <Debtors /> },
            { path: '/debts/debtors', element: <Debtors /> },
            { path: '/debts/debtors/:debtorId', element: <DebtorDetail /> },
          ],
        },

        {
          path: '/overview',
          element: <OverviewLayout />,
          children: [
            // { index: true, element: <Account /> },//what would be this?
            { index: true, element: <Overview /> },
            { path: '/overview/accounts', element: <Overview /> },
          ],
        },
      ],
    },
    { path: '/accounting', element: <Accounting /> },
    { path: '/budget/categories/new_category', element: <NewCategory /> },
    { path: '/budget/categories/new_pocket', element: <NewPocket /> },
    { path: '/debts/debtors/new_profile', element: <NewProfile /> },
    { path: '/overview/accounts/new_account', element: <NewAccount /> },
    // {
    //   path: '/overview/accounts/:accountId',
    //   element: <AccountDetail />,
    // },
    // {
    //   path: '/overview/accounts/:accountId',
    //   element: <DebtorDetail />,
    // },
    // {
    //   path: '/overview/accounts/:accountId',
    //   element: <PocketDetail />,
    // },
    {
      path: '/overview/accounts/:accountId',
      element: <CategoryDetail />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
