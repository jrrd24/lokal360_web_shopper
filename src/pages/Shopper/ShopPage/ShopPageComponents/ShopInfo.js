import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import { AccessTime, Language, LocationOn, Phone } from "@mui/icons-material";
import dayjs from "dayjs";

const ShopInfo = ({ data }) => {
  const days = [
    { name: "Mon", value: data?.is_open_mon },
    { name: "Tue", value: data?.is_open_tues },
    { name: "Wed", value: data?.is_open_wed },
    { name: "Thu", value: data?.is_open_thurs },
    { name: "Fri", value: data?.is_open_fri },
    { name: "Sat", value: data?.is_open_sat },
    { name: "Sun", value: data?.is_open_sun },
  ];

  const openDays = days.filter((day) => day.value);
  let DaysOpen;
  if (openDays.length === 7) {
    DaysOpen = "Everyday";
  } else {
    const openDayNames = openDays.map((day) => day.name);
    DaysOpen = openDayNames.join(", ");
  }

  const formatPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    const formattedNumber = `+${cleanedNumber.slice(
      0,
      2
    )} ${cleanedNumber.slice(2, 5)} ${cleanedNumber.slice(
      5,
      8
    )} ${cleanedNumber.slice(8)}`;
    return formattedNumber;
  };
  return (
    <Box sx={{ ...classes.container }}>
      <Typography variant="sectionTitle" color="primary">
        {data.shop_name}{" "}
        <Typography
          variant="subtitle1"
          component={"span"}
          color={theme.palette.text.eighty}
        >
          ({data.type} Shop)
        </Typography>
      </Typography>

      {/**Shop Description */}
      <Typography variant="body2" sx={{ pl: 2 }}>
        {data.description}
      </Typography>
      <Divider />

      {/**Address */}
      <Box sx={{ ...classes.shopDetailTitle }}>
        <LocationOn />
        <Typography variant="sectionTitleSmall">Address</Typography>
      </Box>

      {data.address_line_1 ? (
        <Typography variant="subtitle1" lineHeight={1.2} pl={2}>
          <b> {data?.address_line_1}</b>,{" "}
          {data?.address_line_2 ? `${data?.address_line_2}, ` : ""}
          {data?.address_barangay},&nbsp;{data?.address_municipality},&nbsp;
          {data?.address_province}
          ,&nbsp;
          {data?.address_region}&nbsp;
          {data?.address_postal_code}
        </Typography>
      ) : (
        <Typography variant="subtitle1" lineHeight={1.2} sx={{ pl: 2 }}>
          No Set Address
        </Typography>
      )}
      <Divider />

      {/**Operating Hours */}
      <Box sx={{ ...classes.shopDetailTitle }}>
        <AccessTime />
        <Typography variant="sectionTitleSmall">Operating Hours</Typography>
      </Box>
      <Typography variant="subtitle1" lineHeight={1.2} sx={{ pl: 2 }}>
        <b>{DaysOpen}</b>&emsp;|&emsp;
        <Typography component="span">
          {dayjs(data.time_open).format("h:mm a")} -{" "}
          {dayjs(data.time_close).format("h:mm a")}
        </Typography>
      </Typography>
      <Divider />

      {/**Contact */}
      <Box sx={{ ...classes.shopDetailTitle }}>
        <Phone />
        <Typography variant="sectionTitleSmall">
          Phone{" "}
          <Typography component="span" sx={{ userSelect: "text" }}>
            : {data.phone_number ? formatPhoneNumber(data.phone_number) : "N/A"}
          </Typography>
        </Typography>
      </Box>

      {data.website ? (
        <Box sx={{ ...classes.shopDetailTitle }}>
          <Language />
          <Typography variant="sectionTitleSmall">
            Website
            <Typography component="span" sx={{ userSelect: "text" }}>
              : {data.website}
            </Typography>
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

const classes = {
  container: {
    p: 2,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "Left",
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
  },

  shopDetailTitle: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    userSelect: "none",
  },
};

export default ShopInfo;
