import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Stack } from "@mui/material";
import theme from "../Theme";
import { useDateRange } from "../contexts/DateRangeContext";
import NumberFormat from "../utils/NumberFormat";

function StatisticBox({ name, amt, prevAmt, isMoney }) {
  const [versus, setVersus] = useState("--");
  const [compareStatus, setCompareStatus] = useState("none");
  const { dateRange } = useDateRange(); // Access the context values
  const startDate = dateRange.startDate;
  const endDate = dateRange.endDate;
  const [percentage, setPercentage] = useState(
    (((amt - prevAmt) / prevAmt) * 100).toFixed(2)
  );

  // Recalculate the percentage whenever amt and prevAmt change
  useEffect(() => {
    const newPercentage = (((amt - prevAmt) / prevAmt) * 100).toFixed(2);
    setPercentage(newPercentage);
  }, [amt, prevAmt]);

  //Set Versus
  const calculateVersus = useCallback(() => {
    const today = new Date();

    // Check if the selected range corresponds to today
    if (
      startDate.toDateString() === today.toDateString() &&
      endDate.toDateString() === today.toDateString()
    ) {
      setVersus("Yesterday");
    }
    // For other cases, display "Custom Range"
    else {
      const numDaysSelected =
        Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      setVersus(`Last ${numDaysSelected} Days`);
    }
  }, [startDate, endDate]);

  //Set Percentage
  useEffect(() => {
    setPercentage((((amt - prevAmt) / prevAmt) * 100).toFixed(2));
    // Calculate Versus based on startDate and endDate
    calculateVersus();
  }, [amt, prevAmt, startDate, endDate, calculateVersus]);

  // Set Compare Status based on amt and prevAmt
  useEffect(() => {
    if (amt > prevAmt) {
      setCompareStatus("increase");
    } else if (amt < prevAmt) {
      setCompareStatus("decrease");
    } else {
      setCompareStatus("none");
    }
  }, [amt, prevAmt]);

  return (
    <Box
      sx={{
        ...theme.components.box.sectionContainer,
        width: 250,
        minHeight: 110,
        px: 2,
        py: 1,
        textAlign: "left",
      }}
    >
      <Stack spacing={1} width={"100%"}>
        <Stack spacing={-0.5}>
          <Typography
            variant="body1"
            sx={{
              color: "#44444499",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="sectionHeader"
            sx={{
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            <NumberFormat value={amt} isPeso={isMoney}  />
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          sx={{
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#44444499", width: "100%", fontSize: 16 }}
          >
            vs {versus}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color:
                compareStatus === "increase" && percentage !== 0
                  ? "#7A9163"
                  : compareStatus === "decrease" && percentage !== 0
                  ? "#AB3130"
                  : "#444",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {percentage}%
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default StatisticBox;
