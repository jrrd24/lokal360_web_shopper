import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import MyAddressesContent from "./MyAddressesContent";

function MyAddresses() {
  //Set Page Title
  useEffect(() => {
    document.title = `My Addresses | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <CustomAppbar component={() => <MyAddressesContent />} />;
}

export default MyAddresses;
