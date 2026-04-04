import './theme.css';
import './App.css';
import './Global/thems.css';

import Navbar from './parts/Navbar';
import Searchbar from './parts/Seachbar';
import Home from './parts/Home';
import About from './parts/About';

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__glow app-shell__glow--one" />
      <div className="app-shell__glow app-shell__glow--two" />
      <main className="app-shell__content">
         <Navbar />
        <Searchbar />
       
        <Home />
        <About />
      </main>
    </div>
  );
}

export default App;
