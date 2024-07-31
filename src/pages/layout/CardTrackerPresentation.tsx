import {
  CardStatePresentation,
  CardStateTop,
} from '../tracker/trackerComponents/TrackerComponents.tsx';

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
