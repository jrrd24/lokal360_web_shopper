import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../../Theme";
import ProductPreview from "../../../../components/Containers/ProductPreview";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function FeaturedProducts({ selectedShopID }) {
  // API CALL GET ALL FEATURED PROD
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productData, isLoading } = useCustomQuery(
    "getFeaturedProducts",
    () =>
      axiosPrivate
        .get(
          `/api/product/get_all_featured/?shopID=${selectedShopID}&shopperView=true`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (
    !productData ||
    !productData.allFeatured ||
    productData.allFeatured.length === 0
  ) {
    return null;
  }

  return (
    <div>
      {productData.length > 0 ? (
        <Stack spacing={2} direction={"column"}>
          {/*Section Name */}
          <Box direction={"row"} sx={{ ...theme.components.box.sectionName }}>
            <Typography variant="sectionTitle">Featured Products</Typography>
          </Box>

          <Swiper
            slidesPerView={1.75}
            spaceBetween={8}
            lazy={true}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              400: {
                slidesPerView: 2.25,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2.75,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.75,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4.75,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination, Navigation]}
            style={{
              "--swiper-pagination-color": theme.palette.primary.main,
              "--swiper-pagination-bullet-size": "10px",
              "--swiper-navigation-size": "25px",
              "--swiper-navigation-top-offset": "97%",
              "--swiper-navigation-sides-offset": "10px",
              "--swiper-navigation-color": theme.palette.primary.main,
              paddingBottom: 45,
            }}
          >
            {productData?.allFeatured.map((product) => (
              <SwiperSlide>
                <ProductPreview key={product.productID} data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      ) : (
        ""
      )}
    </div>
  );
}

export default FeaturedProducts;
