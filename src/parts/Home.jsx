import React from 'react';
import './Home.css';
import db from './db.json';

const writeups = db.writeups ?? [];


export default function Home() {
  return (
    <section className="home-section" id="home">
      <div className="home-section__copy">
       

        <div className="home-section__writeups">
          <h3 className="home-section__writeups-title">WriteUp List</h3>
          <ul className="home-section__writeups-list">
            {writeups.map((item) => (
              <li key={item.title} className="home-section__writeups-item">
                <h4 className="home-section__writeups-title">{item.title}</h4>
                <p className="home-section__writeups-description">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </section>
  );
}
