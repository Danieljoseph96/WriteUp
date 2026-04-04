import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <section className="home-section" id="home">
      <div className="home-section__copy">
        <span className="home-section__eyebrow">Dark editorial workspace</span>
        <h1 className="home-section__title">
          Shape a focused, cinematic page with sharp contrast and quiet motion.
        </h1>
        <p className="home-section__description">
          This layout blends a deep space palette, glass panels, and neon accents to keep the experience
          readable while still feeling distinctive.
        </p>

        <div className="home-section__actions">
          <button className="home-section__button home-section__button--primary" type="button">
            Start Writing
          </button>
          <button className="home-section__button home-section__button--secondary" type="button">
            Explore Theme
          </button>
        </div>
      </div>

      <div className="home-section__panel">
        <div className="home-section__panel-card home-section__panel-card--large">
          <span className="home-section__panel-label">Live canvas</span>
          <div className="home-section__panel-value">12 active blocks</div>
          <p className="home-section__panel-text">
            Balanced spacing, luminous gradients, and soft borders create a premium dark interface.
          </p>
        </div>

        <div className="home-section__panel-row">
          <div className="home-section__panel-card">
            <span className="home-section__panel-label">Focus</span>
            <div className="home-section__panel-value">98%</div>
          </div>
          <div className="home-section__panel-card">
            <span className="home-section__panel-label">Clarity</span>
            <div className="home-section__panel-value">3 layers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
