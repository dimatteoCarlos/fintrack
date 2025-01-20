import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import Expense from './pages/tracker/expense/Expense.tsx';
import Income from './pages/tracker/income/Income.tsx';
import Investment from './pages/tracker/investment/Investment.tsx';
import Debts from './pages/tracker/debts/Debts.tsx';
import BudgetPresentation from './pages/budget/components/BudgetPresentation.tsx';
// import CategoryDetail from './pages/budget/CategoryDetail.tsx';
// import Pockets from './pages/budget/pockets/Pockets.tsx';
// import PocketDetail from './pages/budget/pockets/PocketDetail.tsx';

import Debtors from './pages/debts/debtors/Debtors.tsx';
// import DebtorDetail from './pages/debts/debtors/DebtorDetail.tsx';

// import AccountDetail from './pages/overview/accounts/AccountDetail.tsx';

// import Accounts from './pages/overview/accounts/Accounts.tsx';
import AccountDetail from './pages/forms/accountDetail/AccountDetail.tsx';
import DebtorDetail from './pages/forms/debtorDetail/DebtorDetail.tsx';
// import PocketDetail from './pages/forms/pocketDetail/PocketDetail.tsx';
// import CategoryDetail from './pages/forms/categoryDetail/CategoryDetail.tsx';

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
import Movements from './pages/movements/Movements.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,

      children: [
        { index: true, element: <Navigate to='/tracker' /> },
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
            { path: '/budget/presentation', element: <BudgetPresentation /> },
          ],
          // { path: '/budget/new', element: <NewCategory /> },
          // {
          //   path: '/budget/:categoryId',
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
            // { path: '/overview/accounts', element: <Overview /> },
          ],
        },
      ],
    },

    { path: '/accounting', element: <Accounting /> },

    //forms new item
    { path: '/budget/new_category', element: <NewCategory /> },
    { path: '/budget/new_pocket', element: <NewPocket /> },
    { path: '/debts/debtors/new_profile', element: <NewProfile /> },
    { path: '/overview/new_account', element: <NewAccount /> },

    //show movements
    {
      path: '/overview/movements/expense',
      element: <Movements />,
    },
    {
      path: '/overview/movements/debt',
      element: <Movements />,
    },
    //show detailed item
    {
      path: '/overview/accounts/:accountId',
      element: <AccountDetail />,
    },
    // {
    //   path: '/overview/debtors/:accountId',/
    //   element: <DebtorDetail />,
    // },
    // {
    //   path: '/overview/pockets/:accountId',
    //   element: <PocketDetail />,
    // },
    //
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
