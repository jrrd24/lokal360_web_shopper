import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { DateRange } from "@mui/icons-material";
import { useDateRange } from "../contexts/DateRangeContext";

function formatSQLDate(date) {
  if (!date) return "";

  // Convert to local time in Philippines Timezone (PHT)
  const options = {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const localDate = date.toLocaleString("en-US", options);

  return localDate;
}

function DisplayDateSelection() {
  const { dateRange } = useDateRange();

  const startDate = formatSQLDate(dateRange.startDate);
  const endDate = formatSQLDate(dateRange.endDate);

  return (
    <Stack
      spacing={1}
      direction={"row"}
      sx={{
        minWidth: 140,
        maxWidth: 160,
        maxHeight: 66,
        minHeight: 56,
        backgroundColor: "#F2F2F2",
        p: 1,
        alignItems: "center",
        justifyItems: "center",
        border: "1px solid #444",
        borderRadius: 2,
      }}
    >
      <Box>
        <DateRange />
      </Box>
      <Box>
        <Typography variant="h7">
          {startDate} {endDate === "" ? "" : endDate === startDate ? "" : "to"}{" "}
        </Typography>
        <Typography variant="h7">
          {endDate === startDate ? "" : endDate}{" "}
        </Typography>
      </Box>
    </Stack>
  );
}

export default DisplayDateSelection;
