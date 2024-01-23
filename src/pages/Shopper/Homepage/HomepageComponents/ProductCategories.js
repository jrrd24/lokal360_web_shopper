import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import ProdCategoryContainer from "../../../../components/Containers/ProdCategoryContainer";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import { LoadingCircle } from "../../../../components/Loading/Loading";

const ProductCategories = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: categoryData, isLoading } = useCustomQuery(
    "getAllCategory",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_categories`)
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
        p: isSmallScreen ? 2 : 4,
      }}
    >
      <Typography variant="sectionTitle" color={"primary"} textAlign={"left"}>
        Categories
      </Typography>

      <Swiper
        injectStyles={{ maxHeight: "400px" }}
        slidesPerView={2.25}
        speed={4000}
        lazy={true}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={32}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        breakpoints={{
          400: {
            slidesPerView: 2.5,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 3.25,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3.75,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5.25,
            spaceBetween: 0,
          },
          1200: {
            slidesPerView: 5.5,
            spaceBetween: 0,
          },
        }}
        modules={[Autoplay]}
        style={{
          "--swiper-pagination-color": theme.palette.primary.main,
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-wrapper-transition-timing-function": "linear",
          // paddingBottom: 40,
        }}
      >
        {categoryData.map((category) => (
          <SwiperSlide>
            <ProdCategoryContainer key={category.categoryID} data={category} />
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
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
  },
};

export default ProductCategories;
