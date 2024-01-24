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
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const PartnerShops = () => {
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: shopData, isLoading } = useCustomQuery(
    "getPartnerShops",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_shops/?isPartner=true`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Stack
      spacing={3}
      sx={{ ...classes.container, p: isMd ? 2 : 4, marginY: isMd ? 3 : 1 }}
    >
      <Box direction={"column"} sx={{ textAlign: "left" }}>
        <Typography variant="sectionTitle" color={"primary"}>
          Partner Shops
        </Typography>
        <Typography variant="subtitle1">
          Browse through our partner shops
        </Typography>
      </Box>

      <Swiper
        slidesPerView={2}
        spaceBetween={8}
        lazy={true}
        navigation={true}
        autoplay={{
          delay: 3000,
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          "--swiper-pagination-color": theme.palette.primary.main,
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-navigation-size": "25px",
          "--swiper-navigation-top-offset": "95%",
          "--swiper-navigation-sides-offset": "10px",
          "--swiper-navigation-color": theme.palette.primary.main,
          paddingBottom: 40,
        }}
      >
        {shopData.map((product) => (
          <SwiperSlide>
            <PartnerShopContainer key={product.productID} data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

const classes = {
  container: {
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    userSelect: "none",
    border: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `solid 6px ${theme.palette.primary.main}`,
  },
};

export default PartnerShops;
