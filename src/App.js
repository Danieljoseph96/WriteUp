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

function normalizePath(pathValue) {
  return (pathValue || '').replace(/\\/g, '/').trim();
}

function resolveWriteupFileUrl(filePath) {
  const normalized = normalizePath(filePath);

  if (!normalized) {
    return undefined;
  }

  const withDotSlash = normalized.startsWith('./') ? normalized : `./${normalized.replace(/^\//, '')}`;
  const withoutDotSlash = withDotSlash.replace(/^\.\//, '');
  const fileNameOnly = withoutDotSlash.split('/').pop();
  const dbRelative = fileNameOnly ? `./Db/${fileNameOnly}` : '';

  return (
    writeupFileMap[normalized] ||
    writeupFileMap[withDotSlash] ||
    writeupFileMap[`./${withoutDotSlash}`] ||
    writeupFileMap[dbRelative] ||
    undefined
  );
}

function App() {
  const writeups = useMemo(() => {
    const items = Array.isArray(writeupsDb?.writeups) ? writeupsDb.writeups : [];

    return items.map((item) => ({
      ...item,
      filePath: normalizePath(item.filePath),
      fileUrl: resolveWriteupFileUrl(item.filePath),
    }));
  }, []);

  const [selectedWriteupId, setSelectedWriteupId] = useState(null);

  const selectedWriteup = useMemo(() => {
    if (selectedWriteupId == null) {
      return null;
    }

    return writeups.find((item) => item.id === selectedWriteupId) || null;
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
        <Home
          writeup={selectedWriteup}
          writeups={writeups}
          onSelectWriteup={(id) => {
            setSelectedWriteupId(id);
          }}
          onClearSelection={() => {
            setSelectedWriteupId(null);
          }}
        />
        <About />
      </main>
    </div>
  );
}

export default App;
