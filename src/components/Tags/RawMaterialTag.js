import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";
import { Grass } from "@mui/icons-material";

function RawMaterialTag({ small }) {
  const color = theme.palette.secondary.main;
  const bgColor = `${color}1A`;
  const textColor = "white";
  return (
    <div>
      <Box
        sx={{
          border: `2px solid ${color}`,
          maxWidth: 150,
          textAlign: "center",
          backgroundColor: bgColor,
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          pt: small ? 0 : 0.3,
          gap: "8px",
          px: 0.5,
          userSelect: "none",
          backgroundColor: small ? color : theme.palette.background.paper,
        }}
      >
        <Grass sx={{ color: small ? textColor : color }} />

        <Typography
          variant="subtitle1"
          color={small ? textColor : color}
          fontWeight={600}
          fontSize={16}
        >
          Raw Material
        </Typography>
      </Box>
    </div>
  );
}

export default RawMaterialTag;
