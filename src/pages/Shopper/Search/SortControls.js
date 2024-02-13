import React from "react";
import theme from "../../../Theme";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FilterModal } from "./FilterModal";

const SortControls = ({
  category,
  categoryID,
  query,
  type,
  prodType,
  handleSetValues,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <Box width={200} sx={{ ...classes.filterContainer }}>
      <Typography
        variant="subtitle1"
        color={theme.palette.text.sixty}
        sx={{ ...classes.label }}
      >
        Sort By
      </Typography>

      {/**BUTTON GROUP (FOR MD-XL SCREENS) */}
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <ButtonGroup
          disableElevation
          color="primary"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Button
            variant={selectedSort === 1 ? "contained" : "outlined"}
            onClick={() => setSelectedSort(1)}
          >
            <Typography variant="seeAll" sx={{ color: "inherit" }}>
              Recommended
            </Typography>
          </Button>
          <Button
            variant={selectedSort === 2 ? "contained" : "outlined"}
            onClick={() => setSelectedSort(2)}
          >
            <Typography variant="seeAll" sx={{ color: "inherit" }}>
              Latest
            </Typography>
          </Button>
          <Button
            variant={selectedSort === 3 ? "contained" : "outlined"}
            onClick={() => setSelectedSort(3)}
          >
            <Typography variant="seeAll" sx={{ color: "inherit" }}>
              Popular
            </Typography>
          </Button>
        </ButtonGroup>
      </Box>

      {/**SELECT (FOR SM & XS SCREENS) */}
      <Box
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="select-sort-label">Sort By</InputLabel>
          <Select
            labelId="select-sort-label"
            id="select-sort"
            value={selectedSort}
            label="Sort By"
            onChange={(event) => setSelectedSort(event.target.value)}
          >
            <MenuItem value={1}>Recommended</MenuItem>
            <MenuItem value={2}>Latest</MenuItem>
            <MenuItem value={3}>Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/**FILTER BTN (FOR MD - XS SCREENS) */}
      <Box
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <FilterModal
          category={category}
          categoryID={categoryID}
          query={query}
          type={type}
          prodType={prodType}
          handleSetValues={handleSetValues}
        />
      </Box>
    </Box>
  );
};

const classes = {
  filterContainer: {
    width: "100%",
    minHeight: 60,
    borderRadius: 3,
    userSelect: "none",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "right",

    "@media (max-width: 900px)": {
      justifyContent: "space-between",
      gap: 2,
      alignItems: "start",
      maxWidth: "100vw",
      mt: 2,
    },
  },

  label: {
    "@media (max-width: 900px)": {
      textAlign: "left",
      width: "100%",
      pb: 0.5,
    },
    display: { xs: "none", sm: "none", md: "block" },
  },
};

export default SortControls;
