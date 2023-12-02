import React from "react";
import { Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function CustomTimePicker({ name, control, value, label, width }) {
  return (
    <Controller
      name={name}
      label={label}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={label}
            showDateInput={false}
            {...field}
            sx={{ width: width }}
          />
        </LocalizationProvider>
      )}
    />
  );
}

function ReadOnlyTimePicker({ value, label, width }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value || "- -"}
        showDateInput={false}
        readOnly
        sx={{ width: width }}
      />
    </LocalizationProvider>
  );
}

export { CustomTimePicker, ReadOnlyTimePicker };
