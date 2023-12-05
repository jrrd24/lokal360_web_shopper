import { Box } from "@mui/material";
import React from "react";
import Zoom from "react-medium-image-zoom";

function ProductImage({ thumbnail, thumbnailPath }) {
  return (
    <div>
      <Box sx={{ ...classes.main }}>
        <Zoom>
          <Box sx={{ ...classes.thumbnailContainer }}>
            <img
              src={
                thumbnail
                  ? thumbnailPath
                  : require("../../../../assets/placeholder.png")
              }
              alt={"shop thumbnail"}
              style={{ ...classes.thumbnail }}
            />
          </Box>
        </Zoom>
      </Box>
    </div>
  );
}

const classes = {
  main: {
    position: "relative",
    display: "flex",
    justifyContent: "left",
    "@media (max-width: 900px)": { justifyContent: "center" },
  },

  thumbnailContainer: {
    height: 500,
    width: 425,
    "@media (max-width: 900px)": {
      height: 350,
      width: "100vw",
    },
  },

  thumbnail: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: 20,
  },
};

export default ProductImage;
