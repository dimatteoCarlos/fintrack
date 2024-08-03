import { CardStatePresentation, CardStateTop } from './TrackerComponents.tsx';

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
