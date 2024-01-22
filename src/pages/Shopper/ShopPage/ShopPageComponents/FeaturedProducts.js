import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../../Theme";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import MapData from "../../../../utils/MapData";

function FeaturedProducts({ selectedShopID }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
      <Stack spacing={2} direction={"column"}>
        {/*Section Name */}
        <Box direction={"row"} sx={{ ...theme.components.box.sectionName }}>
          <Typography variant="sectionTitle">Featured Products</Typography>
        </Box>

        <MapData
          inputData={productData?.allFeatured}
          component={ProductPreview}
          idName={"productID"}
          horizontal
          height={isSmallScreen ? 350 : 400}
          sortByField={"total_sold"}
          containerStyles={{ width: 210 }}
        />
      </Stack>
    </div>
  );
}

export default FeaturedProducts;
