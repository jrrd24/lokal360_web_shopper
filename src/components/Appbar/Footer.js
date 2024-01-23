import { Box, Divider, Stack, Typography, Link } from "@mui/material";
import React from "react";
import theme from "../../Theme";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Stack
      sx={{
        background: theme.palette.background.paper,
        borderTop: `3px solid ${theme.palette.primary.main}`,
        p: 3,
      }}
      spacing={1}
    >
      <Box
        sx={{ ...classes.horizontalContainer, userSelect: "none", gap: "16px" }}
      >
        <img
          src={require("../../assets/lokal360_Logo.png")}
          width={30}
          height={50}
          style={{ objectFit: "cover" }}
        />
        <Typography variant="h6" fontWeight={600} color={"primary"}>
          Lokal 360
        </Typography>
      </Box>

      <Box sx={{ ...classes.horizontalContainer, gap: "8px" }}>
        <Link href="#" underline="hover">
          About Us
        </Link>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Link href="/#" underline="hover">
          Go To Home
        </Link>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Link href="#" underline="hover">
          Start Selling
        </Link>
      </Box>

      <Typography variant="subtitle2">
        © {year} Lokal 360. All Rights Reserved
      </Typography>
    </Stack>
  );
};

const classes = {
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default Footer;
