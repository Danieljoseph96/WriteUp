import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Seachbar.css';

export default function Seachbar({ writeups = [], onSelectWriteup }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const suggestions = useMemo(() => writeups.slice(0, 6).map((entry) => entry.title), [writeups]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return writeups.filter((entry) => (entry.title || '').toLowerCase().includes(normalized));
  }, [query, writeups]);

  const canSearch = query.trim().length > 0;

  function openResults() {
    if (!canSearch) {
      setShowResults(false);
      return;
    }

    setShowResults(true);
  }

  function handleSelect(entryId) {
    onSelectWriteup?.(entryId);
    setShowResults(false);
    setQuery('');

    const homeSection = document.getElementById('home');

    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section className="searchbar-section" id="search">
      <div className="searchbar-section__header">
        <span className="searchbar-section__eyebrow">Topic Explorer</span>
        <h2 className="searchbar-section__title">Search the WriteUp library.</h2>
      </div>

      <div className="searchbar-section__panel">
        <label className="searchbar-section__label" htmlFor="page-search">
          Search write-up title from JSON index
        </label>
        <div className="searchbar-section__field" ref={containerRef}>
          <input
            id="page-search"
            className="searchbar-section__input"
            type="search"
            value={query}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                openResults();
              }
            }}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              setShowResults(value.trim().length > 0);
            }}
            placeholder="Type a title, like Database"
          />
          <button className="searchbar-section__button" type="button" onClick={openResults}>
            Search
          </button>

          {showResults ? (
            <div className="searchbar-section__popup" role="dialog" aria-label="Search results popup">
              {!query.trim() ? <p className="searchbar-section__meta">Type a title to search.</p> : null}
              {query.trim() && results.length === 0 ? (
                <p className="searchbar-section__meta">No write-up title found.</p>
              ) : null}

              {results.length > 0 ? (
                <ul className="searchbar-section__results" aria-label="Search results">
                  {results.map((entry) => (
                    <li key={entry.id} className="searchbar-section__result-item">
                      <button
                        type="button"
                        className="searchbar-section__result-button"
                        disabled={!entry.fileUrl}
                        onClick={() => {
                          handleSelect(entry.id);
                        }}
                      >
                        <span className="searchbar-section__result-title">{entry.title}</span>
                        <span className="searchbar-section__result-heading">
                          {entry.fileUrl ? 'Click to open full write-up' : 'File is missing for this entry'}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="searchbar-section__chips" aria-label="Suggested searches">
          {suggestions.map((item) => (
            <button
              key={item}
              className="searchbar-section__chip"
              type="button"
              onClick={() => {
                setQuery(item);
                setShowResults(true);
              }}
            >
              {item}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
