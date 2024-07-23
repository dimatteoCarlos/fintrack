import './home.css';

const Home = () => {
  return (
    <section className='home__layout'>
      <header className='home__header'>
        <div className='home__header--whiteSpace'></div>

        <div className='home__header--presentation'>
          <div className='menu__container'>
            <div className='menu__logoAndIcon--container'>
              <div className='logo'></div>

              <div className='icon icon--menu'></div>
            </div>

            <div className='screen'>
              <div className='screen--text'></div>
              <div className='screen--amount'></div>
            </div>
          </div>
        </div>
      </header>

      <nav className='navbar__states'>
        <div className='state'>
          <div className='icon state--icon'></div>
          <div className='state--title'></div>
        </div>
      </nav>

      <div className='state__cards'>
        <div className='state__card--top'>
          <div className='card--title'></div>
          <div className='card__screen'>
            <div className='screen--amount'></div>
            <div className='screen--icon'></div>
          </div>

          <div className='card--title'></div>
          <div className='card__screen'>
            <div className='screen--title'></div>
            <div className='screen--icon'></div>
          </div>
        </div>
        <div className='stack__sep'></div>
        <div className='state__card--bottom'>
          <div className='card--title'></div>
          <div className='card__screen'>
            <div className='screen--title'></div>
            <div className='screen--icon'></div>
            <div className='screen--title'></div>
            <div className='card__screen'>
              <div className='screen--title'></div>
              <div className='icon screen--icon'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
