import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import MyOrdersContent from "./MyOrdersContent";

function MyOrders() {
  //Set Page Title
  useEffect(() => {
    document.title = `My Orders | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, []);
  return <CustomAppbar component={MyOrdersContent} />;
}

export default MyOrders;
