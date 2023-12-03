import React from "react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "../../Theme";

function ButtonCloseDialog({ handleClose }) {
  return (
    <IconButton
      onClick={handleClose}
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        border: "solid",
        height: 30,
        width: 30,
        color: `${theme.palette.danger.main}`,
      }}
    >
      <Close />
    </IconButton>
  );
}

export default ButtonCloseDialog;
