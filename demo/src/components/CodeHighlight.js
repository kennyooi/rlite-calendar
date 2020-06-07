import React, { useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import js from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import 'highlight.js/styles/github.css';

const CodeHighlight = ({ lang, children }) => {
  const el = useRef(null);

  useEffect(() => {
    if (lang === 'js') {
      hljs.registerLanguage('javascript', js);
    } else if (lang === 'css') {
      hljs.registerLanguage('css', css);
    } else if (lang === 'html') {
      hljs.registerLanguage('xml', xml);
    } else if (lang === 'scss') {
      hljs.registerLanguage('scss', scss);
    }
    hljs.highlightBlock(el.current);
  }, [lang]);

  return (
    <pre>
      <code ref={el} className={lang}>
        {children}
      </code>
    </pre>
  );
};

export default CodeHighlight;
