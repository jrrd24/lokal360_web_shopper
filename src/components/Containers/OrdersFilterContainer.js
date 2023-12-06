import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";

function OrdersFilterContainer({ data, setSelectedFilter, selectedFilter }) {
  const onClick = () => {
    setSelectedFilter(data?.name);
  };

  let color = data.color;
  const bgColor = data.color + "1A";

  const hoverStyles =
    selectedFilter !== data?.name
      ? {
          "&:hover": {
            backgroundColor: bgColor,
          },
        }
      : {};

  return (
    <div>
      <ButtonBase
        onClick={onClick}
        sx={{
          height: 50,
          backgroundColor:
            selectedFilter !== data?.name
              ? theme.palette.background.paper
              : bgColor,
          border: selectedFilter !== data?.name ? "" : `2px solid ${color}`,
          borderRadius: 5,
          px: 5,
          ...hoverStyles,
        }}
      >
        <Typography
          variant="sectionTitleSmall"
          color={
            selectedFilter !== data?.name ? theme.palette.text.primary : color
          }
          sx={{ p: 0, whiteSpace: "nowrap" }}
        >
          {" "}
          {data?.name}
        </Typography>
      </ButtonBase>
    </div>
  );
}

export default OrdersFilterContainer;
