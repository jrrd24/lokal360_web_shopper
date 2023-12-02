/*
* CUSTOM INPUT
* Contains the ff: CustomInput, ReadOnlyCustomInput, and CustomNumberInput
?       CustomInput: for any textfields or select (comboBox) in a form, also includes textfields with
?                    icon adornments, and multiline textFields
?       ReadOnlyCustomInput: display read-only information in textFields
?       CustomNumberInput: for textfields with Number/ Currency Inputs
* Reason for separating CustomInput and CustomNumberInput:
*       To avoid making CustomInput too complicated with extra conditional statements and props.
*       Also since NumericFormat is used instead of Text Field
*/

import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  IconButton,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { NumericFormat } from "react-number-format";

const CustomInput = ({
  control,
  name,
  rules = {},
  label,
  secureTextEntry,
  sx,
  width,
  multiline,
  select,
  selectMenuItems,
  value: propValue,
  setPromoType,
  component: icon,
  setSelectedValue,
}) => {
  const [viewPass, setViewPass] = useState(true);
  const [fieldValue, setFieldValue] = useState("");

  const handleValueChange = (e, field) => {
    const selectedValue = e.target.value;
    field.onChange(selectedValue); 
    setFieldValue(selectedValue); 
    if (setSelectedValue) {
      setSelectedValue(selectedValue); 
    }
  };

  useEffect(() => {
    if (setPromoType) {
      setPromoType(fieldValue);
    }
  }, [fieldValue, setPromoType]);

  // Set 'fieldValue' to 'propValue' if it's defined
  useEffect(() => {
    setFieldValue(propValue || "");
  }, [propValue]);

  const handleTogglePassword = () => {
    setViewPass(!viewPass);
  };

  // Check if selectMenuItems is not empty
  const hasOptions = selectMenuItems && selectMenuItems.length > 0;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={propValue || ""}
      type=""
      render={({ field, fieldState }) => (
        <TextField
          name={name}
          label={label}
          type={secureTextEntry ? (viewPass ? "password" : "text") : "text"}
          value={fieldValue}
          onChange={(e) => handleValueChange(e, field)}
          onBlur={field.onBlur}
          variant={"outlined"}
          multiline={multiline}
          rows={multiline ? 4 : undefined}
          select={select}
          size={"medium"}
          InputProps={{
            ...(secureTextEntry && {
              endAdornment: (
                <IconButton onClick={handleTogglePassword} edge="end">
                  {viewPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }),
            ...(icon
              ? {
                  startAdornment: (
                    <Box sx={{ pt: "4px" }}>
                      <InputAdornment position="start">
                        {React.createElement(icon, { sx: { fontSize: 20 } })}
                      </InputAdornment>
                    </Box>
                  ),
                  readOnly: false,
                }
              : {}),
          }}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ""}
          sx={{ ...sx, width: width }}
        >
          {hasOptions ? (
            // Render menu items if there are options available
            selectMenuItems.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                id={option.value}
              >
                {option.label}
              </MenuItem>
            ))
          ) : (
            // Show if there are no options
            <MenuItem key="1" value="1" disabled>
              No options available
            </MenuItem>
          )}
        </TextField>
      )}
    />
  );
};

const ReadOnlyCustomInput = ({
  name,
  label,
  defaultValue,
  width,
  multiline,
  sx,
  disabled,
  component: Icon,
  select,
  selectMenuItems,
}) => {
  if (select) {
    return (
      <TextField
        key={name}
        name={name}
        disabled={disabled}
        label={label}
        variant="outlined"
        select
        value={
          defaultValue ||
          (selectMenuItems.length > 0 ? selectMenuItems[0]?.id : "")
        }
        InputProps={
          Icon
            ? {
                startAdornment: (
                  <Box>
                    <InputAdornment position="start">
                      <Icon sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  </Box>
                ),
                readOnly: true,
              }
            : { readOnly: true }
        }
        sx={{
          width: width,
          ...sx,
        }}
      >
        {selectMenuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  return (
    <TextField
      key={name}
      name={name}
      disabled={disabled}
      label={label}
      variant="outlined"
      value={defaultValue || "- -"}
      multiline={multiline}
      maxRows={multiline ? 4 : undefined}
      InputProps={
        Icon
          ? {
              startAdornment: (
                <Box>
                  <InputAdornment position="start">
                    <Icon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                </Box>
              ),
              readOnly: true,
            }
          : { readOnly: true }
      }
      sx={{
        width: width,
        "& .MuiFilledInput-input": {
          paddingTop: multiline ? "8px" : "30px",
        },
        ...sx,
      }}
    />
  );
};

const CustomNumberInput = ({
  sx,
  control,
  name,
  rules,
  value: propValue,
  label,
  width,
  type,
  disabled,
  pesoInput,
}) => {
  const [fieldValue, setFieldValue] = useState(0);
  useEffect(() => {
    type === 2 ? setFieldValue(propValue * 100) : setFieldValue(propValue || 0);
  }, [propValue, type]);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={propValue}
      render={({ field, fieldState }) => (
        <NumericFormat
          name={name}
          label={label}
          customInput={TextField}
          displayType="input"
          thousandSeparator={true}
          value={fieldValue}
          onValueChange={(values) => {
            const { value } = values;
            field.onChange({
              target: {
                name: name,
                value: value,
              },
            });
          }}
          onBlur={field.onBlur}
          variant="outlined"
          size="medium"
          disabled={disabled}
          allowNegative={false} // Optional: Prevent negative values
          InputProps={{
            startAdornment:
              type === 1 || type === 3 || pesoInput ? (
                <InputAdornment position="start">₱</InputAdornment>
              ) : (
                ""
              ),
            endAdornment:
              type === 2 ? (
                <InputAdornment position="start">%</InputAdornment>
              ) : (
                ""
              ),
          }}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ""}
          sx={{ ...sx, width: width }}
        />
      )}
    />
  );
};

export { CustomInput, ReadOnlyCustomInput, CustomNumberInput };
