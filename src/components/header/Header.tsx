import TopWhiteSpace from '../topWhiteSpace/TopWhiteSpace.tsx';

function Header({children}:any): JSX.Element {
  return (
    <>
      <header className='home__header'>
        <TopWhiteSpace bgc='light' />
        {children}
      </header>
    </>
  );
}

export default Header;
