import { Box, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";
import NumberFormat from "../../utils/NumberFormat";
import { BASE_URL } from "../../api/Api";

function CartItem({
  data,
  handleCartItemSelection,
  selectedShopID,
  selectedCartItemIDs,
}) {
  const handleCheckboxChange = () => {
    handleCartItemSelection(data.cartItemID);
  };

  return (
    <Box sx={{ ...classes.main }}>
      <Checkbox
        checked={selectedCartItemIDs.includes(data.cartItemID)}
        disabled={data.shopID !== selectedShopID}
        onChange={handleCheckboxChange}
      />
      <Box>
        <img
          src={`${BASE_URL}/${data?.var_image}`}
          style={{ height: 75, width: 75, objectFit: "cover" }}
        />
      </Box>
      {/**Details */}
      <Stack spacing={1} sx={{ width: "100%" }}>
        {/**Product Name and Variation */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="sectionTitleSmall">
            {data?.product_name}
          </Typography>
          <Typography variant="body" color={theme.palette.text.sixty}>
            Variation: {data?.var_name} | Quantity: {data?.quantity}
          </Typography>
        </Box>

        {/**Price  */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="sectionTitleSmall" color="primary">
            <NumberFormat value={data?.price * data?.quantity} isPeso />
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

const classes = {
  main: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    alignItems: "center",
    width: "100%",
    my: 2,
  },
};
export default CartItem;
