import Header from '../../components/header/Header';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../../components/mainNavbar/MainNavbar.tsx';

function Layout() {
  //-------------------------------

  return (
    <>
      <section className='home__layout'>
        <Header />
        <Outlet />
        <MainNavbar />
      </section>
    </>
  );
}

export default Layout;
