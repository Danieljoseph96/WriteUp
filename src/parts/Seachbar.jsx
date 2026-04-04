import React from 'react';
import './Seachbar.css';

const suggestions = ['React architecture', 'Testing playbook', 'DevOps notes', 'Bug postmortems'];

export default function Seachbar() {
  return (
    <section className="searchbar-section" id="search">
      <div className="searchbar-section__header">
        <span className="searchbar-section__eyebrow">Topic Explorer</span>
        <h2 className="searchbar-section__title">Search the WriteUp library.</h2>
      </div>

      <div className="searchbar-section__panel">
        <label className="searchbar-section__label" htmlFor="page-search">
          Search posts by tag, stack, or release stage
        </label>
        <div className="searchbar-section__field">
          <input
            id="page-search"
            className="searchbar-section__input"
            type="search"
            placeholder="Try 'React release checklist' or 'incident writeup'"
          />
          <button className="searchbar-section__button" type="button">
            Search
          </button>
        </div>

        <div className="searchbar-section__chips" aria-label="Suggested searches">
          {suggestions.map((item) => (
            <button key={item} className="searchbar-section__chip" type="button">
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
