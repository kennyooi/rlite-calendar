import React, { useState } from 'react';
import Calendar from '../main/Calendar';
import styles from './DemoCalendarStyle.module.scss';

const DemoCalendarStyle = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  return (
    <section className="section" id={id}>
      <h2>Custom Styles</h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            classPrefix="calendar"
            theme={styles}
            date={date}
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>Example of custom styling.</p>
          <p>Refer to repository's <a href="https://github.com/kennyooi/rlite-calendar/tree/master/demo/src/components/DemoCalendarStyle.js">/demo/src/components/DemoCalendarStyle.js</a> for sample code.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendarStyle;
