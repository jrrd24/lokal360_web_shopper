import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import MapData from "../../../../utils/MapData";
import ShopCategoryContainer from "../../../../components/Containers/ShopCategoryContainer";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import theme from "../../../../Theme";

function ShopCategories({
  selectedShopID,
  setSelectedCategory,
  selectedCategory,
}) {
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: shopCategoryData, isLoading } = useCustomQuery(
    "getAllShopCategory",
    () =>
      axiosPrivate
        .get(
          `/api/shopper_get/shop/all_shop_categories/?shopID=${selectedShopID}`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  const shopCategoryOptions = [
    { shopCategoryID: 0, shop_category_name: "All" },
    ...shopCategoryData,
  ];

  return (
    <div>
      {shopCategoryOptions.length > 0 ? (
        <MapData
          inputData={shopCategoryOptions}
          component={(props) => (
            <ShopCategoryContainer
              {...props}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          )}
          horizontal
          height={90}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ShopCategories;
