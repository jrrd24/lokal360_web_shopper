import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterAlt } from "@mui/icons-material";
import FilterControls from "./FilterControls";
import { SwipeableDrawer } from "@mui/material";

export const FilterModal = ({
  category,
  categoryID,
  query,
  type,
  prodType,
  handleSetValues,
}) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 290, mt: 2 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <FilterControls
        category={category}
        categoryID={categoryID}
        query={query}
        type={type}
        prodType={prodType}
        handleSetValues={handleSetValues}
      />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          variant="outlined"
          sx={{ height: 55 }}
          onClick={toggleDrawer("left", true)}
        >
          <FilterAlt />
        </Button>

        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          PaperProps={{
            sx: { borderRadius: 2 },
          }}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
