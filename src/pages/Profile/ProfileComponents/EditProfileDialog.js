import React from "react";
import {
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  useMediaQuery,
} from "@mui/material";
import ButtonSave from "../../../components/Buttons/ButtonSave";
import ButtonCloseDialog from "../../../components/Buttons/ButtonCloseDialog";
import theme from "../../../Theme";
import { useForm } from "react-hook-form";
import DProfileDetails from "./DProfileDetails";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import dayjs from "dayjs";
import { LoadingCircle } from "../../../components/Loading/Loading";

function EditProfileDialog({ open, handleClose, handleSave, userData }) {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // For React Hook Form
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
    register,
    setValue,
    trigger,
  } = useForm();

  // API CALL UPDATE USER PROFILE
  const { useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const { mutate } = useCustomMutate(
    "updateUserProfile",
    async (data) => {
      const response = await axiosPrivate.patch(
        `/api/profile/update/?userID=${auth.userID}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    ["getProfile"],
    {
      onError: (error) => {
        if (error.response) {
          handleSave("error", error.response.data.error);
        }
      },
      onMutate: () => {
        return <LoadingCircle />;
      },
      onSuccess: () => {
        handleSave("success", "User Profile Updated Successfully");
        reset();
        handleClose();
      },
    }
  );

  const onSubmit = (data, event) => {
    event.preventDefault();

    //FORMAT DATE
    let formattedBirthday = null;
    let birthday = null;
    if (data.birthday) {
      birthday = new Date(
        data.birthday?.$y,
        data.birthday?.$M,
        data.birthday?.$D
      );
      formattedBirthday = moment(birthday).format("YYYY-MM-DD");
      if (formattedBirthday === moment(dayjs()).format("YYYY-MM-DD")) {
        formattedBirthday = null;
      }
    }

    const requestData = {
      birthday: formattedBirthday,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      username: data.username,
    };
    if (data.profilePic instanceof File && data.profilePic.size > 0) {
      requestData.profilePic = data.profilePic;
    }

    mutate(requestData);
  };

  return (
    <div>
      <Dialog
        fullScreen={isSmScreen}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        hideBackdrop={true}
        sx={{ ...theme.components.dialog.dialogBox }}
        PaperProps={{ sx: { ...theme.components.dialog.paperProps } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dialog Title/ Buttons */}
          <DialogTitle sx={{ ...theme.components.dialog.dialogTitle }}>
            <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
              {/* Dialog Title*/}
              <Typography variant="sectionTitle">Edit User Profile</Typography>

              {/*  Buttons */}
              <DialogActions sx={{ gap: "16px" }}>
                <ButtonSave
                  type="submit"
                  isDirty={isDirty}
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                />
                <ButtonCloseDialog handleClose={handleClose} />
              </DialogActions>
            </Box>
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
            {/*Main*/}
            <Stack spacing={2} sx={{ width: "600px" }}>
              {/*Basic Product Info */}
              <Box sx={{ py: 5 }}>
                <DProfileDetails
                  control={control}
                  data={userData}
                  trigger={trigger}
                  register={register}
                  setValue={setValue}
                />
              </Box>
            </Stack>
          </DialogContent>

          {/* Show Save Button at Bottom for small screens */}
          <Box sx={{ ...theme.components.dialog.saveButtonSmall }}>
            <DialogActions sx={{ py: 2, display: "flex" }}>
              <ButtonSave type="submit" isDirty={isDirty} />
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;
