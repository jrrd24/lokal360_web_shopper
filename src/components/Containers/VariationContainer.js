import { Box, ButtonBase, Typography } from "@mui/material";
import React from "react";
import { BASE_URL } from "../../api/Api";
import theme from "../../Theme";
import Zoom from "react-medium-image-zoom";

function VariationContainer({
  data,
  setSelectedVariation,
  selectedVariation,
  setVarAmtOnHand,
  setPrice,
}) {
  const imagePath = `${BASE_URL}/${data?.var_image}`;

  const onClick = () => {
    setSelectedVariation(data?.prodVariationID);
    setVarAmtOnHand(data?.amt_on_hand);
    setPrice(data?.price);
  };

  return (
    <div>
      <ButtonBase
        onClick={onClick}
        sx={{
          height: 60,
          maxWidth: 200,
          minWidth: 150,
          p: 1,
          width: "100%",
          borderRadius: 2,
          backgroundColor:
            data?.amt_on_hand === 0
              ? theme.palette.text.ten
              : theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: "8px",
          border:
            selectedVariation === data?.prodVariationID
              ? `2px solid ${theme.palette.primary.main}`
              : "",
        }}
        disabled={data?.amt_on_hand === 0}
      >
        <Zoom>
          <img
            src={
              !data?.var_image
                ? require("../../assets/product_placeholder_big.jpg")
                : imagePath
            }
            style={{
              height: 50,
              width: 50,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
        </Zoom>
        <Typography varitaion="sectionTitleSmall">{data?.var_name}</Typography>
        {data?.amt_on_hand === 0 ? (
          <Box
            sx={{
              height: 60,
              maxWidth: 200,
              minWidth: 150,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: theme.palette.text.sixty,
              position: "absolute",
            }}
          >
            <Typography
              varitaion="sectionTitleSmall"
              color="white"
              sx={{ opacity: "80%" }}
            >
              Out Of Stock
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </ButtonBase>
    </div>
  );
}

export default VariationContainer;
