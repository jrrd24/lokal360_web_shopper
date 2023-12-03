import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

function ButtonEdit({ handleOpen, sx, disabled }) {
  return (
    <Box sx={{ ...sx }}>
      <Button
        variant="contained"
        startIcon={<Edit />}
        onClick={handleOpen}
        disabled={disabled}
      >
        <Typography
          variant="sectionTitleSmall"
          sx={{ color: "inherit", fontSize: 16 }}
        >
          Edit
        </Typography>
      </Button>
    </Box>
  );
}

export default ButtonEdit;
