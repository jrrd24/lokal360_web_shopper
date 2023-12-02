/* 
 * GET DATE
 *    USE:   Get date is used for getting the current day, week, month, or year
 *    It has 6 functions:
 ?      GET DATE = current date
 ?      GET WEEK FIRST DAY
 ?      GET WEEK LAST DAY
 ?      GET MONTH FIRST DAY
 ?      GET MONTH LAST DAY
 ?      GET YEAR FIRST DAY
 ?      GET YEAR LAST DAY
 *    NOTE: all functions are only used in "src/contexts/DateContext.js"
*/

export function GetDate() {
  const currentDate = new Date();

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(currentDate.getDate());
  let month = addZero(currentDate.getMonth() + 1);
  let year = currentDate.getFullYear();

  let format = year + "-" + month + "-" + day;
  return format;
}

export function GetWeekFirstDay() {
  const currentDate = new Date();

  const firstDay = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(firstDay.getDate());
  let month = addZero(firstDay.getMonth() + 1);
  let year = firstDay.getFullYear();

  let format = year + "-" + month + "-" + day;

  return format;
}

export function GetWeekLastDay() {
  const currentDate = new Date();

  const lastDay = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
  );

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(lastDay.getDate());
  let month = addZero(lastDay.getMonth() + 1);
  let year = lastDay.getFullYear();

  let format = year + "-" + month + "-" + day;

  return format;
}

export function GetMonthFirstDay() {
  const currentDate = new Date();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(firstDay.getDate());
  let month = addZero(firstDay.getMonth() + 1);
  let year = firstDay.getFullYear();

  let format = year + "-" + month + "-" + day;

  return format;
}

export function GetMonthLastDay() {
  const currentDate = new Date();

  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(lastDay.getDate());
  let month = addZero(lastDay.getMonth() + 2);
  let year = lastDay.getFullYear();

  let format = year + "-" + month + "-" + day;

  return format;
}

export function GetYearFirstDay() {
  const currentDate = new Date();

  const firstDay = new Date(currentDate.getFullYear(), 1, 1);

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(firstDay.getDate());
  let month = addZero(firstDay.getMonth());
  let year = firstDay.getFullYear();

  let format = year + "-" + month + "-" + day;

  return format;
}

export function GetYearLastDay() {
  const currentDate = new Date();

  const lastDay = new Date(currentDate.getFullYear(), 0, 0);

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let day = addZero(lastDay.getDate());
  let month = addZero(lastDay.getMonth() + 1);
  let year = lastDay.getFullYear() + 1;

  let format = year + "-" + month + "-" + day;
  return format;
}
