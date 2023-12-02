import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useDateRange } from "../../contexts/DateRangeContext";
import theme from "../../Theme";

function DateRangePicker() {
  const { dateRange, setDateRange } = useDateRange(); // Access the context values

  // Update the context with the new date range
  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange.selection);
  };

  // Calculate the current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={[dateRange]}
        maxDate={currentDate}
        rangeColors={[theme.palette.primary.main]}
      />
    </div>
  );
}

export default DateRangePicker;
