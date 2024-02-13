import { Avatar, Box, ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";
import { BASE_URL } from "../../api/Api";
import TruncateString from "../../utils/TruncateString";
import { FmdGood, StarHalf } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ShopPreview = ({ data }) => {
  let {
    shopID = null,
    shop_name = null,
    type = null,
    shipping_deliver_enabled = null,
    shipping_pickup_enabled = null,
    logo_img_link = null,
    address = null,
    shop_rating = 0,
  } = data || {};

  const navigate = useNavigate();

  return (
    <ButtonBase
      onClick={() => {
        navigate(`/shop/${shopID}`);
      }}
      sx={{ ...classes.button }}
    >
      <Box sx={{ ...classes.main }}>
        <Avatar
          src={
            logo_img_link
              ? `${BASE_URL}/${logo_img_link}`
              : require("../../assets/product_placeholder_big.jpg")
          }
          sx={{ height: 75, width: 75 }}
        />

        <Stack spacing={0}>
          {/*Prod Name */}
          <Typography sx={{ ...classes.prodName }}>
            <TruncateString str={shop_name || "NaN"} n={40} />
          </Typography>

          <Stack spacing={0}>
            {/*Ratings and Shop Type */}
            <Box sx={{ ...classes.prodDetail }}>
              <StarHalf sx={{ ...classes.star }} />
              <Typography sx={{ fontSize: "inherit" }}>
                <span style={{ ...classes.prodDetailBig }}>
                  {shop_rating !== 0 ? shop_rating.toFixed(1) : "N/A"}
                </span>
                /5 | {type ? type : "- -"}
              </Typography>
            </Box>

            {/*Address */}
            <Box sx={{ ...classes.prodDetail }}>
              <FmdGood sx={{ ...classes.icon }} />
              <Typography sx={{ fontSize: "inherit" }}>
                {address ? address : "- -"}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </ButtonBase>
  );
};

const classes = {
  button: {
    ...theme.components.buttonBase.main,
    width: "100%",
    //change ripple color
    "&:hover, &:focus": {
      "& .MuiTouchRipple-root": {
        color: theme.palette.primary.main,
      },
    },
  },

  main: {
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    minHeight: 120,
    minWidth: "100%",
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
    textAlign: "left",
    p: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
    "&:hover": {
      borderBottom: `solid 3px ${theme.palette.primary.main}`,
    },
  },

  prodName: {
    fontSize: "16px",
    color: theme.palette.text.primary,
    fontWeight: "400",
    lineHeight: "16px",
    pb: 1,
  },

  star: {
    fontSize: "20px",
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },

  prodDetailBig: {
    fontSize: "14px",
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },

  prodDetail: {
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    color: `${theme.palette.text.eighty}`,
    top: 5,
    right: 10,
  },
};

export default ShopPreview;
