import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../Theme";
import OrdersFilterContainer from "../../../components/Containers/OrdersFilterContainer";
import OrdersFilter from "./MyOrdersComponents/OrdersFilter";
import DisplayOrders from "./MyOrdersComponents/DisplayOrders";

function MyOrdersContent() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <div>
      <Box sx={{ ...classes.pageContainer }}>
        <Box sx={{ ...classes.main }}>
          <Stack spacing={3} sx={{ textAlign: "left" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ ...classes.sectionTitle }}>
                {!isSmallScreen ? (
                  <Box sx={{ ...classes.sectionTitle }}>
                    <img
                      alt={"logo"}
                      src={require("../../../assets/lokal360_logo_gray.png")}
                      style={{ ...classes.logo }}
                    />

                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ ...classes.divider }}
                    />
                  </Box>
                ) : (
                  ""
                )}

                <Stack>
                  <Typography variant="sectionTitleBig">My Orders</Typography>
                  <Typography variant="subtitle1">
                    View And Manage Your Orders
                  </Typography>
                </Stack>
              </Box>
            </Box>

            {/**Content */}

            <OrdersFilter setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
            <DisplayOrders selectedFilter={selectedFilter} />
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

const classes = {
  pageContainer: {
    ...theme.components.box.pageContainer,
    display: "flex",
    justifyContent: "center",
  },
  main: {
    maxWidth: 900,
    width: 900,
    "@media (max-width: 900px)": { width: "100%" },
  },

  logo: {
    width: 75,
    height: 75,
  },

  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  divider: {
    borderLeftWidth: 2,
    color: theme.palette.text.primary,
  },
};
export default MyOrdersContent;
