import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { BASE_URL } from "../../../../api/Api";

function ActiveAds() {
  const useIsMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: adData, isLoading } = useCustomQuery(
    "getActiveSitewideAds",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/active_sitewide_ads`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  const processedAds = adData.map((ad) => {
    return {
      lokalAdsID: ad.lokalAdsID,
      ad_name: ad.ad_name,
      ad_image: `${BASE_URL}/${ad.ad_image}`,
      start_date: ad.start_date,
    };
  });
  return (
    <div>
      <Carousel
        stopAutoPlayOnHover
        indicatorContainerProps={{
          style: {
            zIndex: 1,
            marginTop: "0px",
            position: "relative",
          },
        }}
      >
        {processedAds.map((item, i) =>
          !useIsMobile ? (
            <img
              src={item.ad_image}
              alt={item.ad_name}
              style={{
                height: 300,
                width: "100%",
                borderRadius: 10,
                objectFit: "cover",
                p: 0,
              }}
            />
          ) : (
            <Box
              key={i}
              sx={{
                height: 300,
                width: 900,
                "@media (max-width: 600px)": {
                  height: "auto",
                  width: "100%",
                },
              }}
            >
              <img
                src={item.ad_image}
                alt={item.ad_name}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </Box>
          )
        )}
      </Carousel>
    </div>
  );
}

export default ActiveAds;
