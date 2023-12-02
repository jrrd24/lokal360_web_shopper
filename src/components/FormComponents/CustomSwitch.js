import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

const CustomSwitch = ({ name, control, label, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              name={name}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default CustomSwitch;
