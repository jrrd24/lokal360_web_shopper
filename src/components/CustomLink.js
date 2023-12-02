import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import theme from "../Theme";

const CustomLink = (props) => {
  
  const { to, ...rest } = props;

  return (
    <Link
      component={RouterLink}
      to={to}
      variant="seeAll"
      underline="none"
      {...rest}
    />
  );
};

export default CustomLink;
