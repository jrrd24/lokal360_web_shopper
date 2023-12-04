import {
  Favorite,
  LocalMall,
  LocalShipping,
  Loyalty,
  RateReview,
  Visibility,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import theme from "../../../Theme";
import { useNavigate } from "react-router-dom";

function ShopperTools() {
  const navigate = useNavigate();
  return (
    <div>
      <Stack spacing={1}>
        {/**Delivery Address */}
        <Button
          variant="outlined"
          startIcon={<LocalShipping />}
          onClick={() => {
            navigate("/profile/my_addresses");
          }}
          sx={{ ...classes.button }}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              My Addresses
            </Typography>
          }
        </Button>

        {/**My Orders */}
        <Button
          variant="outlined"
          startIcon={<LocalMall />}
          onClick={() => {
            navigate("/profile/my_orders");
          }}
          sx={{ ...classes.button }}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              My Orders
            </Typography>
          }
        </Button>

        {/**My Vouchers */}
        <Button
          variant="outlined"
          startIcon={<Loyalty />}
          onClick={() => {}}
          sx={{ ...classes.button }}
          disabled={true}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              My Vouchers
            </Typography>
          }
        </Button>

        {/**Recntly Viewed */}
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          onClick={() => {}}
          sx={{ ...classes.button }}
          disabled={true}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              Recently Viewed
            </Typography>
          }
        </Button>

        {/**My Reviews */}
        <Button
          variant="outlined"
          startIcon={<RateReview />}
          onClick={() => {}}
          sx={{ ...classes.button }}
          disabled={true}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              My Reviews
            </Typography>
          }
        </Button>

        {/**My Favorites*/}
        <Button
          variant="outlined"
          startIcon={<Favorite />}
          onClick={() => {}}
          sx={{ ...classes.button }}
          disabled={true}
        >
          {
            <Typography variant="seeAll" sx={{ ...classes.buttonText }}>
              My Favorites
            </Typography>
          }
        </Button>
      </Stack>
    </div>
  );
}

const classes = {
  button: {
    borderRadius: 2,
    width: "100%",
    ml: "auto",
    backgroundColor: theme.palette.background.paper,
    px: 3,
  },

  buttonText: {
    color: theme.palette.text.main,
    fontSize: 18,
    mr: "auto",
  },
};
export default ShopperTools;
