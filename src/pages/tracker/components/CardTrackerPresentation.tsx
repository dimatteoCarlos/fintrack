import { CardSeparator, CardStatePresentation, CardStateTop } from './TrackerComponents.tsx';

function CardTrackerPresentation({ children }: any) {
  return (
    <>
      <div className='content__presentation'>
      {/* <CardSeparator /> */}
        <div className='cards__presentation cards__presentation--tracker'>

          <div className='state__card--top'>
        {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardTrackerPresentation;
