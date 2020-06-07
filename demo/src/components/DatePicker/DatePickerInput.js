import React, { useState, useMemo } from 'react';
import Calendar from '../../main/Calendar';
import styles from './DatePickerInput.module.scss';

const DatePickerInput = ({ value, onChange }) => {
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
      <input
        type="text"
        className={styles.input}
        value={displayValue}
        onFocus={() => setIsShow(true)}
        readOnly
      />
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

export default DatePickerInput;
