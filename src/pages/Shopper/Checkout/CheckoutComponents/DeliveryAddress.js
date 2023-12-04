import { Edit, Home } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import ActiveAddresses from "../../../ShopperTools/MyAddresses/MyAddressesComponents/ActiveAddresses";
import theme from "../../../../Theme";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

function DeliveryAddress({ setDeliveryAddress }) {
  //API CALL GET ALL DELIVERY ADDRESS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { data: delAddressData, isLoading } = useCustomQuery(
    "getAllDeliveryAddress",
    () =>
      axiosPrivate
        .get(`/api/user/get_shopper_address/?shopperID=${auth.shopperID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  setDeliveryAddress(delAddressData.activeDeliveryAddress.deliveryAddressID);
  const handleEditAddress = () => {
    navigate("/profile/my_addresses");
  };

  return (
    <div>
      {/**Delivery Address */}
      <Box sx={{ ...classes.detailsContainer }}>
        {/**Section Name */}
        <Box sx={{ ...classes.sectionName }}>
          <Box>
            {/**Section Name*/}
            <Box sx={{ ...classes.sectionName }}>
              <Home sx={{ ...classes.logo }} />
              <Typography variant="sectionTitleSmall">
                Delivery Address
              </Typography>
            </Box>

            {/**Content*/}
            <ActiveAddresses
              data={delAddressData.activeDeliveryAddress}
              checkout
            />
          </Box>
          <IconButton
            sx={{ ...classes.iconButton }}
            onClick={handleEditAddress}
          >
            <Edit />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}

const classes = {
  detailsContainer: {
    backgroundColor: theme.palette.background.paper,
    p: 2,
    borderRadius: 5,
  },

  sectionName: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  logo: {
    height: 30,
    width: 30,
    color: theme.palette.primary.main,
  },

  iconButton: {
    ml: "auto",
  },
};

export default DeliveryAddress;
