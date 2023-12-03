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
import PropTypes from "prop-types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import { LoadingCircle } from "../../../components/Loading/Loading";
import Error404 from "../../../components/Loading/Error404";
import { BASE_URL } from "../../../api/Api";
import ProductImage from "./ProductPageComponents/ProductImage";
import ProductInfo from "./ProductPageComponents/ProductInfo";

function ProductPageContent({ selectedProductID, setProductName }) {
  const useIsMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  //for tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // API CALL GET PRODUCT DATA
  const { data, isLoading, isError } = useCustomQuery(
    "getProductData",
    () =>
      axiosPrivate
        .get(`/api/product/product_info/?productID=${selectedProductID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  const {
    data: reviewData,
    isLoadingReview,
    isErrorReview,
  } = useCustomQuery(
    "getReviewData",
    () =>
      axiosPrivate
        .get(`/api/review/reviews/product/?productID=${selectedProductID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  useEffect(() => {
    if (data && data.product_name) {
      setProductName(data.product_name);
    }
  }, [data, setProductName]);

  if (isLoading || isLoadingReview) {
    return <LoadingCircle />;
  }
  if (isError || isErrorReview) {
    return <Error404 />;
  }
  if (!data || data.length === 0) {
    setProductName("Product");
    return <LoadingCircle />;
  }

  const {
    productID,
    product_name,
    total_sales,
    amountSold,
    number_of_variations,
    description,
    promoID,
    rating,
    variations,
    Category: { category_name: productCategory },
    ShopCategory,
    ProductImages: Images,
    Promo: promoData,
    ProductVariations,
    VoucherAppliedProducts,
  } = data || {};

  console.log();

  const product_thumbnail =
    Images.length > 0 ? `${BASE_URL}/${Images[0].prod_image}` : null;
  const shopCategory = ShopCategory ? ShopCategory.shop_category_name : 0;

  return (
    <div>
      <Box sx={{ ...classes.pageContainer }}>
        <Box sx={{ ...classes.main }}>
          <Stack spacing={2} direction={useIsMobile ? "column" : "row"}>
            <ProductImage
              thumbnailPath={product_thumbnail}
              thumbnail={Images[0].prod_image}
            />
            <Box sx={{ width: "100%" }}>
              <ProductInfo
                TabsContainer={TabsContainer}
                CustomTabPanel={CustomTabPanel}
                value={value}
                handleChange={handleChange}
                data={data}
                selectedProductID={selectedProductID}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
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

function TabsContainer({ value, handleChange }) {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="inherit"
      variant="fullWidth"
      sx={{ ...classes.tabs }}
    >
      <Tab
        label={
          <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
            Details
          </Typography>
        }
        {...a11yProps(0)}
      />
      <Tab
        label={
          <Typography variant="sectionTitleSmall" sx={{ ...classes.tab }}>
            Reviews
          </Typography>
        }
        {...a11yProps(1)}
      />
    </Tabs>
  );
}
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

export default ProductPageContent;
