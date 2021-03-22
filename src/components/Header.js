import React from 'react';
import { Link } from 'gatsby';
import { CgEditContrast, CgInfo } from 'react-icons/cg';
import headerStyles from '../styles/components/header.module.scss';

export default function Header({ toggleInfo, toggleColor }) {
  return (
    <header className={headerStyles.header}>
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/">
          <h5 className="h1 siteTitle">Keep making things</h5>
        </Link>
        <h6 className="h2">
          <button type="button" onClick={toggleColor}>
            <CgEditContrast color="var(--baseColor)" />
          </button>
          <button type="button" onClick={toggleInfo}>
            <CgInfo color="var(--baseColor)" />
          </button>
        </h6>
      </nav>
    </header>
  );
}
