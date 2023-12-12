import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TruncateString from "../../utils/TruncateString";
import theme from "../../Theme";
import CartItem from "./CartItem";

function OrderContainer({ data }) {
  const [color, setColor] = useState(theme.palette.text.disabled);
  const bgColor = color + "1A";

  useEffect(() => {
    if (data.status === "Pending Approval") {
      setColor(`${theme.palette.status.pending}`);
    } else if (data.status === "Preparing") {
      setColor(`${theme.palette.status.preparing}`);
    } else if (data.status === "Ready For Pick-Up") {
      setColor(`${theme.palette.status.pickUp}`);
    } else if (data.status === "On Delivery") {
      setColor(`${theme.palette.status.delivery}`);
    } else if (data.status === "Complete") {
      setColor(`${theme.palette.status.complete}`);
    } else if (data.status === "Cancelled") {
      setColor(`${theme.palette.status.cancel}`);
    } else if (data.status === "For Refund") {
      setColor(`${theme.palette.status.refund}`);
    } else {
      setColor("text");
    }
  }, [data.status]);

  return (
    <div>
      <Box sx={{ ...classes.main }}>
        {/**SHOP DETAILS BAR  */}
        <Box sx={{ ...classes.topBar }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="sectionTitleSmall">
              Order #<TruncateString str={data?.orderID} n={15} />
            </Typography>
          </Box>
        </Box>

        {/**CART ITEMS MAP */}
        <Box sx={{ ...classes.cartItems }}>
          {data.OrderItems.map((item) => (
            <CartItem
              key={item.cartItemID}
              data={item}
              displayOnly
              displayOrder
            />
          ))}
        </Box>

        <Box
          sx={{
            ...classes.bottomBar,
            backgroundColor: bgColor,
            borderTop: `1px Solid ${color}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="sectionTitleSmall" color={color}>
              {data.status}&nbsp;&nbsp;•&nbsp;&nbsp;{" "}
              <Typography variant="subtitle1" component="span">
                {data.shipping_method}
              </Typography>
            </Typography>
          </Box>
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

  bottomBar: {
    height: 50,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    alignItems: "center",
    px: 2,
    justifyContent: "center",
  },

  cartItems: {
    px: 2,
    py: 1,
    width: "100%",
  },
};

export default OrderContainer;
