import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import theme from "../../../../Theme";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import PartnerProductContainer from "../../../../components/Containers/PartnerProductContainer";

const NewArrivals = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productData, isLoading } = useCustomQuery(
    "getNewArrivals",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_products/?filterNewArrival=true&limit=6`)
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
        p: isMd ? 2 : 4,
        marginLeft: 2,
        "@media (max-width: 900px)": { marginLeft: 0 },
      }}
    >
      <Box direction={"column"} sx={{ textAlign: "left" }}>
        <Typography variant="sectionTitle" color={theme.palette.info.main}>
          New Arrivals
        </Typography>
      </Box>

      <Swiper
        slidesPerView={2}
        spaceBetween={8}
        lazy={true}
        autoplay={{
          delay: 3500,
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
        modules={[Autoplay, Pagination]}
        style={{
          "--swiper-pagination-color": theme.palette.info.main,
          "--swiper-pagination-bullet-size": "10px",
          paddingBottom: 40,
        }}
      >
        {productData.map((product) => (
          <SwiperSlide>
            <PartnerProductContainer
              key={product.productID}
              data={product}
              color={theme.palette.info.main}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

const classes = {
  container: {
    pt: 4,
    marginY: 1,
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    userSelect: "none",
    border: `1px solid ${theme.palette.info.main}`,
    borderBottom: `solid 6px ${theme.palette.info.main}`,
  },
};

export default NewArrivals;
