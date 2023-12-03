import React from "react";
import { Save } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

function ButtonSave({ onClick, sx, type, isDirty, btnSx }) {
  return (
    <Box sx={{ ...sx }}>
      <Button
        type={type}
        variant="contained"
        startIcon={<Save />}
        onClick={onClick}
        disabled={!isDirty}
        sx={{ ...btnSx }}
      >
        <Typography
          variant="sectionTitleSmall"
          sx={{ color: "inherit", fontSize: 16 }}
        >
          Save
        </Typography>
      </Button>
    </Box>
  );
}

export default ButtonSave;
