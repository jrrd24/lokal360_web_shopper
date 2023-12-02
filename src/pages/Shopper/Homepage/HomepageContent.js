import React from "react";
import { Box } from "@mui/material";
import theme from "../../../Theme";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { LoadingCircle } from "../../../components/Loading/Loading";

function HomepageContent() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  //API CALL GET ALL SHOP ORDERS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const { data, isLoading } = useCustomQuery(
    "getUserNameInfo",
    () =>
      axiosPrivate
        .get(`/api/profile/dashboard/?userID=${auth.userID}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return <Box sx={{ ...theme.components.box.pageContainer }}>homepage</Box>;
}

const classes = {
  rightContainer: {
    ...theme.components.box.contentColumn,
    "@media (max-width: 900px)": {
      minWidth: "100%",
    },
    "@media (max-width: 600px)": {
      alignItems: "center",
      justifyContent: "center",
    },
  },

  orderSummaryContainer: {
    ...theme.components.box.sectionContainer,
    maxWidth: "750px",
    "@media (max-width: 900px)": {
      minWidth: "100%",
    },
  },

  voucherAdsContainer: {
    ...theme.components.box.contentRow,
    minWidth: "100%",
    "@media (max-width: 1185px)": {
      minWidth: "100%",
      flexDirection: "column",
    },
  },

  adsContainer: {
    ...theme.components.box.sectionContainer,
    width: "360px",

    "@media (max-width: 1300px)": {
      minWidth: "100%",
    },
  },

  voucherContainer: {
    ...theme.components.box.sectionContainer,
    width: "360px",

    "@media (max-width: 1300px)": {
      minWidth: "100%",
    },
  },

  leftContainer: {
    ...theme.components.box.contentColumn,
    "@media (max-width: 1300px)": {
      minWidth: "752px",
      alignItems: "center",
      justifyContent: "center",
    },

    "@media (max-width: 900px)": {
      minWidth: "100%",
    },
  },

  datePickerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "340px",
    "@media (max-width: 1300px)": {
      minWidth: "100%",
      order: 1,
    },
  },

  valuableCustomersContainer: {
    ...theme.components.box.sectionContainer,
    maxWidth: "340px",
    "@media (max-width: 1300px)": {
      minWidth: "100%",
      order: 2,
    },
  },

  productStatusContainer: {
    ...theme.components.box.sectionContainer,
    maxWidth: "340px",
    "@media (max-width: 1300px)": {
      minWidth: "100%",
      order: 3,
    },
  },

  infoContainer: {
    ...theme.components.box.sectionContainer,
    minWidth: "1120px",
    "@media (max-width: 1300px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "750px",
    },
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
      minWidth: "100%",
    },
  },
};
export default HomepageContent;
