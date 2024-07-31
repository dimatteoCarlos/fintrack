import {
  CardStatePresentation,
  CardStateTop,
} from '../trackerComponents/TrackerComponents';

function CardTrackerPresentation({ children }: any) {
  return (
    <>
      <CardStatePresentation>
        <CardStateTop>{children}</CardStateTop>
      </CardStatePresentation>
    </>
  );
}

export default CardTrackerPresentation;
