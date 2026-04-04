import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#home">
          <span className="navbar__brand-mark" aria-hidden="true">W</span>
          <span className="navbar__brand-text">
            <span className="navbar__title">WRITEUP BLOG</span>
          </span>
        </a>
        <div className="navbar__links">
          <a className="navbar__link" href="#home">Featured</a>
          <a className="navbar__link" href="#search">Topics</a>
        </div>
        <button className="navbar__cta" type="button">Read Latest</button>
      </div>
    </nav>
  );
}
