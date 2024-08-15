import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { CardTitle } from '../../../components/CardTitle';
import OpenAddEditBtn from '../../../components/OpenAddEditBtn';
import ListOfDebtors from '../components/ListOfDebtors';

function Debtors() {
  const originRoute = useLocation().pathname;
  const navigateTo: NavigateFunction = useNavigate();
  console.log(originRoute);

  //functions
  const createNewProfile = (originRoute: string) => {
    navigateTo(originRoute + '/new_profile', {
      state: { previousRoute: originRoute },
    });
  };

  return (
    <>
      <section className='content__presentation'>
        <div className='cards__presentation'>
          <CardTitle>Summary</CardTitle>

          <ListOfDebtors></ListOfDebtors>

          <OpenAddEditBtn
            btnFunction={createNewProfile}
            btnFunctionArg={originRoute}
            btnPreviousRoute={originRoute}
          >
            <div className='open__btn__label'>New Debtor</div>
          </OpenAddEditBtn>
        </div>
      </section>
    </>
  );
}

export default Debtors;
