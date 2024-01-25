import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../api/Api";

const ShopLinkAndDescription = ({ data }) => {
  const useIsMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          py: useIsMobile ? 1 : 2,
          px: useIsMobile ? 1 : 3,
          ...classes.sectionContainer,
        }}
      >
        <ButtonBase
          sx={{ ...classes.detailsContainer, width: "100%" }}
          onClick={() => {
            navigate(`/shop/${data.Shop.shopID}`);
          }}
        >
          <img
            src={
              data.Shop.logo_img_link
                ? `${BASE_URL}/${data.Shop.logo_img_link}`
                : require("../../../../assets/product_placeholder_big.jpg")
            }
            style={{
              height: 50,
              width: 50,
              objectFit: "cover",
              borderRadius: 50,
            }}
          />

          <Typography variant="sectionTitleSmall">
            {data.Shop.shop_name}
          </Typography>
        </ButtonBase>
      </Box>

      <Box
        sx={{
          py: 2,
          px: 3,
          ...classes.sectionContainer,
        }}
      >
        <Stack spacing={2} sx={{ display: "flex", height: "100%" }}>
          <Typography variant="sectionTitleSmall">Description</Typography>
          <Typography variant="body1">{data.description}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const classes = {
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
  },

  detailsContainer: {
    backgroundColor: theme.palette.background.paper,
    p: 1,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "16px",
  },
};
export default ShopLinkAndDescription;
