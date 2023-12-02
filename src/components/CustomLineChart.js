import React, { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Stack } from "@mui/material";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import ButtonDownloadChart from "./Buttons/ButtonDownloadChart";

const CustomLineChart = ({ data, lines, downloadFileName }) => {
  // useCurrentPng usage (isLoading is optional)
  const [getPng, { ref: productStatusRef, isLoading }] = useCurrentPng({
    backgroundColor: "#ffffff",
    scale: 5,
  });
  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, downloadFileName);
    }
  }, [getPng]);
  return (
    <Stack spacing={3}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          ref={productStatusRef}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/*Map All Lines */}
          {lines.map((lines, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={lines.dataKey}
              stroke={lines.stroke}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <ButtonDownloadChart handleOnClick={handleDownload} isLoading={isLoading} />
    </Stack>
  );
};

export default CustomLineChart;
