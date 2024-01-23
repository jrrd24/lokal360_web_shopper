import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { BASE_URL } from "../../api/Api";
import theme from "../../Theme";
import NumberFormat from "../../utils/NumberFormat";

const ProdCategoryContainer = ({ data, color }) => {
  let {
    name = data?.category_name,
    image = `${BASE_URL}/${data?.icon_file_path}`,
  } = data || {};

  var colorMain = color || theme.palette.primary.main;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = {
    main: {
      width: 150,
      backgroundColor: "transparent",
      borderRadius: "10px",

      textAlign: "center",
    },

    image: {
      objectFit: "cover",
      objectPosition: "center",
      aspectRatio: "1/1",
      height: "100%",
      width: "100%",
      border: `solid 2px ${theme.palette.text.ten}`,
      "&:hover": {
        border: `solid 2px ${colorMain}`,
      },
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

        <Avatar
          src={image ? image : require("../../assets/product_placeholder.jpg")}
          sx={{ ...classes.image }}
          alt="logo"
          
        />

        {/*Details */}
        <Box sx={{ ...classes.detailsContainer }}>
          <Stack spacing={0}>
            {/*Prod Name */}
            <Typography variant="subtitle1">{name}</Typography>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default ProdCategoryContainer;
