import React, { useState } from 'react';
import { isWeekend, isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns';
import Calendar from '../main/Calendar';
import styles from './DemoCalendarAdvance.module.scss';

const DemoCalendarAdvance = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  const handleProcessDate = rdate => {
    const newDate = { ...rdate };
    if (newDate.type === 'day') {
      if (isWeekend(newDate.day)) {
        newDate.classes += ' ' + styles.weekend;
      }
      if (isFirstDayOfMonth(newDate.day)) {
        newDate.display = 'Fi';
      } else if (isLastDayOfMonth(newDate.day)) {
        newDate.display = 'La';
      }
    }
    return newDate;
  };

  return (
    <section className="section" id={id}>
      <h2>More Customization...</h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            date={date}
            views={['days']}
            weekStart={1}
            processDate={handleProcessDate}
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>Other than setting the disabled dates, you can modify the <code>date</code> object property through <code>processDate</code> method, like injecting custom CSS class on certain date, changing the display name, and etc.</p>
        <p>Read the <a href="https://github.com/kennyooi/rlite-calendar#rdate-object-guide">Documentation</a> for more information of <code>rdate</code> object.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendarAdvance;
