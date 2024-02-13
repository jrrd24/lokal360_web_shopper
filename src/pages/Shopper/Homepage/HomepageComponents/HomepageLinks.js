import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ProductsSVG from "../../../../assets/svg/products.svg";
import RawMatsSVG from "../../../../assets/svg/rawmats.svg";
import StoreSVG from "../../../../assets/svg/store.svg";
import UpcomingSVG from "../../../../assets/svg/upcoming.svg";
import HomepageLinkContainer from "../../../../components/Containers/HomepageLinkContainer";
import theme from "../../../../Theme";

const HomepageLinks = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ ...classes.container, p: isSmallScreen ? 2 : 4 }}>
      <Typography variant="sectionTitle" color={"primary"}>
        Explore Lokal 360
      </Typography>

      <Grid container spacing={0}>
        <Grid xs={7}>
          <HomepageLinkContainer
            title={"Local Products"}
            subtitle={"Find Local Products that suits you"}
            svgLink={ProductsSVG}
            searchFilter={"Product"}
            svgHeight={110}
            svgHeightMd={100}
            svgHeightSm={75}
            containerRight={1}
          />
        </Grid>
        <Grid xs={5}>
          <HomepageLinkContainer
            title={"Raw Materials"}
            subtitle={"Create with Raw Materials"}
            svgLink={RawMatsSVG}
            searchFilter={"Raw Materials"}
            svgHeight={130}
            svgHeightMd={110}
            svgHeightSm={85}
            svgBottom={-10}
            svgRight={-10}
            containerLeft={1}
          />
        </Grid>
        <Grid xs={5}>
          <HomepageLinkContainer
            title={"Shops"}
            subtitle={"Support Local Businesses"}
            svgLink={StoreSVG}
            searchFilter={"Shop"}
            svgHeight={120}
            svgHeightMd={110}
            svgHeightSm={85}
            svgBottom={1}
            svgRight={1}
            containerRight={1}
          />
        </Grid>
        <Grid xs={7}>
          <HomepageLinkContainer
            title={"Growing Startups"}
            subtitle={"Explore Upcoming Businesses"}
            svgLink={UpcomingSVG}
            searchFilter={"Quick Sellers"}
            svgHeight={120}
            svgHeightMd={110}
            svgHeightSm={85}
            svgBottom={1}
            svgRight={1}
            containerLeft={1}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const classes = {
  container: {
    pt: 4,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "Left",
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
  },
};
export default HomepageLinks;
