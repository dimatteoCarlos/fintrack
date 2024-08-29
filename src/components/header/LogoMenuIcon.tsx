import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/MenuSvg.svg';
import './styles/logoMenuIcon-style.css';

function LogoMenuIcon() {
  return (
    <div className='header__logoAndIcon'>
      <Logo />
      <Link to ='/accounting' className='iconContainer'>
        <MenuIcon />
      </Link>
    </div>
  );
}

export default LogoMenuIcon;
