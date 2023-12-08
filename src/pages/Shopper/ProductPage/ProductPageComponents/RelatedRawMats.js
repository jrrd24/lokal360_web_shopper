import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MapData from "../../../../utils/MapData";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import theme from "../../../../Theme";

function RelatedRawMats({ categoryID }) {
  // API CALL GET ALL FEATURED PROD
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productData, isLoading } = useCustomQuery(
    "getRelatedRawMats",
    () =>
      axiosPrivate
        .get(
          `api/shopper_get/all_products/?filterRawMats=true&filterCategoryID=${categoryID}`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Stack
      spacing={2}
      direction={"column"}
      sx={{ ...classes.detailsContainer }}
    >
      {/*Section Name */}
      <Box direction={"row"} sx={{ ...theme.components.box.sectionName }}>
        <Typography variant="sectionTitle">Related Raw Materials</Typography>
      </Box>

      <MapData
        inputData={productData}
        component={ProductPreview}
        idName={"productID"}
        horizontal
        height={350}
        sortByField={"total_sold"}
      />
    </Stack>
  );
}

const classes = {
  detailsContainer: {
    backgroundColor: theme.palette.background.paper,
    p: 2,
    borderRadius: 5,
    width: "100%",
  },
};
export default RelatedRawMats;
