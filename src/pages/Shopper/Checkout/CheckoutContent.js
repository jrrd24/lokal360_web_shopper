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
import CheckoutCartItems from "./CheckoutComponents/CheckoutCartItems";
import { Check } from "@mui/icons-material";
import OrderDetails from "./CheckoutComponents/OrderDetails";
import useAlert from "../../../hooks/useAlert";
import CustomAlert from "../../../components/CustomAlert";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { LoadingCircle } from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

function CheckoutContent({ selectedCartItemIDs }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [checkoutItemsData, setCheckoutItemsData] = useState(null);
  // handle state for shipping options
  const [selectedShipping, setSelectedShipping] = useState("Delivery");
  const [shippingPrice, setShippingPrice] = useState(20);
  const [deliveryAddress, setDeliveryAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const orderItems =
    checkoutItemsData?.[0]?.cartItems &&
    Array.isArray(checkoutItemsData[0].cartItems)
      ? checkoutItemsData[0].cartItems
      : [];
  const cartItemIDs = orderItems.map((item) => item.cartItemID);

  console.log("SID", selectedCartItemIDs);
  // Handle Alert Click
  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  //API CALL CREATE ORDER
  const { useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useCustomMutate(
    "createOrder",
    async (data) => {
      await axiosPrivate.post(
        `api/buy_product/create_order/?shopperID=${auth.shopperID}`,
        data
      );
    },
    ["getAllOrder"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        navigate("/profile/my_orders");
      },
    }
  );

  const handleCheckout = () => {
    const requestData = {
      deliveryAddressID: deliveryAddress,
      shopperClaimedVoucherID: selectedVoucher,
      shippingMethod: selectedShipping,
      shippingFee: shippingPrice,
      orderItems: cartItemIDs,
    };
    mutate(requestData);
  };

  return (
    <div>
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

              <Typography variant="sectionTitleBig">Checkout</Typography>

              <ButtonConfirmOrder
                onClickAction={handleCheckout}
                disable={!selectedCartItemIDs.length}
              />
            </Box>

            <CheckoutCartItems
              selectedCartItemIDs={selectedCartItemIDs}
              setCheckoutItemsData={setCheckoutItemsData}
            />
            <OrderDetails
              checkoutItemsData={checkoutItemsData}
              selectedShipping={selectedShipping}
              setSelectedShipping={setSelectedShipping}
              shippingPrice={shippingPrice}
              setShippingPrice={setShippingPrice}
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              selectedVoucher={selectedVoucher}
              setSelectedVoucher={setSelectedVoucher}
            />
          </Stack>
        </Box>
      </Box>

      {/*Display Alert */}
      <CustomAlert
        open={openAlert}
        setOpen={hideAlert}
        severity={severity}
        alertMsg={alertMsg}
      />
    </div>
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

function ButtonConfirmOrder({ onClickAction, disable }) {
  return (
    <Button
      variant="contained"
      startIcon={<Check />}
      onClick={onClickAction}
      sx={{
        borderRadius: 5,
        width: 180,
        ml: "auto",
      }}
      disabled={disable}
    >
      {
        <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
          Confirm Order
        </Typography>
      }
    </Button>
  );
}

export default CheckoutContent;
