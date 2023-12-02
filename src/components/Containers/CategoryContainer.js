import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../Theme";

function CategoryContainer({ data }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/category/${data.category_name}`);
  };

  //TODO: if may time add color and icons
  return (
    <div>
      <ButtonBase
        onClick={onClick}
        sx={{
          width: 180,
          height: 50,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
        }}
      >
        <Typography variant="sectionTitleSmall">
          {" "}
          {data.category_name}
        </Typography>
      </ButtonBase>
    </div>
  );
}

export default CategoryContainer;
