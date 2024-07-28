import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
import TrackerLayout from './pages/layout/TrackerLayout.tsx';
import Layout from './pages/layout/Layout.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,

      children: [
        { path: '/tracker', element: <TrackerLayout /> },
        {
          children: [
    
            { index:true, element: <Expense /> },
            { path: '/tracker/expense', element: <Expense /> },
            { path: '/tracker/income', element: <Income /> },
            { path: '/tracker/investment', element: <Investment /> },
            { path: '/tracker/debts', element: <Debts /> },
          ],
        },

        { path: '/budget/category', element: <Categories /> },
        { path: '/budget/category/:categoryId', element: <CategoryDetail /> },
        { path: '/budget/pocket', element: <Pockets /> },
        { path: '/budget/pocket/:pocketId', element: <PocketDetail /> },

        { path: '/debt/debtor', element: <Debtors /> },
        { path: '/debt/debtor/:debtorId', element: <DebtorDetail /> },

        { path: '/overview/account', element: <Accounts /> },
        { path: '/overview/account/:accountId', element: <AccountDetail /> },
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
