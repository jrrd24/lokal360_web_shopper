import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../../Theme";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../components/Loading/Loading";
import MainShopInfo from "./ShopPageComponents/MainShopInfo";
import CustomAlert from "../../../components/CustomAlert";
import useAlert from "../../../hooks/useAlert";
import ShopAds from "./ShopPageComponents/ShopAds";
import FeaturedProducts from "./ShopPageComponents/FeaturedProducts";
import ActiveVouchers from "./ShopPageComponents/ActiveVouchers";
import AllShopProducts from "./ShopPageComponents/AllShopProducts";
import ViewLocationDialog from "./ViewLocationDialog/ViewLocationDialog";
import ShopInfo from "./ShopPageComponents/ShopInfo";
import ShopBestSellers from "./ShopPageComponents/ShopBestSellers";
import ShopNewArrival from "./ShopPageComponents/ShopNewArrival";

function ShopPageContent({ selectedShopID, setShopName }) {
  const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const allShopProductsRef = React.useRef(null);
  const shopInfoRef = React.useRef(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //for tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      allShopProductsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === 2) {
      shopInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //API CALL GET MAIN SHOP DATA
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  const { data, isLoading } = useCustomQuery(
    "getShopData",
    () =>
      axiosPrivate
        .get(`/api/shopInfo?shopID=${selectedShopID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  const { data: rating, isLoadingRating } = useCustomQuery(
    "getShopRating",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/shop/rating/?shopID=${selectedShopID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  useEffect(() => {
    if (data && data.shopInfo?.shop_name) {
      setShopName(shop_name);
    }
  }, [data, setShopName]);

  if (isLoading || isLoadingRating) {
    return <LoadingCircle />;
  }

  const {
    shop_name,
    shipping_deliver_enabled,
    shipping_pickup_enabled,
    logo_img_link,
    header_img_link,
    latitude,
    longitude,
  } = data.shopInfo;

  const handleShowAlert = (severity, alertMsg) => {
    showAlert(severity, alertMsg);
  };

  return (
    <div>
      <Box sx={{ ...classes.pageContainer }}>
        <Box sx={{ ...classes.main }}>
          <Stack spacing={5}>
            <Stack
              spacing={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                "@media (max-width: 900px)": { width: "100vw", ml: -6 },
                "@media (max-width: 600px)": { width: "100vw", ml: -2 },
              }}
            >
              <MainShopInfo
                showAlert={handleShowAlert}
                selectedShopID={selectedShopID}
                logo={logo_img_link}
                header={header_img_link}
                shopName={shop_name}
                shopRating={rating}
                followerCount={data.followerCount}
                deliver={shipping_deliver_enabled}
                pickUp={shipping_pickup_enabled}
                handleOpen={handleOpen}
              />

              {/*Set Tab bar */}
              <TabsContainer value={value} handleChange={handleChange} />
            </Stack>

            <FeaturedProducts selectedShopID={selectedShopID} />

            <div ref={shopInfoRef} />
            <Box
              sx={{
                display: "flex",
                gap: isLg ? 5 : 2,
                flexDirection: isLg ? "column" : "row",
              }}
            >
              <Box width={isLg ? "100%" : 600}>
                <ShopAds selectedShopID={selectedShopID} />
                <ActiveVouchers selectedShopID={selectedShopID} />
              </Box>
              <Box width={isLg ? "100%" : 500}>
                <ShopInfo data={data.shopInfo} />
              </Box>
            </Box>

            <ShopBestSellers selectedShopID={selectedShopID} />
            <ShopNewArrival selectedShopID={selectedShopID} />

            <div ref={allShopProductsRef} />
            <AllShopProducts selectedShopID={selectedShopID} />
          </Stack>
        </Box>
      </Box>

      {/*Display Alert */}
      <CustomAlert
        open={openAlert}
        setOpen={hideAlert}
        severity={severity}
        alertMsg={alertMsg}
      />

      <ViewLocationDialog
        open={open}
        longitude={longitude}
        latitude={latitude}
        handleClose={handleClose}
        shopName={shop_name}
      />
    </div>
  );
}

const classes = {
  pageContainer: {
    ...theme.components.box.pageContainer,
    display: "flex",
    justifyContent: "center",
  },
  main: {
    maxWidth: 1200,
    width: "100%",
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
    borderRadius: 3,
    mt: 2,
  },
};

function TabsContainer({ value, handleChange }) {
  return (
    <Tabs
      value={0}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="inherit"
      variant="fullWidth"
      sx={{ ...classes.tabs }}
    >
      <Tab
        label={
          <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
            Shop
          </Typography>
        }
        {...a11yProps(0)}
      />
      <Tab
        label={
          <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
            Products
          </Typography>
        }
        {...a11yProps(1)}
      />
      <Tab
        label={
          <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
            About Us
          </Typography>
        }
        {...a11yProps(2)}
      />
    </Tabs>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default ShopPageContent;
