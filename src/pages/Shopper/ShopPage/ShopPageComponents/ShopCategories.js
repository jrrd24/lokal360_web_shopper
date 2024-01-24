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

  return (
    <div>
      {shopCategoryData.length > 0 ? (
        <MapData
          inputData={shopCategoryData}
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

      {/* {shopCategoryData.length > 0 ? (
        <Swiper
          slidesPerView={1.75}
          spaceBetween={8}
          lazy={true}
          navigation={true}
          breakpoints={{
            400: {
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5.2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 5.75,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          style={{
            "--swiper-navigation-size": "25px",
            "--swiper-navigation-top-offset": "50%",
            "--swiper-navigation-sides-offset": "10px",
            "--swiper-navigation-color": theme.palette.primary.main,
            userSelect: "none",
          }}
        >
          {shopCategoryData.map((shopCategory) => (
            <SwiperSlide>
              <ShopCategoryContainer
                key={shopCategory.shopCategoryID}
                data={shopCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default ShopCategories;
