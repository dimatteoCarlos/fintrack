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
import CategoryDetail from './pages/budget/categories/CategoryDetail.tsx';
import Pockets from './pages/budget/pockets/Pockets.tsx';
import PocketDetail from './pages/budget/pockets/PocketDetail.tsx';
import Debtors from './pages/debts/debtors/Debtors.tsx';
import DebtorDetail from './pages/debts/debtors/DebtorDetail.tsx';
import Accounts from './pages/overview/accounts/Accounts.tsx';
import AccountDetail from './pages/overview/accounts/AccountDetail.tsx';
import TrackerLayout from './pages/tracker/TrackerLayout.tsx';
import Layout from './pages/layout/Layout.tsx';
import BudgetLayout from './pages/budget/BudgetLayout.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,

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
            { index: true, element: <Categories /> },
            { path: '/budget/categories', element: <Categories /> },
            {
              path: '/budget/categories/:categoryId',
              element: <CategoryDetail />,
            },
            { path: '/budget/pockets', element: <Pockets /> },
            { path: '/budget/pockets/:pocketId', element: <PocketDetail /> },
          ],
        },

        { path: '/debts/debtors', element: <Debtors /> },
        { path: '/debts/debtors/:debtorId', element: <DebtorDetail /> },

        { path: '/overview/accounts', element: <Accounts /> },
        { path: '/overview/accounts/:accountId', element: <AccountDetail /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
