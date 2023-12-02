import React, { useState } from "react";
import theme from "../../../Theme";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import CatProducts from "./CategoryComponents/CatProducts";
import PropTypes from "prop-types";
import CatShops from "./CategoryComponents/CatShops";
import CatRawMats from "./CategoryComponents/CatRawMats";

function CategoryContent({ categoryName }) {
  //for tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ ...classes.pageContainer }}>
      <Box sx={{ ...classes.main }}>
        <Stack spacing={3}>
          <Typography variant="sectionTitle">{categoryName}</Typography>

          {/*Set Tab bar */}
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ ...classes.tabs }}
          >
            {" "}
            <Tab
              label={
                <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
                  Products
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
                  Shops
                </Typography>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
                  Raw Materials
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>

          {/*Products (Tab 1)*/}
          <CustomTabPanel value={value} index={0}>
            <CatProducts categoryName={categoryName} />
          </CustomTabPanel>

          {/*Products (Tab 2)*/}
          <CustomTabPanel value={value} index={1}>
            <CatShops categoryName={categoryName} />
          </CustomTabPanel>

          {/*Products (Tab 3)*/}
          <CustomTabPanel value={value} index={2}>
            <CatRawMats categoryName={categoryName} />
          </CustomTabPanel>
        </Stack>
      </Box>
    </Box>
  );
}

const classes = {
  pageContainer: {
    ...theme.components.box.pageContainer,
    display: "flex",
    justifyContent: "center",
  },
  main: {
    maxWidth: 900,
    width: 900,
    "@media (max-width: 900px)": { width: "100%" },
    textAlign: "left",
  },

  tab: {
    color: "inherit",
    fontSize: 18,
    textAlign: "center",
  },

  tabs: {
    height: 50,
    width: "100%",
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: 5,
    mt: 2,
  },
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default CategoryContent;
