import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ReadOnlyCustomInput } from "../../../../components/FormComponents/CustomInput";
import { ReadOnlyTimePicker } from "../../../../components/FormComponents/CustomTimePicker";
import { ReadOnlyPhoneNumberPicker } from "../../../../components/FormComponents/CustomPhoneNumberPicker";
import { CalendarMonth, Language, Phone } from "@mui/icons-material";
import dayjs from "dayjs";

function AboutUs({ data }) {
  const days = [
    { name: "Mon", value: data.is_open_mon },
    { name: "Tue", value: data.is_open_tues },
    { name: "Wed", value: data.is_open_wed },
    { name: "Thu", value: data.is_open_thurs },
    { name: "Fri", value: data.is_open_fri },
    { name: "Sat", value: data.is_open_sat },
    { name: "Sun", value: data.is_open_sun },
  ];

  const openDays = days.filter((day) => day.value);
  let DaysOpen;
  if (openDays.length === 7) {
    DaysOpen = "Everyday";
  } else {
    const openDayNames = openDays.map((day) => day.name);
    DaysOpen = openDayNames.join(", ");
  }
  return (
    <div>
      <Stack spacing={5}>
        {/**SHOP DECRIPTION */}
        <Stack spacing={3}>
          <Typography variant="sectionTitle">
            {data.shop_name}{" "}
            <Typography variant="body1" component={"span"}>
              ({data.type} Shop)
            </Typography>
          </Typography>
          <Box>{data.description}</Box>
        </Stack>

        {/**ADDRESS */}
        <Stack spacing={3}>
          <Typography variant="sectionTitle">Shop Address</Typography>

          {/*Address Line 1*/}
          <ReadOnlyCustomInput
            name="addressLine1"
            label="Address Line 1"
            defaultValue={data?.address_line_1}
            width="100%"
          />

          {/*Address Line 2*/}
          <ReadOnlyCustomInput
            name="addressLine2"
            label="Address Line 2"
            defaultValue={data?.address_line_2}
            width="100%"
          />

          {/*barangay / municipality */}
          <Stack direction={"row"} spacing={3}>
            {/*region*/}
            <ReadOnlyCustomInput
              name="region"
              label="Region"
              defaultValue={data?.address_region}
              width="48%"
            />

            {/*province*/}
            <ReadOnlyCustomInput
              name="province"
              label="Province"
              defaultValue={data?.address_province}
              width="48%"
            />
          </Stack>

          {/*region / postal code */}
          <Stack direction={"row"} spacing={3}>
            {/*municipality*/}
            <ReadOnlyCustomInput
              name="municipality"
              label="Municipality"
              defaultValue={data?.address_municipality}
              width="48%"
            />

            {/*barangay*/}
            <ReadOnlyCustomInput
              name="barangay"
              label="Barangay"
              defaultValue={data?.address_barangay}
              width="48%"
            />
          </Stack>
          {/*postal code*/}
          <ReadOnlyCustomInput
            name="postalCode"
            label="Postal Code"
            defaultValue={data?.address_postal_code}
            width="48%"
          />
        </Stack>

        {/**OPERATING HOURS*/}
        <Stack spacing={3}>
          <Typography variant="sectionTitle">Operating Hours</Typography>

          {/*Days Opem */}
          <ReadOnlyCustomInput
            name="daysOpen"
            label="Days Open"
            defaultValue={DaysOpen}
            width="100%"
            component={CalendarMonth}
          />

          {/*Open and Closing Time */}
          <Stack direction={"row"} spacing={3}>
            {/*Opening Time*/}
            {data.time_open && (
              <ReadOnlyTimePicker
                name="openingTime"
                label="Opening Time"
                value={dayjs(data.time_open) || "00:00:00"}
                width="48%"
              />
            )}

            {!data.time_open && (
              <ReadOnlyCustomInput
                name="openingTime"
                label="Opening Time"
                defaultValue={"--"}
                width="48%"
              />
            )}

            {/*Closing Time*/}
            {data.time_close && (
              <ReadOnlyTimePicker
                name="closingTime"
                label="Closing Time"
                value={dayjs(data.time_close)}
                width="48%"
              />
            )}

            {!data.time_close && (
              <ReadOnlyCustomInput
                name="closingTime"
                label="Closing Time"
                defaultValue={"--"}
                width="48%"
              />
            )}
          </Stack>
        </Stack>

        {/**CONTACT INFO*/}
        <Stack spacing={3}>
          <Typography variant="sectionTitle">Operating Hours</Typography>

          <ReadOnlyPhoneNumberPicker
            label="Phone Number"
            value={data.phone_number}
            width="48%"
            sx={{ ...classes.max600 }}
            component={Phone}
          />

          {/*Shop Website */}
          <ReadOnlyCustomInput
            name="shopWebsite"
            label="Shop Website"
            defaultValue={data.website}
            width="48%"
            component={Language}
            sx={{ ...classes.max600 }}
          />
        </Stack>
      </Stack>
    </div>
  );
}

const classes = {
  max600: {
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
};

export default AboutUs;
