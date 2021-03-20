import React from 'react';
import { Link } from 'gatsby';
import headerStyles from '../styles/components/header.module.scss';

export default function Header({ page, title, toggleInfo }) {
  return (
    <header className={headerStyles.header}>
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        <div>
          <h2>
            <button type="button" onClick={toggleInfo}>
              {page === 'info' ? 'close' : 'info'}
            </button>
          </h2>
        </div>
      </nav>
    </header>
  );
}
