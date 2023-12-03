import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import theme from "../../Theme";

function ShopCategoryContainer({ data, setSelectedCategory }) {
  const onClick = () => {
    setSelectedCategory(data.shopCategoryID);
  };

  return (
    <div>
      <ButtonBase
        onClick={onClick}
        sx={{
          width: "100%",
          height: 50,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          px: 5,
        }}
      >
        <Typography variant="sectionTitleSmall">
          {" "}
          {data.shop_category_name}
        </Typography>
      </ButtonBase>
    </div>
  );
}

export default ShopCategoryContainer;
