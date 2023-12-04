import { Edit, Payments } from "@mui/icons-material";
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
import theme from "../../../../Theme";

function PaymentOptions({ paymentMethod, setPaymentMethod }) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    !edit ? setEdit(true) : setEdit(false);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <Box sx={{ ...classes.detailsContainer }}>
        {/**Section Name */}
        <Box sx={{ ...classes.sectionName }}>
          <Box>
            <Box sx={{ ...classes.sectionName }}>
              <Payments sx={{ ...classes.logo }} />
              <Typography variant="sectionTitleSmall">
                Payment Options
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
                    {paymentMethod}
                  </Typography>
                </Stack>
              </Box>

              {edit ? (
                <FormControl>
                  <RadioGroup
                    name="set-payment"
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                    row
                    sx={{ pl: 4 }}
                  >
                    <FormControlLabel
                      value="Cash On Delivery"
                      control={<Radio />}
                      label="Cash On Delivery"
                    />
                    <FormControlLabel
                      value="G-Cash"
                      control={<Radio disabled={true} />}
                      label="G-Cash"
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

export default PaymentOptions;
