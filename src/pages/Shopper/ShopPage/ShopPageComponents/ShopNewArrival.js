import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import theme from "../../../../Theme";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ShopNewArrival = ({ selectedShopID }) => {
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productData, isLoading } = useCustomQuery(
    "getShopNewArrivals",
    () =>
      axiosPrivate
        .get(
          `/api/shopper_get/all_products/?filterNewArrival=true&limit=10&shopID=${selectedShopID}`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      <Stack spacing={2} direction={"column"} sx={{ ...classes.container }}>
        {/*Section Name */}
        <Box direction={"row"} sx={{ ...theme.components.box.sectionName }}>
          <Typography variant="sectionTitle">New Arrivals</Typography>
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
          {productData.map((product) => (
            <SwiperSlide>
              <ProductPreview key={product.productID} data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </div>
  );
};

const classes = {
  container: {
    p: 3,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "Left",
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
  },
};

export default ShopNewArrival;
