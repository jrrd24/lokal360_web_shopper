import React from "react";
import { Controller } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";

function CustomPhoneNumberPicker({
  name,
  control,
  label,
  rules,
  defaultValue,
  trigger,
  disabled,
  width,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <div style={{ width: width }}>
          <MuiTelInput
            fullWidth
            label={label}
            value={field.value}
            onChange={(value) => {
              const formattedValue = value.replace(/\s/g, ""); // Remove spaces
              const newValue = formattedValue.slice(0, 13); // Limit to 13 digits
              field.onChange(newValue);
              trigger(name); // Manually trigger validation
            }}
            onlyCountries={["PH"]}
            disabled={disabled}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ""}
          />
        </div>
      )}
    />
  );
}

function ReadOnlyPhoneNumberPicker({ value, label, width }) {
  return (
    <div style={{ width: width }}>
      <MuiTelInput
        label={label}
        value={value}
        onlyCountries={["PH"]}
        disabled
      />
    </div>
  );
}

export { CustomPhoneNumberPicker, ReadOnlyPhoneNumberPicker };
