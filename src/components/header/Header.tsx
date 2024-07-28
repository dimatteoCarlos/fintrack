import TopWhiteSpace from '../topWhiteSpace/TopWhiteSpace.tsx';

import './headerStyle.css';

function Header(): JSX.Element {
  return (
    <>
      <header className='home__header'>
        <TopWhiteSpace bgc='light' />
      </header>
    </>
  );
}

export default Header;
