import './topWhiteSpace.css';

type TopWhiteSpacePropType = {
  bgc: 'light' | 'dark';
};

function TopWhiteSpace({ bgc }: TopWhiteSpacePropType) {
  return (
    <>
      <div className='top--whiteSpace' style={{ backgroundColor: bgc }}></div>
    </>
  );
}

export default TopWhiteSpace;
