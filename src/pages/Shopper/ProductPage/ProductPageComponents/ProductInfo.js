import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NumberFormat from "../../../../utils/NumberFormat";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import Error404 from "../../../../components/Loading/Error404";
import MapData from "../../../../utils/MapData";
import VariationContainer from "../../../../components/Containers/VariationContainer";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import QuantityInput from "../../../../components/FormComponents/CustomNumberInput";
import { ShoppingCart } from "@mui/icons-material";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../api/Api";

function ProductInfo({ selectedProductID, data, showAlert }) {
  const { useCustomQuery, useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [selectedVariation, setSelectedVariation] = useState(0);
  const [varAmtOnHand, setVarAmtOnHand] = useState(0);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  //API CALL ADD TO CART
  const { mutate } = useCustomMutate(
    "addToCart",
    async (data) => {
      await axiosPrivate.post(
        `api/buy_product/add_to_cart/?shopperID=${data.shopperID}`,
        data
      );
    },
    ["getCartItems"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        navigate("/cart");
      },
    }
  );

  const handleAddToCart = () => {
    const requestData = {
      prodVariationID: selectedVariation,
      quantity: qty,
      shopperID: auth.shopperID,
    };

    console.log("Add to Cart", requestData);
    mutate(requestData);
  };

  // API CALL GET PRODUCT Rating
  const {
    data: ratingData,
    isLoading,
    isError,
  } = useCustomQuery(
    "getProductRating",
    () =>
      axiosPrivate
        .get(`/api/product/rating/?productID=${selectedProductID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }
  if (isError) {
    return <Error404 />;
  }

  return (
    <div>
      <Stack spacing={2}>
        {/**Main Product Details */}
        <Stack spacing={3} sx={{ ...classes.detailsContainer }}>
          <Stack spacing={1}>
            <Typography variant="sectionTitle">{data.product_name}</Typography>

            {/**Rating /  Amt Sold */}
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {/**RATING*/}
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Box>
                  <Typography variant="sectionTitleSmall" color="primary">
                    {ratingData.rating !== 0
                      ? ratingData.rating.toFixed(1)
                      : "N/A"}
                  </Typography>
                </Box>
                <Rating
                  name="prodRating"
                  value={ratingData.rating}
                  precision={0.5}
                  spacing={4}
                  readOnly
                />
              </Box>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/**AMT SOLD*/}

                <Typography variant="sectionTitleSmall" color="primary">
                  <NumberFormat value={data.amountSold} isShortened />
                  &nbsp;
                  <Typography
                    variant="subtitle1"
                    component={"span"}
                    color={theme.palette.text.eighty}
                  >
                    Sold
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/**Price */}
          <Box>
            {price === 0 ? (
              <Typography variant="sectionTitle" color="primary">
                <NumberFormat value={data.price} isPeso /> -{" "}
                <NumberFormat value={data.max_price} isPeso />
              </Typography>
            ) : (
              <Typography variant="sectionTitle" color="primary">
                <NumberFormat value={price} isPeso />
              </Typography>
            )}
          </Box>
        </Stack>

        {/*TODO: ADD SHOP LINK */}
        <ButtonBase
          sx={{
            ...classes.detailsContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "16px",
          }}
          onClick={() => {
            navigate(`/shop/${data.Shop.shopID}`);
          }}
        >
          <img
            src={
              data.Shop.logo_img_link
                ? `${BASE_URL}/${data.Shop.logo_img_link}`
                : require("../../../../assets/product_placeholder_big.jpg")
            }
            style={{
              height: 50,
              width: 50,
              objectFit: "cover",
              borderRadius: 50,
            }}
          />

          <Typography variant="sectionTitleSmall">
            {data.Shop.shop_name}
          </Typography>
        </ButtonBase>

        {/**Product Details */}
        <Stack spacing={3} sx={{ ...classes.detailsContainer }}>
          {/**DESCRIPTION */}
          <Stack spacing={1}>
            <Typography variant="sectionTitleSmall">Description</Typography>
            <Typography variant="body1">{data.description}</Typography>
          </Stack>

          <Divider />

          {/**VARIATIONS */}
          <Stack spacing={1}>
            <Typography variant="sectionTitleSmall">Variations</Typography>
            {/*TODO: MAP VARIATIONS */}
            <MapData
              inputData={data?.ProductVariations}
              component={(props) => (
                <VariationContainer
                  {...props}
                  setSelectedVariation={setSelectedVariation}
                  selectedVariation={selectedVariation}
                  setVarAmtOnHand={setVarAmtOnHand}
                  setPrice={setPrice}
                />
              )}
              idName={"prodVariationID"}
              horizontal
              height={100}
            />
          </Stack>

          <Divider />

          {/**QTY */}
          <Stack
            spacing={3}
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Typography variant="sectionTitleSmall">
              Quantity{" "}
              <Typography variant="subtitle1">
                {varAmtOnHand !== undefined && (
                  <>
                    Amount on Hand:{" "}
                    <NumberFormat value={varAmtOnHand} isShortened />
                  </>
                )}
              </Typography>
            </Typography>
            <QuantityInput maxValue={varAmtOnHand} setQty={setQty} />
          </Stack>
        </Stack>

        {/**Add To Cart Btn */}
        <Stack spacing={3} sx={{ display: "flex", justifyContent: "end" }}>
          <Box sx={{ marginLeft: "auto" }}>
            <ButtonAddToCart
              onClickAction={handleAddToCart}
              disable={!selectedVariation || !qty}
            />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}

const classes = {
  detailsContainer: {
    backgroundColor: theme.palette.background.paper,
    p: 2,
    borderRadius: 5,
  },
};

function ButtonAddToCart({ onClickAction, disable }) {
  return (
    <Button
      variant="contained"
      startIcon={<ShoppingCart />}
      onClick={onClickAction}
      sx={{
        borderRadius: 5,
        width: 200,
      }}
      disabled={disable}
    >
      {
        <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
          Add To Cart
        </Typography>
      }
    </Button>
  );
}

export default ProductInfo;
