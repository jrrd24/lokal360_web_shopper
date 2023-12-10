import React, { useState } from "react";
import CartItemContainer from "../../../../components/Containers/CartItemContainer";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import useAuth from "../../../../hooks/useAuth";

function CartItems({
  selectedShopID,
  setSelectedShopID,
  selectedCartItemIDs,
  setSelectedCartItemIDs,
}) {
  // API CALL GET ALL CART ITEMS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  // Function to handle shop selection change
  const handleShopSelection = (shopID) => {
    setSelectedShopID(shopID);
    setSelectedCartItemIDs([]);
  };

  // Function to handle selection change and update selectedCartItemIDs
  const handleCartItemSelection = (cartItemID) => {
    setSelectedCartItemIDs((prevSelected) => {
      if (prevSelected.includes(cartItemID)) {
        return prevSelected.filter((id) => id !== cartItemID);
      } else {
        return [...prevSelected, cartItemID];
      }
    });
  };

  const { data, isLoading } = useCustomQuery(
    "getCartItems",
    () =>
      axiosPrivate
        .get(`api/buy_product/get_cart/?shopperID=${auth.shopperID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      {data?.CartItemsByShop.map((shop) => (
        <CartItemContainer
          key={shop.shop_name}
          data={shop}
          handleShopSelection={handleShopSelection}
          handleCartItemSelection={handleCartItemSelection}
          selectedShopID={selectedShopID}
          selectedCartItemIDs={selectedCartItemIDs}
        />
      ))}
    </div>
  );
}

export default CartItems;
