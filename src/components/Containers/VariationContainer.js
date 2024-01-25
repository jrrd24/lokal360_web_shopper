import { ButtonBase, Typography } from "@mui/material";
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
          minHeight: 60,
          p: 0.5,
          width: "100%",
          borderRadius: 2,
          backgroundColor:
            data?.amt_on_hand === 0
              ? theme.palette.text.ten
              : theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          textAlign: "left",
          gap: "8px",
          mr: 2,
          border:
            selectedVariation === data?.prodVariationID
              ? `2px solid ${theme.palette.primary.main}`
              : `2px solid ${theme.palette.background.paper}`,
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
        <Typography
          varitaion="sectionTitleSmall"
          sx={{ p: 0, whiteSpace: "wrap" }}
        >
          {data?.var_name}
        </Typography>
      </ButtonBase>
    </div>
  );
}

export default VariationContainer;
