import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { state } = location;
  const selectedCartItemIDs = state ? state.selectedCartItemIDs : null;
  return <div>{selectedCartItemIDs}</div>;
}

export default Checkout;
