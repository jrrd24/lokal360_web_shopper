import { Box, Grid, Link, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../components/Loading/Loading";
import ProductPreview from "../../../components/Containers/ProductPreview";
import NothingFound from "../../../components/Loading/NothingFound";
import ShopPreview from "../../../components/Containers/ShopPreview";
import theme from "../../../Theme";
import FilterControls from "./FilterControls";
import SortControls from "./SortControls";
import { FilterModal } from "./FilterModal";

const SearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [category, setCategory] = useState(searchParams.get("category"));
  const [categoryID, setCategoryID] = useState(searchParams.get("catID"));
  const [type, setType] = useState(searchParams.get("type"));
  const [prodType, setProdType] = useState(searchParams.get("ptype"));
  const [selectedSort, setSelectedSort] = useState(1);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  //Handle Changes
  useEffect(() => {
    setQuery(searchParams.get("query"));
    setCategory(searchParams.get("category"));
    setType(searchParams.get("type"));
    setCategoryID(searchParams.get("catID"));
    setProdType(searchParams.get("ptype"));
  }, [searchParams]);

  //Set Document Title
  useEffect(() => {
    document.title = `${
      query ? query : category ? category : type !== "null" ? type : "All"
    } - Result | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, [query, type, category, categoryID, prodType, searchParams]);

  //Api call
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axiosPrivate
        .get(
          `/api/search/?query=${searchParams.get(
            "query"
          )}&categoryID=${searchParams.get(
            "catID"
          )}&type=${type}&prodType=${prodType}&sortType=${selectedSort}`
        )
        .then((res) => res.data);
      setSearchResult(data);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams, query, category, categoryID, type, prodType, selectedSort]);

  const handleSetValues = (category, categoryID, query, type, prodType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    query && newSearchParams.set("query", query);
    category && newSearchParams.set("category", category);
    categoryID && newSearchParams.set("catID", categoryID);
    type && newSearchParams.set("type", type);
    prodType && newSearchParams.set("ptype", prodType);

    setSearchParams(newSearchParams.toString());
  };

  const noResult =
    (searchResult?.productData?.length === 0 &&
      searchResult?.shopData?.length === 0) ||
    (searchResult?.productData?.length === 0 && type === "Product") ||
    (searchResult?.shopData?.length === 0 && type === "Shop");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={4} sx={{ ...classes.mainContainer }}>
        <Grid
          item
          xs={0}
          md={2.5}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <FilterControls
            category={category}
            categoryID={categoryID}
            query={query}
            type={type}
            prodType={prodType}
            handleSetValues={handleSetValues}
          />
        </Grid>

        <Grid item xs={12} md={9.5}>
          <Box>
            <Typography variant="h4" fontWeight={600} color={"primary"}>
              {noResult
                ? ""
                : query
                ? query
                : category
                ? category
                : prodType
                ? prodType
                : prodType === null && type === "Product"
                ? "Products"
                : prodType === null && type === "Shop"
                ? "Shops"
                : "All"}
            </Typography>
            {!isLoading ? (
              <Stack spacing={3}>
                {searchResult?.shopData?.length === 0 ||
                !searchResult?.shopData ? (
                  ""
                ) : (
                  <div>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="h6"
                        color={theme.palette.text.eighty}
                      >
                        Related Shops
                      </Typography>

                      {type === "Shop" ? (
                        ""
                      ) : (
                        <Link
                          onClick={() =>
                            handleSetValues(
                              category,
                              categoryID,
                              query,
                              "Shop",
                              prodType
                            )
                          }
                          underline="hover"
                          sx={{ cursor: "pointer" }}
                        >
                          See All
                        </Link>
                      )}
                    </Box>

                    <Grid
                      container
                      spacing={0}
                      sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                    >
                      {searchResult?.shopData?.map((shop, index) => (
                        <Grid
                          item
                          xs={12}
                          key={index}
                          sx={{ ...classes.shopGrid }}
                        >
                          <ShopPreview data={shop} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}

                {searchResult?.productData?.length === 0 ||
                !searchResult?.productData ? (
                  ""
                ) : (
                  <div>
                    <Box sx={{ ...classes.relatedProductsHeader }}>
                      <Typography
                        variant="h6"
                        color={theme.palette.text.eighty}
                        sx={{ ...classes.relatedProductsTitle }}
                      >
                        Related Products
                      </Typography>

                      <SortControls
                        category={category}
                        categoryID={categoryID}
                        query={query}
                        type={type}
                        prodType={prodType}
                        handleSetValues={handleSetValues}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      {searchResult?.productData?.map((product, index) => (
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          md={3}
                          lg={2.4}
                          key={index}
                          sx={{ my: 2 }}
                        >
                          <ProductPreview data={product} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}

                {!noResult ? (
                  <Stack alignItems="center">
                    <Pagination count={1} color="primary" shape="rounded" />
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>
            ) : (
              <LoadingCircle />
            )}
            {noResult ? <NothingFound /> : ""}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

const classes = {
  mainContainer: {
    width: "95vw",
    maxWidth: "1536px",
    pt: 3,
    pb: 10,
    textAlign: "left",
  },

  shopGrid: {
    display: "flex",
    justifyContent: "center",
    my: 2,
    width: "100%",
  },

  relatedProductsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  relatedProductsTitle: {
    width: "40%",
    display: {
      xs: "none",
      sm: "none",
      md: "block",
    },
  },
};

export default SearchContent;
