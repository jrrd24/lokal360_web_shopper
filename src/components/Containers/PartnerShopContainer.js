import React from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../Theme";
import TruncateString from "../../utils/TruncateString";
import { BASE_URL } from "../../api/Api";

const PartnerShopContainer = ({ data }) => {
  let {
    shopID = null,
    shop_name = null,
    type = null,
    logo_img_link = null,
  } = data || {};

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const onClick = () => {
    shopID ? navigate(`/shop/${shopID}`) : navigate(`/404`);
  };

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: isSmallScreen ? 130 : 150,
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
          <img
            src={
              logo_img_link
                ? `${BASE_URL}/${logo_img_link}`
                : require("../../assets/product_placeholder.jpg")
            }
            style={{ ...classes.image }}
            alt="logo"
            loading="lazy"
          />
        </Box>

        {/*Details */}
        <Box sx={{ ...classes.detailsContainer }}>
          <Stack spacing={0}>
            {/*Prod Name */}
            <Typography sx={{ ...classes.prodName }}>
              <TruncateString str={shop_name || "NaN"} n={30} />
            </Typography>

            {/*Ratings and Shop Type */}
            <Box sx={{ ...classes.prodDetail }}>
              <Typography sx={{ fontSize: 12 }}>
                {type ? type : "- -"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
};

const classes = {
  main: {
    width: 150,
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
    "&:hover": {
      borderBottom: `solid 3px ${theme.palette.primary.main}`,
    },
    textAlign: "center",
  },
  imageContainer: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 150,
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: `${theme.palette.background.paper}`,
  },
  detailsContainer: {
    p: 1,
    minHeight: 60,
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
    justifyContent: "center",
    color: `${theme.palette.text.eighty}`,
  },
};

export default PartnerShopContainer;
