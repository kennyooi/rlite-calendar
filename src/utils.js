import {
  getTime,
  startOfDecade, endOfDecade,
  startOfYear, endOfYear,
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  isToday, isSameMonth, isBefore, isAfter,
  addDays, addYears,
  eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachYearOfInterval,
} from 'date-fns/esm';

/**
 * Date formatter
 * - depending on native toLocaleString
 * - *DID NOT rely on date-fns formatter as the library pack size was much larger
 *
 * @param date - date object
 * @param format - output format
 *
 * return string
 */
export function dformat(date, format) {
  let opt = {};
  if (format === 'yyyy') {
    opt = { year: 'numeric' };
  } else if (format === 'MMMM yyyy') {
    opt = { year: 'numeric', month: 'long' };
  } else if (format === 'MMM') {
    opt = { month: 'short' };
  } else if (format === 'iiiiii') {
    opt = { weekday: 'short' };
  } else if (format === 'd') {
    opt = { day: 'numeric' };
  }
  return date.toLocaleString(undefined, opt);
}

/**
 * Generate calendar weeks array
 *
 * @param date - viewing date
 * @param weekStart - first day of the week
 * @param appendProp - append additional props into object
 *
 * return array
 */
export function genWeeks({ date, weekStart, appendProp }) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: weekStart }),
    end: endOfWeek(date, { weekStartsOn: weekStart }),
  }).map(day => ({
    day,
    key: getTime(day),
    ...appendProp(day),
  }));
}

/**
 * Generate calendar days array
 *
 * @param date - viewing date
 * @param weekStart - first day of the week
 * @param appendProp - append additional props into object
 * @param processProp - process returned object
 *
 * return multi-dimension array - 6x7
 */
export function genDays({ date, weekStart, appendProp, processProp }) {
  const monthWeeks = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }, { weekStartsOn: weekStart });
  // always show 6 weeks per month
  for (let i = monthWeeks.length; i < 6; i += 1) {
    monthWeeks.push(addDays(monthWeeks[i - 1], 7));
  }

  return monthWeeks.map(weekFirst => eachDayOfInterval({
    start: startOfWeek(weekFirst, { weekStartsOn: weekStart }),
    end: endOfWeek(weekFirst, { weekStartsOn: weekStart }),
  }).map(day => processProp({
    day,
    key: getTime(day),
    isToday: isToday(day),
    isOut: !isSameMonth(day, date),
    ...appendProp(day),
  })));
}

/**
 * Generate calendar months array
 *
 * @param date - viewing date
 * @param appendProp - append additional props into object
 * @param processProp - process returned object
 *
 * return multi-dimension array - 4x4
 */
export function genMonths({ date, appendProp, processProp }) {
  const dataset = eachMonthOfInterval({
    start: startOfYear(date),
    end: endOfYear(date),
  });
  return dataset.reduce((acc, day, index) => {
    const group = Math.floor(index / 4);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(processProp({
      day,
      key: day.getTime(),
      ...appendProp(day),
    }));
    return acc;
  }, []);
}

/**
 * Generate calendar years array
 *
 * @param date - viewing date
 * @param appendProp - append additional props into object
 * @param processProp - process returned object
 *
 * return multi-dimension array - 4x4
 */
export function genYears({ date, appendProp, processProp }) {
  const decadeStart = startOfDecade(date);
  const decadeEnd = endOfDecade(date);
  const dataset = eachYearOfInterval({
    start: addYears(decadeStart, -1),
    end: addYears(decadeEnd, 1),
  });
  return dataset.reduce((acc, day, index) => {
    const group = Math.floor(index / 4);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(processProp({
      day,
      key: getTime(day),
      isOut: isBefore(day, decadeStart) || isAfter(day, decadeEnd),
      ...appendProp(day),
    }));
    return acc;
  }, []);
}
