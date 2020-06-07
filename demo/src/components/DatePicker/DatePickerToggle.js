import React, { useState, useMemo } from 'react';
import Calendar from '../../main/Calendar';
import styles from './DatePickerToggle.module.scss';

const DatePickerToggle = ({ value, onChange }) => {
  const [isShow, setIsShow] = useState(false);

  const displayValue = useMemo(() => {
    return value.toLocaleString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
  }, [value]);

  const handleSelect = ({ day }) => {
    setIsShow(false);
    onChange({ day });
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.toggler}
        onClick={() =>setIsShow(true)}
      >
        <span>{displayValue}</span>
        <svg width="24" height="24" viewBox="0 0 139 139" fill="#aaa"><path d="M113.8 22.9h-13.51v-5.4c0-3.22-2.64-5.85-5.85-5.85s-5.84 2.63-5.84 5.85v5.4H50.4v-5.4c0-3.22-2.62-5.85-5.84-5.85s-5.84 2.63-5.84 5.85v5.4H25.2c-5.53 0-10.03 4.5-10.03 10.04v74.12c0 5.53 4.5 10.04 10.03 10.04h79.63c10.48 0 19-8.53 19-19V32.94c0-5.53-4.5-10.03-10.03-10.03zm-88.6 8h13.52a5.86 5.86 0 005.84 5.7 5.86 5.86 0 005.84-5.7h38.2c.08 3.15 2.67 5.7 5.84 5.7s5.76-2.55 5.84-5.7h13.52c1.1 0 2.03.94 2.03 2.04v15.62H23.17V32.94c0-1.1.93-2.03 2.03-2.03zm-2.03 76.16V56.44h92.66V91.5H99.5l-.12 17.6H25.2c-1.1 0-2.03-.94-2.03-2.04zm84.2 1.73l.06-9.29h8.3a11.01 11.01 0 01-8.36 9.29z"/><path d="M46.5 75.32c.03-3.67 1.34-6.34 3.44-8.13 2.1-1.75 4.95-2.6 8.04-2.6 8 0 10.65 5.37 10.65 8 0 6.53-3.65 6.53-3.65 6.66v.1c0 .35 4.52.35 4.52 7.27 0 3.8-2.54 9.79-11.57 9.79-12.4 0-12.43-9.83-12.23-12.15h7.52c-.04 1.65.32 2.9 1.07 3.7.75 1.03 1.9 1.4 3.29 1.4 2.25 0 3.68-.95 3.68-3.5 0-2.72-1.86-3.21-3.68-3.21-1.15 0-1.7.13-2.3.22V76.8c.6.05 1.23.18 2.3.18 1.66 0 3.76-.4 3.76-2.8 0-1.98-1.98-2.74-3.6-2.74-2.14 0-3.89 1.3-3.8 3.9h-7.45zM81.26 78.14h-6.45V71.7c4 .1 7.96-1.6 8.2-6.75h6.49v31.1h-8.24V78.14z"/></svg>
      </div>
      {isShow && (
        <div className={styles.popup}>
          <div
            className={styles.popup_overlay}
            onClick={() => setIsShow(false)}
          />
          <Calendar
            className={styles.calendar}
            date={value}
            onSelectDay={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerToggle;
