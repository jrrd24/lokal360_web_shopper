import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderContainer from "../../../../components/Containers/OrderContainer";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import useAuth from "../../../../hooks/useAuth";

function DisplayOrders({ selectedFilter }) {
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  //API CALL GET ALL ORDERS
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axiosPrivate
        .get(
          `api/buy_product/get_all_shop_order/?shopperID=${auth.shopperID}&filterOrder=${selectedFilter}`
        )
        .then((res) => res.data);
      setOrdersData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [selectedFilter]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid container spacing={0} sx={{ display: "flex", flexWrap: "wrap" }}>
        {ordersData.map((order, index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            key={index}
            sx={{
              my: 2,

              "@media (max-width: 900px)": {
                justifyContent: "center",
                my: 2,
              },
            }}
          >
            <OrderContainer data={order} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DisplayOrders;
