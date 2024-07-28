import './trackerStateButton.css';

function TrackerStateButton({ children }: any) {
  return (
    <>
      <div className='trackerStateIconButton iconContainer'>{children}</div>
    </>
  );
}

export default TrackerStateButton;
