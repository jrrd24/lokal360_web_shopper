import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { BASE_URL } from "../../../../api/Api";
import { Box, Stack, Typography } from "@mui/material";
import MapData from "../../../../utils/MapData";
import VoucherContainer from "../../../../components/Containers/VoucherContainer";
import theme from "../../../../Theme";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

function ActiveVouchers({ selectedShopID }) {
  // API CALL GET ALL ACTIVE SHOP VOUCHERS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: voucherData, isLoading } = useCustomQuery(
    "getActiveShopVoucher",
    () =>
      axiosPrivate
        .get(`/api/voucher/get_all_active/?shopID=${selectedShopID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (!voucherData || voucherData.length === 0) {
    return null;
  }

  const processedVouchers = voucherData.map((voucher) => {
    const startDate = new Date(voucher.start_date);
    const endDate = new Date(voucher.end_date);
    const currentDate = new Date();

    const isActive = currentDate >= startDate && currentDate <= endDate;

    return {
      shopName: voucher.shop_name,
      logo: `${BASE_URL}/${voucher.logo_img_link}`,
      value: voucher.discount_amount,
      minSpend: voucher.min_spend,
      validUntil: endDate,
      is_active: isActive,
      type: voucher.promo_type,
    };
  });

  return (
    <Stack spacing={1} direction={"column"} sx={{ ...classes.main }}>
      {/*Section Name */}
      {/* <Stack direction={"row"} sx={{ ...classes.sectionName }}>
        <Typography variant="sectionTitle">Special Deals For You</Typography>
      </Stack> */}

      <Box>
        {/* <MapData
          inputData={processedVouchers}
          component={VoucherContainer}
          sortByField={"start_date"}
          idName={"voucherID"}
          horizontal
          height={190}
        /> */}

        <Swiper
          slidesPerView={1.15}
          spaceBetween={8}
          lazy={true}
          navigation={true}
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
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.05,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3.25,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 2.1,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          style={{
            "--swiper-pagination-color": theme.palette.primary.main,
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-navigation-size": "25px",
            "--swiper-navigation-top-offset": "92%",
            "--swiper-navigation-sides-offset": "10px",
            "--swiper-navigation-color": theme.palette.primary.main,
            paddingBottom: 45,
          }}
        >
          {processedVouchers.map((voucher) => (
            <SwiperSlide>
              <VoucherContainer key={voucher.voucherID} data={voucher} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
}

const classes = {
  main: {
    width: "100%",
    pt: 2,
    "@media (max-width: 1516px)": {
      justifyContent: "center",
    },
  },

  sectionName: {
    alignItems: "baseline",
    justifyContent: "space-between",
  },
};
export default ActiveVouchers;
