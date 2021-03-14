import React from 'react';
import { Link } from 'gatsby';
import headerStyles from '../styles/components/header.module.scss';

export default function Header({ page, title }) {
  return (
    <header
      className={`${headerStyles.header} ${
        page === 'info' && headerStyles.info_page
      }`}
    >
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        <div>
          <h1>
            <Link
              to={page === 'info' ? '/' : '/info'}
              activeClassName={headerStyles.navItemActive}
            >
              {page === 'info' ? 'close' : 'info'}
            </Link>
          </h1>
        </div>
      </nav>
    </header>
  );
}
