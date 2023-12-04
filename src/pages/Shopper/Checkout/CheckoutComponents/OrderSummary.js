import { Receipt } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import theme from "../../../../Theme";
import styled from "@emotion/styled";
import NumberFormat from "../../../../utils/NumberFormat";

function OrderSummary({ checkoutItemsData, shippingFee, appliedVoucher }) {
  const orderItems = checkoutItemsData?.[0]?.cartItems || [];

  const productTotalPrice = orderItems
    ? orderItems.reduce((total, item) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        return total + itemTotal;
      }, 0)
    : 0;
  // calculations
  let finalDiscount = 0;
  let finalDiscountAmt = 0;
  let totalPrice = 0;

  // get discount amt
  if (appliedVoucher?.promo_type_name === "Percent Discount") {
    finalDiscount = productTotalPrice * appliedVoucher?.discount_amount;
  } else {
    finalDiscount = appliedVoucher?.discount_amount;
  }

  if (appliedVoucher?.promo_type_name === "Percent Discount") {
    finalDiscountAmt = `${appliedVoucher?.discount_amount * 100}%`;
  }

  const finalPrice = Number(productTotalPrice) + Number(shippingFee);
  totalPrice =
    finalPrice - Number(appliedVoucher ? appliedVoucher?.discount_amount : 0);

  //display data into rows
  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    ...(orderItems
      ? orderItems.map((item) => ({
          name: item.product_name ? (
            <div style={{ whiteSpace: "pre-line" }}>
              <b>{item.quantity}x</b> {item.product_name}
              <br />
              <div style={{ color: theme.palette.primary.main }}>
                Variation: &nbsp;
                {item.var_name}
              </div>
            </div>
          ) : (
            "- -"
          ),
          value:
            <NumberFormat value={item.price * item.quantity} isPeso /> ||
            "₱0.00",
        }))
      : []),
    createData(
      "Shipping Fee",
      <NumberFormat value={shippingFee} isPeso /> || "₱0.00"
    ),
    createData(
      "Voucher Discount",
      <Typography fontWeight={600}>
        -<NumberFormat value={finalDiscount || 0} isPeso />
        <br />
        <span fontWeight="regular">
          {appliedVoucher?.voucherID
            ? `${appliedVoucher.promo_type_name} ${
                appliedVoucher.promo_type_name === "Percent Discount"
                  ? `, ${finalDiscountAmt}`
                  : ""
              }`
            : "N/A"}
        </span>
      </Typography>
    ),
    createData(
      "Total Price",
      <NumberFormat value={totalPrice} isPeso /> || "₱0.00"
    ),
  ];

  return (
    <div>
      <Box sx={{ ...classes.detailsContainer }}>
        {/**Section Name */}
        <Box sx={{ ...classes.sectionName }}>
          <Box>
            <Box sx={{ ...classes.sectionName }}>
              <Receipt sx={{ ...classes.logo }} />
              <Typography variant="sectionTitleSmall">Order Summary</Typography>
            </Box>

            {/*Table */}
            <TableContainer>
              <Table sx={{ minWidth: "100%" }}>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{
                          width: "80vw",
                          "@media (max-width: 600px)": { width: "60vw" },
                        }}
                      >
                        {row.name || "- -"}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{
                          width: "20vw",
                          "@media (max-width: 600px)": { width: "40vw" },
                        }}
                      >
                        <Typography
                          variant="sectionSubTitle"
                          fontWeight={600}
                          sx={{
                            fontSize: 16,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {row.value || "- -"}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
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

//row styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td": {
    backgroundColor: theme.palette.background.default,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default OrderSummary;
