import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import ShopPageContent from "./ShopPageContent";

function ShopPage() {
  const { shopID } = useParams();
  const selectedShopID = parseInt(shopID, 10);
  const [shopName, setShopName] = useState("Shop");

  //Set Page Title
  useEffect(() => {
    document.title = `${shopName} | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, [shopName]);

  return (
    <CustomAppbar
      component={() => (
        <ShopPageContent
          selectedShopID={selectedShopID}
          setShopName={setShopName}
        />
      )}
    />
  );
}

export default ShopPage;
