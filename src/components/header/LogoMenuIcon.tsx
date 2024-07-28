import Logo from '../../assets/logo.svg';

import MenuIcon from '../../assets/MenuSvg.svg';
import './logoMenuIcon.css';
function LogoMenuIcon() {
  return (
    <div className='header__logoAndIcon'>
      <Logo />
      <div className='iconContainer'>
        <MenuIcon />
      </div>
    </div>
  );
}

export default LogoMenuIcon;
