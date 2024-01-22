import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onClick = () => {
    navigate(`/shop/${shopID}`);
  };

  const width = isSmallScreen ? "100%" : 400;
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        maxWidth: 450,
        minWidth: isSmallScreen ? 300 : 400,
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
        <Box sx={{ ...classes.imageContainer, position: "relative" }}>
          <Box
            sx={{
              ...classes.prodDetail,
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: isSmallScreen ? "4px" : "8px",
              position: "absolute",
              color: theme.palette.primary.main,
            }}
          >
            {shipping_deliver_enabled && (
              <Box sx={{ ...classes.shippingStatusContainer }}>
                <DeliveryDining sx={{ ...classes.icon }} />
                <Typography sx={{ fontSize: "inherit" }}>Delivery</Typography>
              </Box>
            )}

            {shipping_pickup_enabled && (
              <Box sx={{ ...classes.shippingStatusContainer }}>
                <BiShoppingBag style={{ ...classes.icon }} />
                <Typography sx={{ fontSize: "inherit" }}>Pick-Up</Typography>
              </Box>
            )}
          </Box>
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
            <Typography sx={{ ...classes.prodName }}>
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
                <FmdGood sx={{ ...classes.icon }} />
                <Typography sx={{ fontSize: "inherit" }}>
                  {address ? address : "- -"}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
}

const classes = {
  main: {
    width: "100%",
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    border: `solid 1px ${theme.palette.text.ten}`,
    textAlign: "left",
  },
  imageContainer: {
    height: 175,
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 175,
    width: "100%",
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

  shippingStatusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: theme.palette.background.paper,
    p: 0.5,
    borderRadius: 2,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRight: `4px solid ${theme.palette.primary.main}`,
    borderBottom: `4px solid ${theme.palette.primary.main}`,
  },
  icon: {
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
};
export default ShopContainer;
