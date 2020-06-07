import React, { useState } from 'react';
import Calendar from '../main/Calendar';
import CodeHighlight from './CodeHighlight';
import './DemoCalendarBare.scss';

const DemoCalendarBare = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  return (
    <section className="section" id={id}>
      <h2>Bare Component <small>(with minimal styling)</small></h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            date={date}
            classPrefix="rl-bare"
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>In most case, you might want to have your own theme of styling, below are the basic styling setup for you to start with.</p>
          <CodeHighlight lang="css">
            {`
.rl-calendar {
  width: 100%;
  text-align: center;
}
.rl-calendar-row {
  display: flex;
}
.rl-calendar-row > * {
  flex: 1;
}
            `.trim()}
          </CodeHighlight>
          <p>Read the <a href="https://github.com/kennyooi/rlite-calendar#styles-guide">Styles Guide</a> for more information.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendarBare;
