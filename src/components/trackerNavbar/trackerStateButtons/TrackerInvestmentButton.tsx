import TrackerStateButton from './TrackerStateButton';
import InvestmentSvg from '../../../assets/trackerNavbarSvg/InvestmentSvg.svg';
function TrackerInvestmentButton() {
  return (
    <>
      <div className='trackerStateButton__container'>
        <TrackerStateButton>
          <InvestmentSvg />
        </TrackerStateButton>
        <div className='trackerStateButton__state--title'>{'Investment'}</div>
      </div>
    </>
  );
}

export default TrackerInvestmentButton;
