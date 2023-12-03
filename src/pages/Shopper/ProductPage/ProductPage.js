import React, { useEffect, useState } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import ProductPageContent from "./ProductPageContent";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { productID } = useParams();
  const selectedProductID = parseInt(productID, 10);
  const [productName, setProductName] = useState("Product");
  //Set Page Title
  useEffect(() => {
    document.title = `${productName} | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, [productName]);

  return (
    <CustomAppbar
      component={() => (
        <ProductPageContent
          selectedProductID={selectedProductID}
          setProductName={setProductName}
        />
      )}
    />
  );
}

export default ProductPage;
