import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox, FormGroup, Grid } from "@mui/material";

function CheckBoxGroup({ name, control, label, choices, width, setValue }) {
  useEffect(() => {
    // Update the value of the checkboxes when choices change
    setValue(name, choices);
  }, [name, setValue, choices]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={choices}
      render={({ field }) => (
        <FormGroup style={{ width: width }}>
          <p>{label}</p>
          <Grid container spacing={0}>
            {Object.keys(field.value).map((choice) => (
              <Grid key={choice} item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={name}
                      checked={field.value[choice]}
                      onChange={(e) => {
                        const updatedDays = {
                          ...field.value,
                          [choice]: e.target.checked,
                        };
                        field.onChange(updatedDays);
                      }}
                    />
                  }
                  label={choice}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      )}
    />
  );
}

export default CheckBoxGroup;
