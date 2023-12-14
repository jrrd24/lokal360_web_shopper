import React from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import theme from "../../Theme";
import TruncateString from "../../utils/TruncateString";
import { StarHalf } from "@mui/icons-material";
import NumberFormat from "../../utils/NumberFormat";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Styles.module.css";
import { BASE_URL } from "../../api/Api";
import RawMaterialTag from "../Tags/RawMaterialTag";
function ProductPreview({ data }) {
  let {
    product_name = data ? data.product_name : null,
    rating = data ? data.rating : null,
    amtSold = data ? data.total_sold : null,
    price = data ? data.price : null,
    origPrice = data ? data.orig_price : null,
    productID = data.productID,
    isRawMat = data ? data.is_raw_mat : null,
  } = data || {};

  console.log("DATA PROD", data);

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
      className={`${styles.grow}`}
      sx={{
        ...theme.components.buttonBase.main,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Box sx={{ ...classes.main }}>
        {/*Prod Image */}
        <Box sx={{ ...classes.imageContainer }}>
          {isRawMat ? (
            <Box sx={{ position: "absolute", top: 5, left: 15, zIndex: 1 }}>
              <RawMaterialTag small />
            </Box>
          ) : (
            ""
          )}

          <img
            src={image || require("../../assets/product_placeholder.jpg")}
            style={{ ...classes.image }}
            alt="product"
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
              <span style={{ ...classes.prodDetailBig }}>
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
    width: 160,
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    border: `solid 1px ${theme.palette.text.ten}`,
    textAlign: "left",
  },

  imageContainer: {
    height: 180,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 180,
    width: 160,
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
