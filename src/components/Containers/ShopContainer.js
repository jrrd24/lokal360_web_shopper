import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Styles.module.css";
import theme from "../../Theme";
import TruncateString from "../../utils/TruncateString";
import { DeliveryDining, FmdGood, StarHalf } from "@mui/icons-material";
import { BiShoppingBag } from "react-icons/bi";
import { BASE_URL } from "../../api/Api";

function ShopContainer({ data }) {
  let {
    shopID = null,
    shop_name = null,
    type = null,
    shipping_deliver_enabled = null,
    shipping_pickup_enabled = null,
    header_img_link = null,
    address = null,
    shop_rating = 0,
  } = data || {};

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/shop/${shopID}`);
  };
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        ...theme.components.buttonBase.large,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Box sx={{ ...classes.main }}>
        {/*Header Image */}
        <Box sx={{ ...classes.imageContainer }}>
          <img
            src={
              header_img_link
                ? `${BASE_URL}/${header_img_link}`
                : require("../../assets/placeholder.png")
            }
            style={{ ...classes.image }}
            alt="logo"
          />
        </Box>

        {/*Details */}
        <Box sx={{ ...classes.detailsContainer }}>
          <Stack spacing={0.5}>
            {/*Prod Name */}
            <Typography sx={{ ...classes.name }}>
              <TruncateString str={shop_name || "NaN"} n={40} />
            </Typography>

            <Stack spacing={0}>
              {/*Ratings and Shop Type */}
              <Box sx={{ ...classes.prodDetail }}>
                <StarHalf sx={{ ...classes.star }} />
                <Typography sx={{ fontSize: "inherit" }}>
                  <span style={{ ...classes.prodDetailBig }}>
                    {shop_rating !== 0 ? shop_rating.toFixed(2) : "N/A"}
                  </span>
                  /5 | {type ? type : "- -"}
                </Typography>
              </Box>

              {/*Address */}
              <Box sx={{ ...classes.prodDetail }}>
                <FmdGood sx={{ ...classes.pin }} />
                <Typography sx={{ fontSize: "inherit" }}>
                  {address ? address : "- -"}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ ...classes.prodDetail, display: "flex", gap: "8px" }}>
              {shipping_deliver_enabled && (
                <Stack
                  direction={"horizontal"}
                  spacing={2}
                  sx={{ ...classes.shipping }}
                >
                  <DeliveryDining sx={{ ...classes.pin }} />
                  <Typography sx={{ fontSize: "inherit" }}>Delivery</Typography>
                </Stack>
              )}

              {shipping_pickup_enabled && (
                <Stack
                  direction={"horizontal"}
                  spacing={2}
                  sx={{ ...classes.shipping }}
                >
                  <BiShoppingBag style={{ ...classes.pin }} />
                  <Typography sx={{ fontSize: "inherit" }}>Pick-Up</Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
}

const classes = {
  main: {
    width: 320,
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    border: `solid 1px ${theme.palette.text.ten}`,
    textAlign: "left",
  },
  imageContainer: {
    height: 120,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 120,
    width: 320,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: `${theme.palette.background.paper}`,
  },
  detailsContainer: {
    p: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 90,
  },
  prodName: {
    fontSize: "16px",
    color: theme.palette.text.primary,
    fontWeight: "400",
    lineHeight: "16px",
    letterSpacing: -0.3,
  },
  star: {
    fontSize: "20px",
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },
  pin: {
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.text.sixty,
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
    color: `${theme.palette.text.sixty}`,
  },

  shipping: {
    backgroundColor: theme.palette.text.ten,
    p: 0.5,
    borderRadius: 2,
  },
};
export default ShopContainer;
