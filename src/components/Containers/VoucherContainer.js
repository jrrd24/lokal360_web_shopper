import React, { useEffect, useState } from "react";
import { ButtonBase, Grid, Stack, Typography } from "@mui/material";
import theme from "../../Theme";
import FormatDate from "../../utils/FormatDate";
import NumberFormat from "../../utils/NumberFormat";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function VoucherContainer({ data }) {
  const {
    type = data.promo_type,
    logo = data.logo_img_link,
    shopName = data.name,
    value = data.discount_amount,
    minSpend = data.min_spend,
    validUntil = data.end_date,
    isActive = data.is_active,
  } = data;

  const [color, setColor] = useState(`${theme.palette.status.delivery}`);
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (type === "Free Shipping") {
      setColor(`${theme.palette.status.delivery}`);
      setFormattedValue(<NumberFormat value={value} isPeso noDecimal />);
    } else if (type === "Peso Discount") {
      setColor(`${theme.palette.status.pickUp}`);
      setFormattedValue(<NumberFormat value={value} isPeso noDecimal />);
    } else if (type === "Percent Discount") {
      setColor(`${theme.palette.status.pending}`);
      setFormattedValue(value * 100);
    }

    if (!isActive) {
      setColor(`${theme.palette.text.forty}`);
    }
  }, [type, value]);

  const navigate = useNavigate();
  //ADD ONCLICK
  const onClick = () => {};

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        backgroundColor: `${theme.palette.background.paper}`,
        width: 270,
        minHeight: 145,
        border: `3px dashed ${color}`,
        borderRadius: 5,
        //change ripple color
        "&:hover, &:focus": {
          "& .MuiTouchRipple-root": {
            color: { color },
          },
        },
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/*Shop Logo Container */}
        <Grid item xs={4} sx={{ p: 1.5 }}>
          <img
            src={
              !isActive
                ? require("../../assets/voucher_expired.jpg")
                : logo || require("../.././assets/lokal360_Logo.png")
            }
            alt="logo"
            style={{
              border: `3px solid ${color}`,
              borderRadius: 70,
              width: 70,
              height: 70,
              backgroundColor: `${theme.palette.background.paper}`,
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </Grid>

        {/*Voucher Content */}
        <Grid item xs={8} sx={{ p: 1 }}>
          {/*Content Container */}
          <Stack spacing={1} sx={{ display: "flex", textAlign: "start" }}>
            {/*Voucher Title/ Type and Min Spend */}
            <Stack spacing={0.5} sx={{ color: { color } }}>
              {/*Title/ Type */}
              <Stack spacing={0}>
                {/*Render Voucher Title Depending on Type */}
                {/*Free Shipping has Different Title */}
                {/*Peso and Percent Discount are Similar */}
                {type === "Free Shipping" ? (
                  <>
                    <Typography variant="voucherTitleSmall">
                      Free Shipping
                    </Typography>
                    <Typography variant="voucherTitle">
                      {formattedValue || "N/aN"}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="voucherTitle">
                    {formattedValue || "N/aN"}
                    {type === "Percent Discount" ? "%" : ""} off
                  </Typography>
                )}
              </Stack>

              {/*Min Spend*/}
              <Typography variant="minSpend">
                Min Spend: {<NumberFormat value={minSpend} isPeso />}
              </Typography>
            </Stack>

            {/* Shop Name / Valid Until*/}
            <Stack spacing={0}>
              <Typography variant="shopName">{shopName || "N/A"}</Typography>
              <Typography variant="minSpend">
                Valid Until: {<FormatDate date={validUntil} />}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

VoucherContainer.propTypes = {
  type: PropTypes.string,
  logo: PropTypes.string,
  shopName: PropTypes.string,
  value: PropTypes.number,
  minSpend: PropTypes.number,
  validUntil: PropTypes.string,
};

export default VoucherContainer;
