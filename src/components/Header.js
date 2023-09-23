import React from "react";
import headerLogo from "../images/logo.svg";
import {useLocation} from 'react-router-dom';

function Header({loggedIn}) {
  const location = useLocation();

  return (
      <header className="header">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        <ul className="header__navigation">
        {/* {loggedIn ? <li className="header__link"></li> : ''} */}
        {location.pathname === '/sign-up' ? <li className="header__link">Войти</li> : ''}
        {location.pathname === '/sign-in' ? <li className="header__link">Регистрация</li> : ''}
        </ul>
      </header>
  );
}

export default Header;
