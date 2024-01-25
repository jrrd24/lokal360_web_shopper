import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import React, { useEffect, useState } from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import ShopCategories from "./ShopCategories";
import NothingFound from "../../../../components/Loading/NothingFound";
import theme from "../../../../Theme";

function AllShopProducts({ selectedShopID }) {
  //API CALL GET ALL SHOP PRODUCTS
  const { useCustomQuery, queryClient } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(selectedCategory);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axiosPrivate
        .get(
          `/api/shopper_get/all_products/?shopID=${selectedShopID}&${
            selectedCategory === 0
              ? ``
              : `filterShopCategory=${selectedCategory}`
          }`
        )
        .then((res) => res.data);
      setProductsData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        {/*Section Name */}
        <Box direction={"row"} sx={{ ...theme.components.box.sectionName }}>
          <Typography variant="sectionTitle">Products</Typography>
        </Box>

        <ShopCategories
          selectedShopID={selectedShopID}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </Stack>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {isLoading ? (
          <LoadingCircle />
        ) : productsData.length !== 0 ? (
          <Grid container spacing={2}>
            {productsData?.map((product, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index} sx={{ my: 2 }}>
                <ProductPreview data={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NothingFound />
        )}
      </Box>
    </Stack>
  );
}

export default AllShopProducts;
