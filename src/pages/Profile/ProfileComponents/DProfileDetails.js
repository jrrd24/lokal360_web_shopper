import React, { useState } from "react";
import { Alert, Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { CustomInput } from "../../../components/FormComponents/CustomInput";
import { CustomPhoneNumberPicker } from "../../../components/FormComponents/CustomPhoneNumberPicker";
import CustomDatePicker from "../../../components/FormComponents/CustomDatePicker";
import { UploadImage } from "../../../components/DialogBox/UploadImageDialog";
import ButtonEditImage from "../../../components/Buttons/ButtonEditImage";
import styles from "../../../css/Styles.module.css";
import { BASE_URL } from "../../../api/Api";

function DProfileDetails({ sx, control, data, trigger, register, setValue }) {
  const [editProfilePic, setEditProfilePic] = useState(false);
  const genderTypes = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Other",
      label: "Other",
    },
    {
      value: "Rather Not Say",
      label: "Rather Not Say",
    },
  ];

  return (
    <Stack spacing={7} sx={{ sx }}>
      {/*User Details */}
      <Stack spacing={3}>
        {/*Section Name */}
        <Stack
          direction={"row"}
          sx={{ alignItems: "baseline", justifyContent: "space-between" }}
        >
          <Typography variant="sectionTitleSmall">User Details</Typography>
        </Stack>

        {/*TextBoxes */}
        <Stack spacing={3}>
          {/*Product Name */}
          <CustomInput
            control={control}
            name="username"
            label="Username"
            value={data.Shopper.username}
            width="100%"
            rules={{
              required: "Username is Required",
              maxLength: {
                value: 50,
                message: "Max Length of Username is 50 Characters",
              },
              pattern: {
                value: /^\S*$/,
                message: "Username Cannot Contain Spaces",
              },
            }}
          />

          {/*F and L name*/}
          <Stack direction={"row"} spacing={3} sx={{ minWidth: "100%" }}>
            {/*Product Category*/}
            <CustomInput
              control={control}
              name="firstName"
              label="First Name"
              value={data.first_name}
              width="48%"
              rules={{
                required: "First Name Is Required",
              }}
            />

            {/*Shop Category*/}
            <CustomInput
              control={control}
              name="lastName"
              label="Last Name"
              value={data.last_name}
              width="48%"
              rules={{
                required: "Last Name Is Required",
              }}
            />
          </Stack>

          {/*Bday and Gender*/}
          <Stack direction={"row"} spacing={3} sx={{ minWidth: "100%" }}>
            {/*Bday*/}

            {!data.birthday && (
              <Stack spacing={1} sx={{ width: "48%" }}>
                <CustomDatePicker
                  control={control}
                  name="birthday"
                  label="Birthday"
                  disableFutureDates
                  allowNull
                />

                <Alert severity="warning">
                  Birthday can only be set up <b>Once</b>
                </Alert>
              </Stack>
            )}

            {/*Gender*/}
            <CustomInput
              control={control}
              name="gender"
              label="Gender"
              value={data.gender}
              select
              selectMenuItems={genderTypes}
              width={data.birthday ? "100%" : "48%"}
            />
          </Stack>

          {/*Mobile Num */}
          <CustomPhoneNumberPicker
            control={control}
            name="phoneNumber"
            label="Phone Number"
            defaultValue={data.mobile_num || "+63"}
            width="100%"
            trigger={trigger}
            rules={{
              pattern: {
                value: /^(09|\+639|\+63 9)\d{9}$/,
                message: "Invalid Phone Number Format Must Be +63 966 123 4565",
              },
            }}
          />
        </Stack>
      </Stack>

      <Divider />

      {/*Profile Pic */}
      <Stack spacing={3}>
        {/*Section Name */}
        <Stack
          direction={"row"}
          sx={{ alignItems: "baseline", justifyContent: "space-between" }}
        >
          <Typography variant="sectionTitleSmall">Profile Picture</Typography>
        </Stack>

        {/*Profile Pic*/}
        <Stack spacing={1}>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Box className={`${styles.grow}`}>
              <ButtonEditImage
                showEditImage={setEditProfilePic}
                editImage={editProfilePic}
              />
            </Box>
          </Box>

          <Box>
            <Avatar
              className={`${styles.grow}`}
              name={"profilePic"}
              src={`${BASE_URL}/${data.profile_pic}`}
              alt="Profile Picture"
              loading="eager"
              style={{ height: 150, width: 150, ...classes.image }}
            />
          </Box>

          <UploadImage
            name={"profilePic"}
            alt={"Profile Picture"}
            control={control}
            register={register}
            setValue={setValue}
            sx={{ display: editProfilePic ? "block" : "none" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

const classes = {
  image: {
    backgroundColor: "#FFF",
    border: "solid",
    borderColor: `#44444433`,
    borderWidth: 2,
    objectFit: "cover",
  },
};

export default DProfileDetails;
