import React, { useState } from 'react';
import { isBefore, isAfter } from 'date-fns';
import Calendar from '../main/Calendar';
import CodeHighlight from './CodeHighlight';

const DemoCalendarDisabled = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  const handleProcessDate = rdate => {
    const today = new Date();
    const min = new Date(today);
    const max = new Date(today);
    max.setDate(max.getDate() + 7);

    if (isBefore(rdate.day, min)) {
      rdate.isInvalid = true;
    }
    else if (isAfter(rdate.day, max)) {
      rdate.isInvalid = true;
    }
    return rdate;
  };

  return (
    <section className="section" id={id}>
      <h2>Disable Dates <small>(Min / Max / Group)</small></h2>
      <div className="section-body">
        <div className="section-showcase">
          <Calendar
            date={date}
            processDate={handleProcessDate}
            onSelectDay={handleSelectDay}
          />
        </div>
        <div className="section-desc">
          <p>In term of flexibility, the component doesn't come with built-in disabled dates checking, such as min, max or group of disabled dates.</p>
          <p>Yet, it will let you to handle them through <code>processDate</code> prop so that you will have better control of it.</p>
          <CodeHighlight lang="html">
            {`
<Calendar
  ...
  processDate="handleProcessDate"
/>
            `.trim()}
          </CodeHighlight>
          <CodeHighlight lang="js">
            {`
handleProcessDate(rdate) {
  // example of min & max implementation
  const today = new Date();
  const min = new Date(today);
  const max = new Date(today);
  max.setDate(max.getDate() + 7);

  // isBefore is date-fns method
  if (isBefore(rdate.day, min)) {
    rdate.isInvalid = true;
  }
  // isAfter is date-fns method
  else if (isAfter(rdate.day, max)) {
    rdate.isInvalid = true;
  }
  // or other disabled dates checking
  // ...

  // remember to return the final rdate object
  return rdate;
},
            `.trim()}
          </CodeHighlight>
          <p>Read the <a href="https://github.com/kennyooi/rlite-calendar#rdate-object-guide">Documentation</a> for more information of <code>rdate</code> object.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoCalendarDisabled;
