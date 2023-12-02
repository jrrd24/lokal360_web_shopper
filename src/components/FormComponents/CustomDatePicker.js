import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = ({
  name,
  control,
  label,
  width,
  rules,
  value: propValue,
  startDateValue,
  disableFutureDates,
  disablePastDates,
  customValidation,
  customErrorMessage,
  allowNull,
}) => {
  const [error, setError] = React.useState(null);
  const today = dayjs();
  const todayFormat = today.format("MM/DD/YYYY");

  const [fieldValue, setFieldValue] = useState(null);
  useEffect(() => {
    if (propValue === null || propValue === undefined) {
      setFieldValue(null);
    } else {
      setFieldValue(dayjs(propValue));
    }
  }, [propValue]);

  // DATE VALIDATION
  useEffect(() => {
    const isValidDate = fieldValue ? fieldValue.isValid() : allowNull;
    const isValidCustomRule = customValidation
      ? customValidation(fieldValue)
      : true;

    if (!allowNull && fieldValue === null) {
      setError("Date is required");
    } else if (!isValidDate || !isValidCustomRule) {
      setError(customErrorMessage || "Invalid Date");
    } else if (
      disablePastDates &&
      fieldValue &&
      fieldValue.isBefore(today, "day")
    ) {
      setError("Date must be today or in the future");
    } else if (
      disableFutureDates &&
      fieldValue &&
      fieldValue.isAfter(today, "day")
    ) {
      setError("Date must be today or in the past");
    } else if (
      startDateValue &&
      fieldValue &&
      fieldValue.isBefore(startDateValue)
    ) {
      setError("End Date must be after Start Date");
    } else {
      setError(null);
    }
  }, [
    startDateValue,
    fieldValue,
    disablePastDates,
    disableFutureDates,
    customValidation,
    allowNull,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs(propValue) || today}
        rules={rules}
        render={({ field, fieldState }) => {
          const handleError = (newError) => {
            setError(newError);
          };

          return (
            <DatePicker
              value={fieldValue}
              label={label}
              onChange={(date) => {
                setFieldValue(date);
                field.onChange(date);
              }}
              sx={{ width: width }}
              minDate={disablePastDates ? today : null} // Set minDate based on disableFutureDates prop
              maxDate={disableFutureDates ? today : null} // Set maxDate based on disablePastDates prop
              onError={handleError}
              slotProps={{
                textField: {
                  error: !!fieldState.error || error,
                  helperText: fieldState.error
                    ? fieldState.error.message
                    : error
                    ? error
                    : "",
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
