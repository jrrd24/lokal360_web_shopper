import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import PartnerShopContainer from "../../../../components/Containers/PartnerShopContainer";
import theme from "../../../../Theme";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import PartnerProductContainer from "../../../../components/Containers/PartnerProductContainer";

const BestSellers = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productData, isLoading } = useCustomQuery(
    "getBestSellers",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_products/?filterBestSellers=true&limit=10`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Stack
      spacing={3}
      sx={{
        ...classes.container,
        "@media (max-width: 900px)": { marginLeft: 0 },
      }}
    >
      <Box direction={"column"} sx={{ textAlign: "center" }}>
        <Typography
          variant="sectionTitle"
          color={"#FF7F00"}
          fontSize={isSmallScreen ? 28 : 32}
        >
          Best Sellers 🔥
        </Typography>
      </Box>

      <Swiper
        slidesPerView={2}
        spaceBetween={8}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination]}
        style={{
          "--swiper-pagination-color": theme.palette.secondary.main,
          "--swiper-pagination-bullet-size": "10px",
          paddingBottom: 40,
        }}
      >
        {productData.map((product) => (
          <SwiperSlide>
            <PartnerProductContainer
              key={product.productID}
              data={product}
              color={theme.palette.secondary.main}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

const classes = {
  container: {
    p: 2,
    marginLeft: 2,
    pt: 2,
    marginY: 1,
    borderRadius: 3,
    backgroundColor: theme.palette.secondary.light,
    userSelect: "none",
    border: `3px solid ${theme.palette.secondary.main}`,
    borderBottom: `solid 9px ${theme.palette.secondary.main}`,
  },
};

export default BestSellers;
