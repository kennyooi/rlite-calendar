# rLite Calendar

A simple and lightweight, yet flexible calendar component for **React 16.x**, with:
- no styles dependency or inline styles
- using browser locale
- date-fns/esm (calculation methods only)

The intention of this component is to allow you to style your own calendar to suit your website design. See [Styles Guide](#styles-guide) for more detail.

## Demo
See [Demo Page](https://kennyooi.github.io/rlite-calendar/) for more example.

## Get Started
### Installation
As usual, install the calendar component NPM package.
```bash
npm install rlite-calendar --save
```

Next, include the calendar component in your own component.
```js
import React, { useState } from 'react';
import Calendar from 'rlite-calendar';

const Sample = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      ...
      <Calendar
        date={date}
        onSelectDay={({ day }) => setDate(day)}
      />
    </div>
  );
}
```

Check out [Props Guide](#props-guide) for component available props. 

## Props Guide
| Prop | Type | Default | Description |
|--|--|--|--|
| classPrefix | String | rl-calendar | Calendar CSS class prefix. |
| date | Date | new Date() | Calendar selected date. |
| processDate | Function | | Post-processing the final content of rendered date. <br>See [`rdate` Object Guide](#rdate-object-guide) for more detail. |
| theme | Object | | Styles object of CSS module, see [CSS Module](#css-module) for more detail. |
| views | Array | ['days', 'months', 'years'] | Enable different view mode on the calendar. <br>*First item will used as default view. |
| weekStart | Number | 0 | The first day of the week (0-Sunday) |
| prepend | Node | | Custom node content to add before the calendar |
| append | Node | | Custom node content to add after the calendar |

Example code.
```html
<Calendar
  date={date}
  views={['days']}
  weekStart={1}
  processDate={handleProcessDate}
  append={<div>This will appear before the calendar</div>}
  prepend={<div>This will appear after the calendar</div>}
/>
```

## Events Guide
| Event | Params | Description |
|--|--|--|
| onChangeView | (newView) | View mode changed. |
| onSelectDay | ({ day, rdate }) | A day has been selected. |
| onSelectMonth | ({ day, rdate }) | A month has been selected. The `day` indicate the first day of the selected month. |
| onSelectYear | ({ day, vdate }) | A year has been selected. The `day` indicate the first day of the selected year. |

Example usage.
```js
import React, { useState } from 'react';
import Calendar from 'rlite-calendar';

const Sample = () => {
  const [date, setDate] = useState(new Date());

  const handleSelectDay = ({ day }) => {
    setDate(day);
  };

  return (
    <div>
      ...
      <Calendar
        date={date}
        onSelectDay={handleSelectDay}
      />
    </div>
  );
}
```

## `rdate` Object Guide
`rdate` object is used by component internally for handling what to render on each calendar days, months, and years. However, you can overwrite it through `processDate` prop. 

| Prop | Type | Description |
|--|--|--|
| day | Date | Current date in JS Date object |
| key | Timestamp | Current date in timestamp |
| type | String | Current content type - day, month, or year |
| display | String | Display content for current date |
| classes | String | Injected CSS classes |
| isToday | Boolean | Is current date today? |
| isCurrent | Boolean | Is current date same as calendar selected date? |
| isInvalid | Boolean | Is current date disabled? |
| isOut | Boolean | Is current date out of calendar month? |

Example usage.
```js
import React, { useState } from 'react';
import Calendar from 'rlite-calendar';

const Sample = () => {
  const [date, setDate] = useState(new Date());

  const handleProcessDate = (rdate) => {
    // perform some checking
    // console.log(rdate.day)
    // rdate.isInvalid = true;
    // ...

    // remember to return back the rdate object
    return rdate;
  };

  return (
    <div>
      ...
      <Calendar
        date={date}
        onSelectDay={({ day }) => setDate(day)}
        processDate={handleProcessDate}
      />
    </div>
  );
}
```

## Styles Guide
This component is intentionally for custom calendar theme styling. Hence all CSS classes used within the component are auto-prefixed with `rl-calendar` (can be overwrite through component `classPrefix` prop).

| CSS class | Description |
|--|--|
| `.{classPrefix}` | Calendar root |
| `.{classPrefix}-row` | Row wrap of calendar |
| `.{classPrefix}-caption` | Calendar view label |
| `.{classPrefix}-prev` | Calendar '<' button |
| `.{classPrefix}-next` | Calendar '>' button |
| `.{classPrefix}-week` | Week content |
| `.{classPrefix}-day` | Day content |
| `.{classPrefix}-month` | Month content |
| `.{classPrefix}-year` | Year content |
| `.{classPrefix}--out` | State indicator, content is outside of viewing month |
| `.{classPrefix}--today` | State indicator, content is today |
| `.{classPrefix}--current` | State indicator, content is same as selected date |
| `.{classPrefix}--invalid` | State indicator, content is disabled |

However, you are free to use the built-in styling if you want (this only work with default `classPrefix`).
```js
import 'rlite-calendar/dist/rlite-calendar.min.css';
```

## CSS Module
If you prefer of using CSS module for styling, you can pass in your CSS module object through component `theme` prop.

```js
import React, { useState } from 'react';
import Calendar from 'rlite-calendar';
import calendarStyles from './calendar.module.css';
// you can use other CSS preprocessor also
// import calendarStyles from './calendar.module.scss';
// import calendarStyles from './calendar.module.less';

const Sample = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      ...
      <Calendar
        date={date}
        onSelectDay={({ day }) => setDate(day)}
        classPrefix="calendar"
        theme={calendarStyles}
      />
    </div>
  );
}
```

Example of `calendar.module.css`
```css
.calendar{
  width: 100%;
  text-align: center;
}
.calendar-row{
  display: flex;
}
.calendar-row > *{
  flex: 1;
}
```

## Change Log

Change logs can be found at [CHANGELOG.md](https://github.com/kennyooi/rlite-calendar/blob/master/CHANGELOG.md)

## License

[MIT](https://github.com/kennyooi/rlite-calendar/blob/master/LICENSE)
