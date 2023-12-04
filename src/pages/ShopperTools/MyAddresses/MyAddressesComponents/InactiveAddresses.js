import { Box, Button, IconButton, Typography, Stack } from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import { Delete } from "@mui/icons-material";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { LoadingCircle } from "../../../../components/Loading/Loading";

function InactiveAddresses({ data, showAlert }) {
  const { useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  //API CALL SET DA ACTIVE
  const { mutate } = useCustomMutate(
    "setAddressActive",
    async (reqData) => {
      await axiosPrivate.patch(
        `api/user/set_active_address/?deliveryAddressID=${reqData.requestData.deliveryAddressID}&shopperID=${auth.shopperID}`
      );
    },
    ["getAllDeliveryAddress"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        showAlert("success", "Address Set To Active");
      },
    }
  );

  const { mutate: deleteMutate } = useCustomMutate(
    "deleteAddress",
    async (reqData) => {
      await axiosPrivate.delete(
        `api/user/delete_delivery_address/?deliveryAddressID=${reqData.requestData.deliveryAddressID}`
      );
    },
    ["getAllDeliveryAddress"],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        showAlert("error", "Address Deleted");
      },
    }
  );

  const handleSetActive = (deliveryAddress) => {
    const requestData = { deliveryAddressID: deliveryAddress };
    mutate({ requestData });
  };

  const handleDelete = (deliveryAddress) => {
    const requestData = { deliveryAddressID: deliveryAddress };
    deleteMutate({ requestData });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="sectionTitleSmall" sx={{ mb: "auto" }}>
        Inactive Addresses
      </Typography>
      <Box sx={{ ...classes.main }}>
        {data.map((item) => (
          <Box key={item.id} sx={{ ...classes.container }}>
            {/* Render content for each item */}
            <Typography
              variant="subtitle1"
              lineHeight={1.2}
              sx={{
                maxWidth: "60%",
                "@media (max-width: 600px)": { maxWidth: "100%" },
              }}
            >
              <b> {item.address_line_1}</b>,{" "}
              {item.address_line_2 ? `${item.address_line_2}, ` : ""}
              {item.barangay},&nbsp;{item.municipality},&nbsp;{item.province}
              ,&nbsp;
              {item.region},&nbsp;
              {item.postal_code}
            </Typography>
            <Box
              sx={{
                maxWidth: "40%",
                ml: "auto",
                display: "flex",
                gap: "16px",
                "@media (max-width: 600px)": { maxWidth: "100%" },
              }}
            >
              <ButtonDelete
                onClickAction={() => handleDelete(item.deliveryAddressID)}
              />
              <ButtonSetActive
                onClickAction={() => handleSetActive(item.deliveryAddressID)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}

const classes = {
  main: {
    minWidth: "100%",
    minHeight: 60,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    mb: 3,
  },

  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    p: 2,
    justifyContent: "flex-start",
    flexDirection: "row",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "24px",
    },
  },
};

function ButtonDelete({ onClickAction }) {
  return (
    <IconButton
      onClick={onClickAction}
      sx={{ ml: "auto" }}
      size="large"
      color="danger"
    >
      <Delete />
    </IconButton>
  );
}

function ButtonSetActive({ onClickAction }) {
  return (
    <Button
      variant="outlined"
      onClick={onClickAction}
      sx={{
        borderRadius: 5,
        width: 130,
        ml: "auto",
      }}
    >
      {
        <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
          Set Active
        </Typography>
      }
    </Button>
  );
}

export default InactiveAddresses;
