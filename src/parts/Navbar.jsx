import React, { useEffect, useMemo, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const navLinks = useMemo(
    () => [
      { href: '#home', label: 'Featured' },
      { href: '#search', label: 'Topics' },
    ],
    []
  );
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    function updateActiveFromHash() {
      const nextHash = window.location.hash || '#home';

      if (navLinks.some((link) => link.href === nextHash)) {
        setActiveHref(nextHash);
      }
    }

    function updateActiveFromScroll() {
      const offset = window.scrollY + 140;
      let current = '#home';

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);

        if (section && section.offsetTop <= offset) {
          current = link.href;
        }
      });

      setActiveHref(current);
    }

    updateActiveFromHash();
    updateActiveFromScroll();

    window.addEventListener('hashchange', updateActiveFromHash);
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', updateActiveFromHash);
      window.removeEventListener('scroll', updateActiveFromScroll);
    };
  }, [navLinks]);

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
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`navbar__link ${activeHref === link.href ? 'navbar__link--active' : ''}`}
              href={link.href}
              onClick={() => {
                setActiveHref(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="navbar__cta" href="#home">Read Latest</a>
      </div>
    </nav>
  );
}
