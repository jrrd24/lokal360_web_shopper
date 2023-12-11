import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Zoom,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import MapComponent from "./MapComponent";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";

function ViewLocationDialog({
  open,
  latitude,
  longitude,
  handleClose,
  shopName,
}) {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={isSmScreen}
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      hideBackdrop={true}
      TransitionComponent={Zoom}
      sx={{ ...theme.components.dialog.dialogBox }}
      PaperProps={{ sx: { ...theme.components.dialog.paperProps } }}
    >
      {/* Dialog Title/ Buttons */}
      <DialogTitle sx={{ ...theme.components.dialog.dialogTitle }}>
        <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
          {/* Dialog Title*/}
          <Typography variant="sectionTitle">View Shop Location</Typography>

          {/*  Buttons */}
          <DialogActions sx={{ gap: "16px" }}>
            <ButtonCloseDialog handleClose={handleClose} />
          </DialogActions>
        </Box>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
        <Stack width={"100%"}>
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            shopName={shopName}
          />
          <Alert severity="info">
            <b> Double Click The Map </b>to Get Your Current Location
          </Alert>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ViewLocationDialog;
