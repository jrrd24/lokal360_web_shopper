import { Edit, Loyalty } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import UnderConstruction from "../../../../components/Loading/UnderContruction";

function ApplyVoucher({ selectedVoucher, setSelectedVoucher }) {
  return (
    <div>
      <Box sx={{ ...classes.detailsContainer }}>
        {/**Section Name */}
        <Box sx={{ ...classes.sectionName }}>
          <Box>
            <Box sx={{ ...classes.sectionName }}>
              <Loyalty sx={{ ...classes.logo }} />
              <Typography variant="sectionTitleSmall">Apply Voucher</Typography>
            </Box>
          </Box>

          <IconButton sx={{ ...classes.iconButton }} disabled="true">
            <Edit />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}

const classes = {
  detailsContainer: {
    backgroundColor: theme.palette.background.paper,
    p: 2,
    borderRadius: 5,
  },

  sectionName: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  logo: {
    height: 30,
    width: 30,
    color: theme.palette.primary.main,
  },

  iconButton: {
    ml: "auto",
  },
};
export default ApplyVoucher;
