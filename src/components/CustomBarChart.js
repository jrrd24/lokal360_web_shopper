import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import TruncateString from "../utils/TruncateString";
import NumberFormat from "../utils/NumberFormat";
import Styles from "../css/Styles.module.css";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  backgroundColor: "#FAFAFA",

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const getColorForIndex = (index) => {
  if (index === 0) return "#F35B04";
  if (index === 1) return "#F18701";
  if (index === 2) return "#F7B801";
  return "#7678ED";
};

const CustomBarChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    // Handle the case when data is undefined or not an array
    return <div>No data available</div>;
  }
  // Sort the data in descending order based on the 'total_sold' property
  const sortedData = data.slice().sort((a, b) => b.total_sold - a.total_sold);
  const sumAmtSold = sortedData.reduce(
    (sum, orderedData) => sum + orderedData.total_sold,
    0
  );
  const limitedData = sortedData.slice(0, 5);

  return (
    <Box sx={{ width: "100%", textAlign: "left" }}>
      {limitedData.map((orderedData, index) => {
        const percentage = (
          (orderedData.total_sold / sumAmtSold) *
          100
        ).toFixed(2);

        return (
          <Box
            key={orderedData.shop_category_name}
            className={`${Styles.changeBG}`}
            sx={{ p: 2, width: "100%" }}
          >
            <Stack
              spacing={0}
              direction={"column"}
              alignItems="flex-start"
              sx={{ pb: 0.5 }}
            >
              <Typography variant="sectionTitleSmall">
                <TruncateString str={orderedData.shop_category_name} n={30} />
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#44444499", textAlign: "start" }}
              >
                Products Sold:{" "}
                <Typography component={"span"} sx={{ fontWeight: 700 }}>
                  <NumberFormat
                    value={orderedData.total_sold ? orderedData.total_sold : 0}
                  />{" "}
                  &nbsp; | &nbsp;
                  {percentage}%
                </Typography>
              </Typography>
            </Stack>
            <BorderLinearProgress
              key={orderedData.shop_category_name}
              variant="determinate"
              value={parseFloat(percentage)} // Parse the percentage to a float
              sx={{
                [`& .${linearProgressClasses.bar}`]: {
                  backgroundColor: getColorForIndex(index),
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CustomBarChart;
