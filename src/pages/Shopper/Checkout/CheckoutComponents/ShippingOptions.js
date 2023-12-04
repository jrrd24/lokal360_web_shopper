import { Edit, LocalShipping } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NumberFormat from "../../../../utils/NumberFormat";
import theme from "../../../../Theme";

function ShippingOptions({
  selectedShipping,
  setSelectedShipping,
  shippingPrice,
  setShippingPrice,
}) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    !edit ? setEdit(true) : setEdit(false);
  };

  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };
  return (
    <div>
      {" "}
      <Box sx={{ ...classes.detailsContainer }}>
        {/**Section Name */}
        <Box sx={{ ...classes.sectionName }}>
          {/**Section Name*/}
          <Box>
            <Box sx={{ ...classes.sectionName }}>
              <LocalShipping sx={{ ...classes.logo }} />
              <Typography variant="sectionTitleSmall">
                Shipping Options
              </Typography>
            </Box>

            {/**Content*/}
            <Stack spacing={2} sx={{ pt: 2 }}>
              <Box sx={{ pl: 4 }}>
                <Stack
                  spacing={0.5}
                  sx={{
                    backgroundColor: theme.palette.text.ten,
                    p: 2,
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="sectionTitleSmall">
                    {selectedShipping}
                  </Typography>
                  <Typography variant="subtitle1">
                    <NumberFormat value={shippingPrice} isPeso />
                  </Typography>
                </Stack>
              </Box>

              {edit ? (
                <FormControl>
                  <RadioGroup
                    name="set-shipping"
                    value={selectedShipping}
                    onChange={handleShippingChange}
                    row
                    sx={{ pl: 4 }}
                  >
                    <FormControlLabel
                      value="Delivery"
                      control={<Radio />}
                      label="Delivery"
                    />
                    <FormControlLabel
                      value="Pick-Up"
                      control={<Radio />}
                      label="Pick-Up"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                ""
              )}
            </Stack>
          </Box>

          <IconButton sx={{ ...classes.iconButton }} onClick={handleEdit}>
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
export default ShippingOptions;
