import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import DemoCalendar from './components/DemoCalendar';
import DemoCalendarBare from './components/DemoCalendarBare';
import DemoCalendarDisabled from './components/DemoCalendarDisabled';
import DemoDatePicker from './components/DemoDatePicker';
import DemoCalendarInject from './components/DemoCalendarInject';
import DemoCalendarAdvance from './components/DemoCalendarAdvance';
import './App.scss';
import './main/styles/default.scss';

const App = () => {
  const navs = useMemo(() => {
    return [
      {
        id: 'demo',
        name: 'Built-In Styles',
        link: '#demo',
      },
      {
        id: 'bare',
        name: 'Bare Styles',
        link: '#bare',
      },
      {
        id: 'disable',
        name: 'Disable Dates',
        link: '#disable',
      },
      {
        id: 'datepicker',
        name: 'DatePicker',
        link: '#datepicker',
      },
      {
        id: 'slots',
        name: 'Slots',
        link: '#slots',
      },
      {
        id: 'advance',
        name: 'More...',
        link: '#advance',
      },
      {
        id: 'github',
        name: 'Github Page',
        link: 'https://github.com/kennyooi/rlite-calendar/',
      },
    ];
  }, []);

  const [currSpy, setCurrSpy] = useState(navs[0].id);

  // enable scrollspy
  useEffect(() => {
    const $sections = document.querySelectorAll('.section');
    const secs = Array.from($sections).map((node) => ({
      id: node.id,
      offsetY: node.offsetTop,
    }));
    secs.reverse();

    const onScroll = () => {
      const curr = secs.find((sec) => window.scrollY >= sec.offsetY - (16 * 5));
      if (curr) {
        setCurrSpy(curr.id);
      } else {
        setCurrSpy(navs[0].id);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [navs]);

  return (
    <div className="wrap">
      <header className="header">
        <div className="header-wrap">
          <h1>rLite Calendar</h1>
          <h2>Flexible and lightweight React calendar component.</h2>
        </div>
        <a href="https://github.com/kennyooi/rlite-calendar/" className="ver" title="Github Page">
          <img src="https://img.shields.io/github/package-json/v/kennyooi/vlite-calendar?color=blue&style=flat" alt="ver" />
        </a>
      </header>
      <div className="body">
        <div className="body-wrap">
          <nav className="sidebar">
            <ul className="sidebar-wrap" id="ScrollSpy">
              <li>
                <label>DEMO</label>
              </li>
              {navs.map(nav => (
                <li key={nav.id}>
                  <a
                    href={nav.link}
                    className={classNames({
                      __active: nav.id === currSpy
                    })}
                  >
                    {nav.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="content">
            <div className="content-wrap">
              <DemoCalendar id="demo" />
              <DemoCalendarBare id="bare" />
              <DemoCalendarDisabled id="disable" />
              <DemoDatePicker id="datepicker" />
              <DemoCalendarInject id="slots" />
              <DemoCalendarAdvance id="advance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
