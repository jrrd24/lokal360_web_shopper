import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../Theme";
import CartItems from "./CartComponents/CartItems";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function CartContent() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Track selected cartItemIDs and selected shopID
  const [selectedShopID, setSelectedShopID] = useState(0);
  const [selectedCartItemIDs, setSelectedCartItemIDs] = useState([]);

  const handleCheckout = () => {
    navigate("/checkout", { state: { selectedCartItemIDs } });
  };
  return (
    <Box sx={{ ...classes.pageContainer }}>
      <Box sx={{ ...classes.main }}>
        <Stack spacing={3}>
          <Box sx={{ ...classes.sectionTitle }}>
            {!isSmallScreen ? (
              <Box sx={{ ...classes.sectionTitle }}>
                <img
                  alt={"logo"}
                  src={require("../../../assets/lokal360_logo_gray.png")}
                  style={{ ...classes.logo }}
                />

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ ...classes.divider }}
                />
              </Box>
            ) : (
              ""
            )}

            <Typography variant="sectionTitleBig">My Cart</Typography>

            <ButtonCheckout
              onClickAction={handleCheckout}
              disable={!selectedCartItemIDs.length}
            />
          </Box>

          <CartItems
            selectedCartItemIDs={selectedCartItemIDs}
            setSelectedCartItemIDs={setSelectedCartItemIDs}
            selectedShopID={selectedShopID}
            setSelectedShopID={setSelectedShopID}
          />
        </Stack>
      </Box>
    </Box>
  );
}

const classes = {
  pageContainer: {
    ...theme.components.box.pageContainer,
    display: "flex",
    justifyContent: "center",
  },

  main: {
    maxWidth: 900,
    width: 900,
    "@media (max-width: 900px)": { width: "100%" },
    textAlign: "left",
  },

  logo: {
    width: 75,
    height: 75,
  },

  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  divider: {
    borderLeftWidth: 2,
    color: theme.palette.text.primary,
  },
};

function ButtonCheckout({ onClickAction, disable }) {
  return (
    <Button
      variant="contained"
      startIcon={<ShoppingCartCheckout />}
      onClick={onClickAction}
      sx={{
        borderRadius: 5,
        width: 150,
        ml: "auto",
      }}
      disabled={disable}
    >
      {
        <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
          Checkout
        </Typography>
      }
    </Button>
  );
}

export default CartContent;
