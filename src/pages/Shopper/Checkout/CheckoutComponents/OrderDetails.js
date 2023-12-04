import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeliveryAddress from "./DeliveryAddress";
import ShippingOptions from "./ShippingOptions";
import PaymentOptions from "./PaymentOptions";
import ApplyVoucher from "./ApplyVoucher";
import OrderSummary from "./OrderSummary";

function OrderDetails({
  checkoutItemsData,
  selectedShipping,
  setSelectedShipping,
  shippingPrice,
  setShippingPrice,
  deliveryAddress,
  setDeliveryAddress,
  paymentMethod,
  setPaymentMethod,
  selectedVoucher,
  setSelectedVoucher,
}) {


  useEffect(() => {
    selectedShipping === "Delivery"
      ? setShippingPrice(20)
      : setShippingPrice(0);
  }, [selectedShipping]);



  return (
    <Stack spacing={3}>
      <DeliveryAddress setDeliveryAddress={setDeliveryAddress} />

      {/**Shipping Options */}
      <ShippingOptions
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
        shippingPrice={shippingPrice}
        setShippingPrice={setShippingPrice}
      />

      {/**Payment Options */}
      <PaymentOptions
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      {/**Vouchers */}
      <ApplyVoucher
        selectedVoucher={selectedVoucher}
        setSelectedVoucher={setSelectedVoucher}
      />

      {/**Order Summary*/}
      <OrderSummary
        checkoutItemsData={checkoutItemsData}
        shippingFee={shippingPrice}
      />
    </Stack>
  );
}

export default OrderDetails;
