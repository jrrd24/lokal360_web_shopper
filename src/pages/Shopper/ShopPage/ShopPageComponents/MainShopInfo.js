import {
  Bookmark,
  DeliveryDining,
  People,
  StarHalf,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../../../../Theme";
import { BiShoppingBag } from "react-icons/bi";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import { BASE_URL } from "../../../../api/Api";
import Zoom from "react-medium-image-zoom";

function MainShopInfo({
  showAlert,
  selectedShopID,
  logo,
  header,
  shopName,
  shopRating,
  followerCount,
  deliver,
  pickUp,
}) {
  const { useCustomQuery, useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  //Check following status
  const { data: isFollowingData, isLoading } = useCustomQuery(
    "checkIfFollowing",
    () =>
      axiosPrivate
        .get(
          `/api/customer/check_follow/?shopID=${selectedShopID}&shopperID=${auth.shopperID}`
        )
        .then((res) => res.data),
    { enabled: true }
  );

  //Follow Shop
  const { mutate: mutateFollow } = useCustomMutate(
    "followShop",
    async () => {
      await axiosPrivate.post(
        `api/customer/follow/?shopID=${selectedShopID}&shopperID=${auth.shopperID}`
      );
    },
    ["checkIfFollowing"],
    {
      onError: (error) => {
        showAlert("error", error);
      },
      onMutate: () => {
        return <LoadingCircle />;
      },
      onSuccess: () => {
        setIsFollowing(true);
      },
    }
  );

  //Unfollow Shop
  const { mutate: mutateUnfollow } = useCustomMutate(
    "unfollowShop",
    async () => {
      await axiosPrivate.delete(
        `api/customer/unfollow/?shopID=${selectedShopID}&shopperID=${auth.shopperID}`
      );
    },
    ["checkIfFollowing"],
    {
      onError: (error) => {
        showAlert("error", error);
      },
      onMutate: () => {
        return <LoadingCircle />;
      },
      onSuccess: () => {
        setIsFollowing(false);
      },
    }
  );

  const [isFollowing, setIsFollowing] = useState(isFollowingData);

  const handleFollowClick = () => {
    mutateFollow();
  };

  const handleUnfollowClick = () => {
    mutateUnfollow();
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  // images
  const logoPath = `${BASE_URL}/${logo}`;
  const headerPath = `${BASE_URL}/${header}`;

  return (
    <div>
      {/**Images */}
      <Box sx={{ ...classes.main }}>
        {/**Header Container */}
        <Box>
          <Zoom>
            <Box sx={{ ...classes.headerContainer }}>
              <img
                src={
                  header
                    ? headerPath
                    : require("../../../../assets/placeholder.png")
                }
                alt={"shop header"}
                style={{ ...classes.header }}
              />

              {/**Follow Button */}
              <Box sx={classes.buttonContainer}>
                {isFollowing ? (
                  <UnfollowButton handleClick={handleUnfollowClick} />
                ) : (
                  <FollowButton handleClick={handleFollowClick} />
                )}
              </Box>
            </Box>
          </Zoom>
        </Box>

        {/**Logo Container */}
        <Box sx={{ ...classes.logoZoomContainer }}>
          <Zoom>
            <Box sx={{ ...classes.logoContainer }}>
              <img
                src={
                  logo
                    ? logoPath
                    : require("../../../../assets/product_placeholder_big.jpg")
                }
                alt={"shop header"}
                style={{
                  ...classes.image,
                  borderRadius: 10,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Zoom>
        </Box>
      </Box>

      {/**Details */}
      <Box sx={{ ...classes.detailsContainer }}>
        <Typography variant="sectionTitleBig">{shopName}</Typography>
        <Stack spacing={0}>
          {/*Ratings and Followers*/}
          <Box sx={{ ...classes.prodDetail }}>
            <StarHalf sx={{ ...classes.star }} />
            <Typography sx={{ fontSize: "inherit" }}>
              <span style={{ ...classes.prodDetailBig }}>
                &nbsp;{shopRating !== 0 ? shopRating.toFixed(2) : "N/A"}
              </span>
              /5 &nbsp;&nbsp;| &nbsp;&nbsp;
            </Typography>

            <People sx={{ ...classes.star }} />
            <Typography sx={{ fontSize: "inherit" }}>
              <span style={{ ...classes.prodDetailBig }}>
                &nbsp;{followerCount}
              </span>
              &nbsp;Follower
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ ...classes.prodDetail, display: "flex", gap: "8px" }}>
          {deliver && (
            <Stack
              direction={"horizontal"}
              spacing={2}
              sx={{ ...classes.shipping }}
            >
              <DeliveryDining sx={{ ...classes.pin }} />
              <Typography sx={{ fontSize: "inherit" }}>Delivery</Typography>
            </Stack>
          )}

          {pickUp && (
            <Stack
              direction={"horizontal"}
              spacing={2}
              sx={{ ...classes.shipping }}
            >
              <BiShoppingBag style={{ ...classes.pin }} />
              <Typography sx={{ fontSize: "inherit" }}>Pick-Up</Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </div>
  );
}

const FollowButton = ({ handleClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<Bookmark />}
      onClick={handleClick}
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        borderRadius: 5,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
        Follow
      </Typography>
    </Button>
  );
};

const UnfollowButton = ({ handleClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<Bookmark />}
      onClick={handleClick}
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        borderRadius: 5,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        color: theme.palette.primary.main,
      }}
    >
      <Typography variant="seeAll" sx={{ color: "inherit", fontSize: 18 }}>
        Following
      </Typography>
    </Button>
  );
};

const classes = {
  main: {
    position: "relative",
    display: "flex",
    justifyContent: "left",
    "@media (max-width: 900px)": { justifyContent: "center" },
  },

  headerContainer: {
    height: 230,
    width: 900,
    "@media (max-width: 900px)": {
      height: 230,
      width: "100vw",
    },
  },

  logoContainer: {
    position: "absolute",
    marginTop: 24,
    pl: 5,
    height: 150,
    width: 190,

    "@media (max-width: 900px)": { pl: 0, width: 150 },
    "@media (max-width: 400px)": { height: 125, width: 125 },
  },

  logoZoomContainer: {
    position: "absolute",
    pl: 0,
    "@media (max-width: 900px)": { pl: 0, width: 150 },
    "@media (max-width: 400px)": { height: 125, width: 125 },
  },

  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    border: `2px solid ${theme.palette.text.ten}`,
  },

  header: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  detailsContainer: {
    pl: 26,
    pt: 1,
    minHeight: 110,
    "@media (max-width: 900px)": {
      pl: 0,
      pt: 15,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      minHeight: "100%",
    },
    "@media (max-width: 400px)": {
      pt: 12,
    },
  },

  star: {
    fontSize: "20px",
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },

  prodDetailBig: {
    fontSize: "18px",
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },

  prodDetail: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: `${theme.palette.text.sixty}`,
  },

  shipping: {
    backgroundColor: theme.palette.text.ten,
    p: 0.5,
    borderRadius: 2,
  },

  buttonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "10px",
  },
};
export default MainShopInfo;
