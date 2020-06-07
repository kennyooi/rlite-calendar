import React, { useState } from 'react';
import DatePickerInput from './DatePicker/DatePickerInput';
import DatePickerToggle from './DatePicker/DatePickerToggle';

const DemoDatePicker = ({ id }) => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => setDate(day);

  return (
    <section className="section" id={id}>
      <h2>DatePicker <small>(build your own)</small></h2>
      <div className="section-body">
        <div className="section-showcase">
          <div style={{ margin: '1.5rem 0' }}>
            <DatePickerInput
              value={date}
              onChange={handleSelectDay}
            />
          </div>
          <div style={{ margin: '1.5rem 0' }}>
            <DatePickerToggle
              value={date}
              onChange={handleSelectDay}
            />
          </div>
        </div>
        <div className="section-desc">
          <p>Again, to keep the component lightweight, flexible and customizable, it <b>DOES NOT</b> include any <code>&lt;input&gt;</code> tag or events for datepicker input.</p>
          <p>However, you can easily build your own datepicker component with desired styling and behavior.</p>
          <p>Refer to repository's folder <a href="https://github.com/kennyooi/rlite-calendar/tree/master/demo/src/components/DatePicker">/demo/src/components/DatePicker/</a> for sample code.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoDatePicker;
