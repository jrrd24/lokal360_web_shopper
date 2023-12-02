import React from "react";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import theme from "../../Theme";

function DeleteDialog({
  openDelete,
  handleCloseDelete,
  handleDelete,
  handleCancel,
  data,
}) {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={openDelete}
      onClose={handleCloseDelete}
      hideBackdrop={true}
      sx={{ ...theme.components.dialog.dialogBox }}
      PaperProps={{ sx: { ...theme.components.dialog.paperProps } }}
    >
      <DialogTitle minHeight={70}>
        <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
          {/* Dialog Title*/}
          <Typography variant="sectionTitle">Delete</Typography>
        </Box>
      </DialogTitle>
      <DialogContentText sx={{ ...theme.components.dialog.dialogContentText }}>
        Are you sure you want to delete <b>{data.name}</b>?
      </DialogContentText>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleCancel || handleCloseDelete}
          sx={{ color: theme.palette.text.primary }}
        >
          <Typography
            variant="sectionTitleSmall"
            sx={{ color: "inherit", fontSize: 16 }}
          >
            Cancel
          </Typography>
        </Button>
        <Button
          onClick={() => {
            handleDelete({ id: data.id, name: data.name });
            handleCloseDelete();
          }}
          startIcon={<Delete />}
          color="danger"
          variant="contained"
          sx={{ color: theme.palette.text.contrastText }}
        >
          <Typography
            variant="sectionTitleSmall"
            sx={{ color: "inherit", fontSize: 16 }}
          >
            Delete
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
