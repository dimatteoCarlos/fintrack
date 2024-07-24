import ExpenseIncome from './pages/states/ExpenseIncome.tsx';
import Investment from './pages/states/Investment.tsx';
import Debts from './pages/states/Debts.tsx';
import NewCategory from './pages/forms/newCategory/NewCategory.tsx';
import NewPocket from './pages/forms/newPocket/NewPocket.tsx';
import NewProfile from './pages/forms/newProfile/NewProfile.tsx';
// import NewCategory from './pages/states/forms/newCategory/NewCategory.tsx';

function App() {
  return (
    <>
      <NewProfile/>
      <NewPocket/>
      <NewCategory/>
      {/* <ExpenseIncome stateName={'expense'} /> */}
      {/* <ExpenseIncome stateName={'income'} />
      <Investment />
      <Debts /> */}
    
    </>
  );
}

export default App;
