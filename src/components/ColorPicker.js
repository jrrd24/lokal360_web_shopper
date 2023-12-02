import React, { useState, useEffect } from "react";
import { SliderPicker } from "react-color";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import theme from "../Theme";

function isValidHexColor(hex) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(hex);
}

function SimpleColorPicker({ control, color }) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const defaultColor = `${theme.palette.primary.main}`;
  const { setValue } = useForm();
  const [background, setBackground] = useState(color);
  const [textFieldValue, setTextFieldValue] = useState(background);
  const [isInvalidHex, setIsInvalidHex] = useState(false);

  useEffect(() => {
    setBackground(color || defaultColor);
    setTextFieldValue(color || defaultColor);
    if (control) {
      setValue("hexColor", color || defaultColor);
    }
  }, [color, defaultColor, setValue]);

  const handleResetColor = () => {
    setBackground(defaultColor);
    setTextFieldValue(defaultColor);
    if (control) {
      setValue("hexColor", defaultColor);
    }
    setIsInvalidHex(false); // Reset invalid flag
  };

  const handleHexColorChange = (newHexColor) => {
    if (isValidHexColor(newHexColor)) {
      setTextFieldValue(newHexColor.slice(0, 7));
      setBackground(newHexColor);
      if (control) {
        setValue("hexColor", newHexColor);
      }
      setIsInvalidHex(false);
    } else {
      setTextFieldValue(defaultColor);
      setBackground(defaultColor);
      if (control) {
        setValue("hexColor", defaultColor);
      }
      setIsInvalidHex(true);
    }
  };

  // Copy text to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textFieldValue);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleCopyToClipboard}
        sx={{
          ...classes.button,
          backgroundColor: background,
          "&:hover": {
            backgroundColor: background, // White with 10% opacity
          },
        }}
      >
        <Typography
          variant="sectionTitleSmallCenter"
          color={"white"} // Change text color for invalid hex
        >
          {background}
          <Typography variant="subtitle1" fontSize={14} pt={1}>
            Click Here to copy Color Hex
          </Typography>
        </Typography>
      </Button>

      <Controller
        name="hexColor"
        control={control}
        defaultValue={textFieldValue}
        rules={{
          pattern: {
            value: hexColorRegex,
            message: "Invalid Hex, Sample Hex Color: #FFFFFF",
          },
          required: "Hex Color is Required. Copy the Default Value from Button",
        }}
        render={({ field, fieldState }) => (
          <TextField
            label="Hex Color"
            value={field.value}
            onChange={(e) => {
              handleHexColorChange(e.target.value);
              field.onChange(e);
            }}
            helperText={
              fieldState.error
                ? fieldState.error.message
                : "Sample Hex Color: #FFFFFF"
            }
            sx={{ my: "16px", width: "100%" }}
            error={!!fieldState.error}
          />
        )}
      />

      <SliderPicker
        color={background}
        onChangeComplete={(newColor) => handleHexColorChange(newColor.hex)}
      />
      <Button variant="outlined" sx={{ mt: 4 }} onClick={handleResetColor}>
        Reset To Default
      </Button>
    </Box>
  );
}

function DisplayColor({ color }) {
  const defaultColor = `${theme.palette.primary.main}`;
  const [background, setBackground] = useState(color || defaultColor);

  useEffect(() => {
    setBackground(color || defaultColor);
  }, [color, defaultColor]);

  return (
    <Box>
      <Box sx={{ ...classes.displayColor, backgroundColor: background }}>
        <Typography
          variant="sectionTitleSmall"
          color={theme.palette.text.contrastText}
        >
          {background}
        </Typography>
      </Box>

      <TextField
        label="Hex Color"
        value={background}
        disabled={true}
        sx={{ my: "16px", width: "100%" }}
      />
    </Box>
  );
}

const classes = {
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s", // Add transition for smooth color change
  },
  displayColor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    borderRadius: 3,
  },
};
export { SimpleColorPicker, DisplayColor };
