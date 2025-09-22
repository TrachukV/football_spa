import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/ball.svg';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <img src={logo} alt="logo" className="brand__logo" />
          <span className="brand__name">Football SPA</span>
        </div>

        <nav className="main-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link--active' : '')
            }
          >
            Matches
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link--active' : '')
            }
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
