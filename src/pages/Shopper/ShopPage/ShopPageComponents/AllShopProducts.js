import { Box, Grid, Stack } from "@mui/material";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import React, { useEffect, useState } from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import ShopCategories from "./ShopCategories";

function AllShopProducts({ selectedShopID }) {
  //API CALL GET ALL SHOP PRODUCTS
  const { useCustomQuery, queryClient } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axiosPrivate
        .get(
          `/api/shopper_get/all_products/?shopID=${selectedShopID}&filterShopCategory=${selectedCategory}`
        )
        .then((res) => res.data);
      setProductsData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [selectedCategory]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Stack spacing={3}>
      <ShopCategories
        selectedShopID={selectedShopID}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid container spacing={2}>
          {productsData?.map((product, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index} sx={{ my: 2 }}>
              <ProductPreview data={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default AllShopProducts;
