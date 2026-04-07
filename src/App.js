import { useMemo, useState } from 'react';
import './theme.css';
import './App.css';
import './Global/thems.css';

import Navbar from './parts/Navbar';
import Searchbar from './parts/Seachbar';
import Home from './parts/Home';
import About from './parts/About';
import writeupsDb from './parts/db.json';

const markdownContext = require.context('./parts/Db', true, /\.md$/);

const writeupFileMap = markdownContext.keys().reduce((accumulator, key) => {
  const loadedFile = markdownContext(key);
  const fileUrl = loadedFile?.default || loadedFile;
  const normalizedPath = `./Db/${key.replace(/^\.\//, '')}`;

  accumulator[normalizedPath] = fileUrl;
  return accumulator;
}, {});

function App() {
  const writeups = useMemo(() => {
    const items = Array.isArray(writeupsDb?.writeups) ? writeupsDb.writeups : [];

    return items
      .map((item) => ({
        ...item,
        fileUrl: writeupFileMap[item.filePath],
      }))
      .filter((item) => item.fileUrl);
  }, []);

  const defaultWriteupId = writeups.length > 0 ? writeups[writeups.length - 1].id : null;
  const [selectedWriteupId, setSelectedWriteupId] = useState(defaultWriteupId);

  const selectedWriteup = useMemo(() => {
    const fallback = writeups.length > 0 ? writeups[writeups.length - 1] : null;

    if (selectedWriteupId == null) {
      return fallback;
    }

    return writeups.find((item) => item.id === selectedWriteupId) || fallback;
  }, [selectedWriteupId, writeups]);

  return (
    <div className="app-shell">
      <div className="app-shell__glow app-shell__glow--one" />
      <div className="app-shell__glow app-shell__glow--two" />
      <main className="app-shell__content">
        <Navbar />
        <Searchbar
          writeups={writeups}
          onSelectWriteup={(id) => {
            setSelectedWriteupId(id);
          }}
        />
        <Home writeup={selectedWriteup} />
        <About />
      </main>
    </div>
  );
}

export default App;
