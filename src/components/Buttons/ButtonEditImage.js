import React from "react";
import { Button, Typography } from "@mui/material";
import { Cancel, Edit } from "@mui/icons-material";

function ButtonEditImage({ showEditImage, editImage }) {
  return (
    <Button
      variant="outlined"
      color={editImage ? "error" : "primary"}
      startIcon={editImage ? <Cancel /> : <Edit />}
      onClick={() => {
        editImage ? showEditImage(false) : showEditImage(true);
      }}
    >
      <Typography
        variant="sectionTitleSmall"
        sx={{ color: "inherit", fontSize: 16 }}
      >
        {editImage ? "Cancel" : "Edit Image"}
      </Typography>
    </Button>
  );
}

export default ButtonEditImage;
