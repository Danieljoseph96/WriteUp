import React from 'react';
import './About.css';

const highlights = [
  {
    title: 'Layered lighting',
    text: 'The interface uses subtle radial glows instead of flat color blocks so the page feels dimensional.',
  },
  {
    title: 'Readable contrast',
    text: 'Muted surfaces and bright accents keep the content easy to scan without losing the dark mood.',
  },
  {
    title: 'Intentional rhythm',
    text: 'Cards and panels are spaced to guide the eye from the hero into the search and detail sections.',
  },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-section__intro">
        <span className="about-section__eyebrow">Why this layout works</span>
        <h2 className="about-section__title">A dark page that feels crafted, not generic.</h2>
      </div>

      <div className="about-section__grid">
        {highlights.map((item) => (
          <article key={item.title} className="about-section__card">
            <h3 className="about-section__card-title">{item.title}</h3>
            <p className="about-section__card-text">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
