import './topWhiteSpace.css';

type TopWhiteSpacePropType = {
  variant: 'light' | 'dark';
};

function TopWhiteSpace({ variant }: TopWhiteSpacePropType) {
  return (
    <>
      <div className='top--whiteSpace' style={{ backgroundColor: variant }}></div>
    </>
  );
}

export default TopWhiteSpace;
