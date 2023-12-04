import { Box, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import theme from "../../../Theme";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import { LoadingCircle } from "../../../components/Loading/Loading";
import Error404 from "../../../components/Loading/Error404";
import { BASE_URL } from "../../../api/Api";
import ProductImage from "./ProductPageComponents/ProductImage";
import ProductInfo from "./ProductPageComponents/ProductInfo";
import CustomAlert from "../../../components/CustomAlert";
import useAlert from "../../../hooks/useAlert";

function ProductPageContent({ selectedProductID, setProductName }) {
  const useIsMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  // FOR ALERT
  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  const handleShowAlert = (severity, alertMsg) => {
    showAlert(severity, alertMsg);
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

  //TODO: if may time display lahat ng reviews sa baba ng add to cart (100% width)
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

  const { ProductImages: Images } = data || {};

  const product_thumbnail =
    Images.length > 0 ? `${BASE_URL}/${Images[0].prod_image}` : null;

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
                data={data}
                selectedProductID={selectedProductID}
                showAlert={handleShowAlert}
              />
            </Box>
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

export default ProductPageContent;
