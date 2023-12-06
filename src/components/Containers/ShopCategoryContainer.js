import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";

function ShopCategoryContainer({
  data,
  setSelectedCategory,
  selectedCategory,
}) {
  const onClick = () => {
    setSelectedCategory(data.shopCategoryID);
  };

  const hoverStyles =
    selectedCategory !== data.shopCategoryID
      ? {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }
      : {};

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        height: 50,
        backgroundColor:
          selectedCategory === data.shopCategoryID
            ? theme.palette.primary.main
            : theme.palette.background.paper,
        borderRadius: 5,
        px: 5,
        ...hoverStyles,
      }}
    >
      <Typography
        variant="sectionTitleSmall"
        color={
          selectedCategory === data.shopCategoryID
            ? theme.palette.background.paper
            : theme.palette.text.primary
        }
        sx={{ p: 0, whiteSpace: "nowrap" }}
      >
        {data.shop_category_name}
      </Typography>
    </ButtonBase>
  );
}

export default ShopCategoryContainer;
