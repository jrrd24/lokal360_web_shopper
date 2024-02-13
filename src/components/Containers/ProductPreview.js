import React from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../../Theme";
import TruncateString from "../../utils/TruncateString";
import { StarHalf } from "@mui/icons-material";
import NumberFormat from "../../utils/NumberFormat";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import RawMaterialTag from "../Tags/RawMaterialTag";

function ProductPreview({ data, containerStyles }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let {
    product_name = data ? data.product_name : null,
    rating = data ? data.rating : null,
    amtSold = data ? data.total_sold : null,
    price = data ? data.price : null,
    origPrice = data ? data.orig_price : null,
    productID = data.productID,
    isRawMat = data ? data.is_raw_mat : null,
  } = data || {};

  let image = null;
  if (data.ProductImages[0]) {
    image = `${BASE_URL}/${data.ProductImages[0].prod_image}`;
  }
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/product/${productID}`);
  };
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        ...theme.components.buttonBase.main,
        width: containerStyles?.width || "100%",
        maxWidth: 210,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Box
        sx={{
          ...classes.main,
          border: `solid ${isRawMat ? "3px" : "1px"} ${
            isRawMat
              ? `${theme.palette.secondary.main}66`
              : theme.palette.text.ten
          }`,
          borderBottom: `solid ${isRawMat ? "3px" : "3px"} ${
            isRawMat
              ? `${theme.palette.secondary.main}66`
              : theme.palette.text.ten
          }`,
          "&:hover": {
            borderBottom: `solid 3px ${
              isRawMat
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            }`,
          },
        }}
      >
        {/*Prod Image */}
        <Box
          sx={{
            ...classes.imageContainer,
            height: isSmallScreen ? 200 : 250,
            width: "100%",
          }}
        >
          {isRawMat ? (
            <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
              <RawMaterialTag small />
            </Box>
          ) : (
            ""
          )}

          <img
            src={image || require("../../assets/product_placeholder.jpg")}
            style={{
              ...classes.image,
              height: isSmallScreen ? 200 : 250,
              width: containerStyles?.width || "100%",
            }}
            alt="product"
            loading="lazy"
          />
        </Box>

        {/*Prod Details */}
        <Box sx={{ ...classes.prodDetailsContainer }}>
          <Stack spacing={1}>
            {/*Prod Name */}
            <Typography sx={{ ...classes.prodName }}>
              <TruncateString str={product_name || "NaN"} n={30} />
            </Typography>

            {/*Prod Ratings and Amt Sold */}
            <Box sx={{ ...classes.prodDetail }}>
              <StarHalf sx={{ ...classes.star }} />
              <Typography sx={{ fontSize: "inherit" }}>
                <span style={{ ...classes.prodDetailBig }}>
                  {rating !== 0 ? rating.toFixed(1) : "N/A"}
                </span>
                /5 | <b>{amtSold || 0}</b> Sold
              </Typography>
            </Box>
          </Stack>

          {/*Prod Price*/}
          <Box sx={{ ...classes.prodDetail }}>
            <Typography sx={{ fontSize: "inherit", alignItems: "baseline" }}>
              <span style={{ ...classes.prodDetailBig, fontSize: "18px" }}>
                <NumberFormat value={price || 0} isPeso />
              </span>
              &nbsp;&nbsp;
              {origPrice !== price ? (
                <span style={{ textDecoration: "line-through" }}>
                  <NumberFormat value={origPrice} isPeso noDecimal />
                </span>
              ) : null}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
}

const classes = {
  main: {
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    minWidth: "100%",
    textAlign: "left",
  },

  imageContainer: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  image: {
    objectFit: "cover",
    objectPosition: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: `${theme.palette.background.paper}`,
  },

  prodDetailsContainer: {
    p: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 100,
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
};

export default ProductPreview;
