import React from 'react';
import './Seachbar.css';

const suggestions = ['Strategy notes', 'Night mode UI', 'Editorial blocks', 'Glass panels'];

export default function Seachbar() {
  return (
    <section className="searchbar-section" id="search">
      <div className="searchbar-section__header">
        <span className="searchbar-section__eyebrow">Search command</span>
        <h2 className="searchbar-section__title">Find the right idea, faster.</h2>
      </div>

      <div className="searchbar-section__panel">
        <label className="searchbar-section__label" htmlFor="page-search">
          Search topics, prompts, or design directions
        </label>
        <div className="searchbar-section__field">
          <input
            id="page-search"
            className="searchbar-section__input"
            type="search"
            placeholder="Try 'dark dashboard', 'hero layout', or 'brand system'"
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
