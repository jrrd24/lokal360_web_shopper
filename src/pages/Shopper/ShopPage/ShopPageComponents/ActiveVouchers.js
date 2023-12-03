import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { BASE_URL } from "../../../../api/Api";
import { Box, Stack, Typography } from "@mui/material";
import MapData from "../../../../utils/MapData";
import VoucherContainer from "../../../../components/Containers/VoucherContainer";

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
      <Stack direction={"row"} sx={{ ...classes.sectionName }}>
        <Typography variant="sectionTitle">Special Deals For You</Typography>
      </Stack>

      <Box>
        <MapData
          inputData={processedVouchers}
          component={VoucherContainer}
          sortByField={"start_date"}
          idName={"voucherID"}
          horizontal
          height={190}
        />
      </Box>
    </Stack>
  );
}

const classes = {
  main: {
    width: "100%",
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
