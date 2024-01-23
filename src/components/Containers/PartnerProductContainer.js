import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import theme from "../../Theme";
import TruncateString from "../../utils/TruncateString";
import NumberFormat from "../../utils/NumberFormat";

const PartnerProductContainer = ({ data, color }) => {
  let {
    price = data ? data.price : null,
    productID = data ? data.productID : null,
  } = data || {};

  let image = null;
  if (data?.ProductImages[0]) {
    image = `${BASE_URL}/${data?.ProductImages[0].prod_image}`;
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const onClick = () => {
    productID ? navigate(`/product/${productID}`) : navigate(`/404`);
  };

  var colorMain = color || theme.palette.primary.main;
  const classes = {
    main: {
      width: 150,
      backgroundColor: `${theme.palette.background.paper}`,
      borderRadius: "10px",
      border: `solid 1px ${theme.palette.text.ten}`,
      borderBottom: `solid 3px ${theme.palette.text.ten}`,
      "&:hover": {
        borderBottom: `solid 3px ${colorMain}`,
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
      minHeight: 30,
    },

    prodDetailBig: {
      fontSize: "14px",
      fontWeight: 600,
      color: `${colorMain}`,
    },
  };

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: isSmallScreen ? 130 : 150,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: colorMain,
          },
        },
      }}
    >
      <Box sx={{ ...classes.main }}>
        {/*Header Image */}
        <Box sx={{ ...classes.imageContainer, position: "relative" }}>
          <img
            src={
              image ? image : require("../../assets/product_placeholder.jpg")
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
            <span style={{ ...classes.prodDetailBig, fontSize: "18px" }}>
              <NumberFormat value={price || 0} isPeso />
            </span>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default PartnerProductContainer;
