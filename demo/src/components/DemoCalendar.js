import React, { useState } from 'react';
import Calendar from '../main/Calendar';
import CodeHighlight from './CodeHighlight';

const DemoCalendar = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  return (
    <section className="section" id={id}>
      <h2>Built-In Styles</h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            date={date}
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>By default, the component <b>DOES NOT</b> come with any styles dependency or inline styling, it's intentionally so that you can easily to style it your own to suit your website design.</p>
          <p>However, you can use the built-in styles directly if you want to.</p>
          <CodeHighlight lang="js">
            {`
import 'rlite-calendar/dist/rlite-calendar-style.min.css';
            `.trim()}
          </CodeHighlight>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendar;
