import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import theme from "../../../Theme";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { LoadingCircle } from "../../../components/Loading/Loading";
import ProductPreview from "../../../components/Containers/ProductPreview";

function SearchResultContent() {
  const { query } = useParams();

  // API CALL GET SEARCH RESULTS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axiosPrivate
        .get(
          `/api/product/shop_mgmt/search/?query=${query}`
        )
        .then((res) => res.data);
      setSearchResults(data);
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      <Box sx={{ ...theme.components.box.pageContainer }}>
        <Box sx={{ ...theme.components.box.mainContent }}>
          <Stack spacing={3} sx={{ ...classes.resultsContainer }}>
            {/* QUERY AND COUNT */}
            <div>
              <Typography variant="sectionTitle">{query}</Typography>
              <Typography variant="subtitle1">
                <Typography color={"primary"} component={"span"}>
                  <b>{searchResults.length}</b>
                </Typography>{" "}
                Total Results
              </Typography>
            </div>

            {/* RESULT */}
            <Grid
              container
              spacing={0}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              {searchResults.map((product, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={index}
                  sx={{
                    my: 2,
                    display: "flex",
                    "@media (max-width: 900px)": {
                      justifyContent: "center",

                      my: 2,
                    },
                  }}
                >
                  <ProductPreview data={product} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

const classes = {
  resultsContainer: {
    pt: 2,
    px: 2,
    width: "800px",
    textAlign: "left",
    display: "flex",
    "@media (max-width: 900px)": {
      justifyContent: "center",
      width: "100%",
    },
  },
};
export default SearchResultContent;
