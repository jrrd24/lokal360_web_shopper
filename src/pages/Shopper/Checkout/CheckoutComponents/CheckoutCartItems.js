import React, { useEffect } from "react";
import CartItemContainer from "../../../../components/Containers/CartItemContainer";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import useAuth from "../../../../hooks/useAuth";

function CheckoutCartItems({ selectedCartItemIDs, setCheckoutItemsData }) {
  // API CALL GET ALL CART ITEMS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const { data, isLoading } = useCustomQuery(
    "getCartItemsCheckout",
    () =>
      axiosPrivate
        .get(
          `api/buy_product/get_cart/?shopperID=${auth.shopperID}&filterCheckout=${selectedCartItemIDs}`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  useEffect(() => {
    setCheckoutItemsData(data?.CartItemsByShop);
  }, [data]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      {data.CartItemsByShop.map((shop) => (
        <CartItemContainer
          key={shop.shop_name}
          data={shop}
          selectedCartItemIDs={selectedCartItemIDs}
          displayOnly
        />
      ))}
    </div>
  );
}

export default CheckoutCartItems;
