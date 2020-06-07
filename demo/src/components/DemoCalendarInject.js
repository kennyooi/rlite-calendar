import React, { useState } from 'react';
import Calendar from '../main/Calendar';
import CodeHighlight from './CodeHighlight';
import styles from './DemoCalendarInject.module.scss';

const DemoCalendarInject = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  const handleSetDay = inc => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + inc);
    setDate(newDate);
  };

  return (
    <section className="section" id={id}>
      <h2>Custom DOM Injection <small>(Vue Slots)</small></h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            date={date}
            prepend={(
              <div className={styles.prepend}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleSetDay(0)}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleSetDay(1)}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleSetDay(7)}
                >
                  Next Week
                </button>
              </div>
            )}
            append={(
              <div className={styles.append}>
                <span>Selected date: </span>
                <b>{date.toLocaleString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</b>
              </div>
            )}
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>You can inject custom DOM into the component through <code>prepend</code> and <code>append</code> props.</p>
          <CodeHighlight lang="html">
            {`
import 'rlite-calendar/dist/rlite-calendar-style.min.css';
            `.trim()}
          </CodeHighlight>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendarInject;
