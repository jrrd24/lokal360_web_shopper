import { Box, ButtonBase, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import theme from "../../Theme";
import { useNavigate } from "react-router-dom";

const HomepageLinkContainer = ({
  title,
  subtitle,
  svgLink,
  svgHeight,
  svgHeightMd,
  svgHeightSm,
  svgBottom,
  svgRight,
  containerLeft,
  containerRight,
  searchFilter,
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  return (
    <ButtonBase
      onClick={
        searchFilter === "Raw Materials"
          ? () => {
              navigate(`/search?ptype=${searchFilter}`);
            }
          : () => {
              navigate(`/search?type=${searchFilter}`);
            }
      }
      sx={{
        width: "100%",
        ...classes.container,
        position: "relative",
        marginLeft: containerLeft,
        marginRight: containerRight,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Box sx={{ width: "100%", height: isMd ? 200 : 140 }}>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          fontWeight={600}
          align="left"
          paddingLeft={isSmallScreen ? 1 : 2}
          paddingTop={isSmallScreen ? 1 : 2}
          sx={{ lineHeight: "100%", pb: 0.75 }}
        >
          {title}
        </Typography>
        <Typography
          variant={isSmallScreen ? "subtitle2" : "subtitle1"}
          align="left"
          paddingLeft={isSmallScreen ? 1 : 2}
          sx={{ lineHeight: "110%" }}
        >
          {subtitle}
        </Typography>

        <img
          src={svgLink}
          alt="Product SVG"
          height={isSmallScreen ? svgHeightSm : isMd ? svgHeightMd : svgHeight}
          style={{
            position: "absolute",
            bottom: svgBottom || 10,
            right: isSmallScreen ? 0 : svgRight || 10,
          }}
        />
      </Box>
    </ButtonBase>
  );
};

const classes = {
  container: {
    marginY: 1,
    borderRadius: 3,
    p: 1,
    backgroundColor: theme.palette.background.paper,
    userSelect: "none",
    border: `1px solid ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
    "&:hover": {
      borderBottom: `solid 3px ${theme.palette.primary.main}`,
    },
    transition: "border 0.1s ease",
  },
};

export default HomepageLinkContainer;
