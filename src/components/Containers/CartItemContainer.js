import React from "react";
import { Box, Radio, Typography } from "@mui/material";
import theme from "../../Theme";
import CartItem from "./CartItem";
import TruncateString from "../../utils/TruncateString";

function CartItemContainer({
  data,
  handleCartItemSelection,
  handleShopSelection,
  selectedShopID,
  selectedCartItemIDs,
}) {
  const handleRadioChange = () => {
    if (selectedShopID !== data.shopID) {
      handleShopSelection(data.shopID);
    } else {
      handleShopSelection(null);
    }
  };

  return (
    <div>
      <Box sx={{ ...classes.main }}>
        {/**SHOP DETAILS BAR  */}
        <Box sx={{ ...classes.topBar }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              onChange={handleRadioChange}
              checked={selectedShopID === data.shopID}
            />
            <Typography variant="sectionTitleSmall">
              <TruncateString str={data?.shop_name} n={15} />
            </Typography>
          </Box>

          {data?.is_360_partner ? (
            <Typography variant="sectionTitleSmall" color="primary">
              360 Partner
            </Typography>
          ) : (
            ""
          )}
        </Box>

        {/**CART ITEMS MAP */}
        <Box sx={{ ...classes.cartItems }}>
          {data.cartItems.map((item) => (
            <CartItem
              key={item.cartItemID}
              data={item}
              handleCartItemSelection={handleCartItemSelection}
              selectedShopID={selectedShopID}
              selectedCartItemIDs={selectedCartItemIDs}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}

const classes = {
  main: {
    minWidth: "100%",
    minHeight: 150,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    mb: 3,
  },

  topBar: {
    height: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px Solid ${theme.palette.text.sixty}`,
    display: "flex",
    alignItems: "center",
    px: 2,
    justifyContent: "space-between",
  },

  cartItems: {
    px: 2,
    py: 1,
    width: "100%",
  },
};

export default CartItemContainer;
