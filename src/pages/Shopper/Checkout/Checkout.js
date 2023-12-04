import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import CheckoutContent from "./CheckoutContent";

function Checkout() {
  const location = useLocation();
  const { state } = location;
  const selectedCartItemIDs = state ? state.selectedCartItemIDs : null;

  //Set Document Title
  useEffect(() => {
    document.title = "Checkout | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return (
    <CustomAppbar
      component={() => (
        <CheckoutContent selectedCartItemIDs={selectedCartItemIDs} />
      )}
    />
  );
}

export default Checkout;
