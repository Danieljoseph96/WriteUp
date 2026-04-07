import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './Home.css';

const imageContext = require.context('./img', true, /\.(png|jpe?g|gif|webp|svg)$/i);

const localAssetMap = imageContext.keys().reduce((accumulator, key) => {
  const loadedFile = imageContext(key);
  const fileUrl = loadedFile?.default || loadedFile;
  const normalizedKey = key.replace(/^\.\//, '');
  const normalizedWithFolder = `img/${normalizedKey}`;

  accumulator[normalizedKey.toLowerCase()] = fileUrl;
  accumulator[normalizedWithFolder.toLowerCase()] = fileUrl;

  return accumulator;
}, {});

function resolveLocalAssetUrl(value) {
  if (!value || typeof value !== 'string') {
    return value;
  }

  // Keep absolute/protocol/data/hash URLs untouched.
  if (/^(https?:|data:|blob:|mailto:|tel:|#|\/)/i.test(value)) {
    return value;
  }

  const [pathPart, suffix = ''] = value.split(/([?#].*)/);
  const normalizedPath = pathPart.replace(/\\/g, '/').replace(/^\.?\//, '').replace(/^\.\.\//, '').toLowerCase();

  if (localAssetMap[normalizedPath]) {
    return `${localAssetMap[normalizedPath]}${suffix}`;
  }

  const imageOnlyPath = normalizedPath.startsWith('img/') ? normalizedPath.slice(4) : normalizedPath;

  if (localAssetMap[imageOnlyPath]) {
    return `${localAssetMap[imageOnlyPath]}${suffix}`;
  }

  return value;
}

export default function Home({ writeup, writeups = [], onSelectWriteup, onClearSelection }) {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!writeup?.fileUrl) {
      setMarkdown('');
      setLoading(false);
      setLoadError('');
      return undefined;
    }

    if (!Array.isArray(writeups) || writeups.length === 0) {
      setMarkdown('');
      setLoadError('No write-up found in JSON index.');
      setLoading(false);
      return undefined;
    }

    let isMounted = true;

    async function loadWriteup() {
      setLoading(true);
      setLoadError('');

      try {
        const response = await fetch(writeup.fileUrl, { cache: 'no-cache' });

        if (!response.ok) {
          throw new Error(`Failed to load write-up: ${response.status}`);
        }

        const text = await response.text();

        if (isMounted) {
          setMarkdown(text);
          setLoadError('');
        }
      } catch (error) {
        if (isMounted) {
          setMarkdown('');
          setLoadError(error instanceof Error ? error.message : 'Failed to load write-up.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWriteup();

    return () => {
      isMounted = false;
    };
  }, [writeup, writeups]);

  return (
    <section className="home-section" id="home">
      <div className="home-section__copy">
        <div className="home-section__writeups">
          <h3 className="home-section__writeups-title">{writeup?.title || 'WriteUp Titles'}</h3>

          {!writeup ? (
            <div className="home-section__title-list-wrap">
              {writeups.length === 0 ? <p className="home-section__writeups-description">No write-up title found.</p> : null}
              {writeups.length > 0 ? (
                <ul className="home-section__title-list" aria-label="Write-up titles">
                  {writeups.map((entry) => (
                    <li key={entry.id} className="home-section__title-item">
                      <button
                        type="button"
                        className="home-section__title-button"
                        onClick={() => {
                          onSelectWriteup?.(entry.id);
                        }}
                      >
                        {entry.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {writeup ? <button className="home-section__back-button" type="button" onClick={onClearSelection}>Back to all titles</button> : null}

          {writeup && loading ? <p className="home-section__writeups-description">Loading write-up...</p> : null}
          {!loading && loadError ? <p className="home-section__writeups-description">{loadError}</p> : null}
          {writeup && !loading && !loadError ? (
            <div className="home-section__writeups-markdown">
              <ReactMarkdown
                skipHtml={false}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ node, src, ...props }) => (
                    <img
                      {...props}
                      src={resolveLocalAssetUrl(src)}
                      alt={props.alt || 'WriteUp image'}
                      loading="lazy"
                      className="home-section__writeups-image"
                    />
                  ),
                  a: ({ node, href, children, ...props }) => (
                    <a {...props} href={resolveLocalAssetUrl(href)}>
                      {children}
                    </a>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
