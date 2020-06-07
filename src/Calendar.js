import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSameDay, isSameMonth, isSameYear, addMonths, startOfDecade, endOfDecade } from 'date-fns/esm';
import { dformat, genWeeks, genDays, genMonths, genYears } from './utils';

const Calendar = ({
  classPrefix,
  theme,
  className,
  date,
  views,
  prepend,
  append,
  weekStart,
  processDate,
  onSelectDay,
  onSelectMonth,
  onSelectYear,
  onChangeView
}) => {
  const [viewDate, setViewDate] = useState(new Date(date.getTime()));
  const [viewType, setViewType] = useState(views[0] || 'days');

  const getClassName = useCallback(suffix => {
    const cn = suffix ? `${classPrefix}-${suffix}` : classPrefix;
    return theme && theme[cn] ? theme[cn] : cn;
  }, [classPrefix, theme]);

  const viewItems = useMemo(() => {
    switch (viewType) {
      case 'years':
        return genYears({
          date: viewDate,
          processProp: processDate,
          appendProp(day) {
            return {
              type: 'year',
              viewDay: viewDate,
              display: dformat(day, 'yyyy'),
              classes: getClassName('year'),
              isCurrent: isSameYear(day, date),
            };
          },
        });

      case 'months':
        return genMonths({
          date: viewDate,
          processProp: processDate,
          appendProp(day) {
            return {
              type: 'month',
              viewDay: viewDate,
              display: dformat(day, 'MMM'),
              classes: getClassName('month'),
              isCurrent: isSameMonth(day, date),
            };
          },
        });

      default:
        const weeks = genWeeks({
          date: viewDate,
          weekStart:weekStart,
          appendProp(day) {
            return {
              type: 'week',
              display: dformat(day, 'iiiiii'),
              classes: getClassName('week'),
              isStatic: true,
            };
          },
        });
        const days = genDays({
          date: viewDate,
          weekStart: weekStart,
          processProp: processDate,
          appendProp(day) {
            return {
              type: 'day',
              display: dformat(day, 'd'),
              classes: getClassName('day'),
              viewDay: viewDate,
              isCurrent: isSameDay(day, date),
            };
          },
        });
        return [weeks].concat(days);
    }
  }, [viewDate, viewType, date, processDate, weekStart, getClassName]);

  const captionDisplay = useMemo(() => {
    switch (viewType) {
      case 'years':
        return [
          dformat(startOfDecade(viewDate), 'yyyy'),
          dformat(endOfDecade(viewDate), 'yyyy'),
        ].join('-');

      case 'months':
        return dformat(viewDate, 'yyyy');

      default:
        return dformat(viewDate, 'MMMM yyyy');
    }
  }, [viewType, viewDate]);

  const switchView = (isUpward = false) => {
    const order = [...views];
    order.sort(); // days, months, years
    const curr = order.indexOf(viewType);
    const next = order[curr + (1 * isUpward ? 1 : -1)];
    if (next) {
      setViewType(next);
      onChangeView(next);
    }
  };

  const handleViewClick = () => {
    switchView(true);
  };

  const handleDateChange = e => {
    let count = 1;
    if (viewType === 'years') {
      count = 12 * 10;
    } else if (viewType === 'months') {
      count = 12;
    }
    const inc = parseInt(e.target.dataset.inc);
    setViewDate(addMonths(viewDate, inc * count));
  };

  const handleClick = rdate => {
    // event
    if (viewType === 'years') {
      onSelectYear({ day: rdate.day, rdate });
    } else if (viewType === 'months') {
      onSelectMonth({ day: rdate.day, rdate });
    } else {
      onSelectDay({ day: rdate.day, rdate });
    }
    setViewDate(rdate.day);
    switchView();
  };

  return (
    <div className={classNames(getClassName(), className)}>
      {prepend}
      <header className={getClassName('header')}>
        <nav className={getClassName('row')}>
          <div
            className={getClassName('caption')}
            onClick={handleViewClick}
          >
            {captionDisplay}
          </div>
          <div
            className={getClassName('prev')}
            data-inc="-1"
            onClick={handleDateChange}
          >
            &lt;
          </div>
          <div
            className={getClassName('next')}
            data-inc="1"
            onClick={handleDateChange}
          >
            &gt;
          </div>
        </nav>
      </header>
      <div
        key={viewType}
        className={getClassName('body')}
      >
        {viewItems.map((items, row) => (
          <div
            key={row}
            className={getClassName('row')}
          >
            {items.map(item => (
              <div
                key={item.key}
                className={classNames(item.classes, {
                  [`${classPrefix}--out`]: item.isOut,
                  [`${classPrefix}--today`]: item.isToday,
                  [`${classPrefix}--current`]: item.isCurrent,
                  [`${classPrefix}--invalid`]: item.isInvalid,
                })}
                onClick={!item.isStatic ? () => handleClick(item) : null}
              >
                <span>{item.display}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {append}
    </div>
  );
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  classPrefix: PropTypes.string,
  theme: PropTypes.object,
  weekStart: PropTypes.number,
  views: PropTypes.array,
  prepend: PropTypes.node,
  append: PropTypes.node,
  processDate: PropTypes.func,
  onSelectDay: PropTypes.func,
  onSelectMonth: PropTypes.func,
  onSelectYear: PropTypes.func,
  onChangeView: PropTypes.func,
};

Calendar.defaultProps = {
  date: new Date(),
  classPrefix: 'rl-calendar',
  theme: {},
  weekStart: 0,
  views: ['days', 'months', 'years'],
  prepend: null,
  append: null,
  processDate: d => d,
  onSelectDay: () => false,
  onSelectMonth: () => false,
  onSelectYear: () => false,
  onChangeView: () => false,
};

export default Calendar;
