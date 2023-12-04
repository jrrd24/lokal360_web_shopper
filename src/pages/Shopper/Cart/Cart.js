import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import CartContent from "./CartContent";

function Cart() {
  //Set Page Title
  useEffect(() => {
    document.title = `Cart | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, []);
  return <CustomAppbar component={CartContent} isCart />;
}

export default Cart;
