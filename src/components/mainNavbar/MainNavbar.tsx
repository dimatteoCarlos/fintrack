import MainNavbarContainer from './MainNavbarContainer';
import BudgetButton from './BudgetButton.tsx';
import TrackerButton from './TrackerButton.tsx';
import DebtsButton from './DebtsButton.tsx';
import OverviewButton from './OverviewButton.tsx';

function MainNavbar() {
  
  return (
    <MainNavbarContainer>
      <TrackerButton />
      <BudgetButton />
      <DebtsButton />
      <OverviewButton />
    </MainNavbarContainer>
  );
}

export default MainNavbar;
