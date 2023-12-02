const voucherData = [
  {
    voucherID: 1,
    shopID: 1,
    promoID: 1,
    start_date: "2024-02-23",
    end_date: "2024-02-26",
    is_active: true,
    //from shopID
    logo_img_link: null,
    name: "Bamboo Land",
    //from promoID
    promo_type: "Peso Discount",
    discount_amount: 50.0,
    min_spend: 100.0,
    // inner join
    voucherAppliedProduct: [
      { voucherAppliedProductID: 1, voucherID: 1, productID: 1 },
      { voucherAppliedProductID: 2, voucherID: 1, productID: 2 },
      { voucherAppliedProductID: 3, voucherID: 1, productID: 5 },
    ],
  },
  {
    voucherID: 2,
    shopID: 1,
    promoID: 2,
    start_date: "2024-01-23",
    end_date: "2024-01-26",
    is_active: true,
    //from shopID
    logo_img_link: null,
    name: "Bamboo Land",
    //from promoID
    promo_type: "Percent Discount",
    discount_amount: 0.2,
    min_spend: 100.0,
    // inner join
    voucherAppliedProduct: [
      { voucherAppliedProductID: 4, voucherID: 2, productID: 4 },
      { voucherAppliedProductID: 5, voucherID: 2, productID: 7 },
      { voucherAppliedProductID: 6, voucherID: 2, productID: 9 },
    ],
  },
  {
    voucherID: 3,
    shopID: 1,
    promoID: 2,
    start_date: "2024-02-23",
    end_date: "2024-02-26",
    is_active: false,
    //from shopID
    logo_img_link: null,
    name: "Bamboo Land",
    //from promoID
    promo_type: "Percent Discount",
    discount_amount: 0.2,
    min_spend: 100.0,
    // inner join
    voucherAppliedProduct: [
      { voucherAppliedProductID: 7, voucherID: 3, productID: 2 },
    ],
  },
  {
    voucherID: 4,
    shopID: 1,
    promoID: 3,
    start_date: "2024-02-23",
    end_date: "2024-02-26",
    is_active: true,
    //from shopID
    logo_img_link: null,
    name: "Bamboo Land",
    //from promoID
    promo_type: "Free Shipping",
    discount_amount: 75.0,
    min_spend: 100.0,
    // inner join
    voucherAppliedProduct: [
      { voucherAppliedProductID: 8, voucherID: 4, productID: 3 },
      { voucherAppliedProductID: 9, voucherID: 4, productID: 2 },
      { voucherAppliedProductID: 10, voucherID: 4, productID: 1 },
    ],
  },
  {
    voucherID: 5,
    shopID: 1,
    promoID: 5,
    start_date: "2024-02-23",
    end_date: "2024-02-26",
    is_active: true,
    //from shopID
    logo_img_link: null,
    name: "Bamboo Land",
    //from promoID
    promo_type: "Free Shipping",
    discount_amount: 50.0,
    min_spend: 100.0,
    // inner join
    voucherAppliedProduct: [
      { voucherAppliedProductID: 11, voucherID: 5, productID: 13 },
      { voucherAppliedProductID: 12, voucherID: 5, productID: 12 },
      { voucherAppliedProductID: 13, voucherID: 5, productID: 3 },
      { voucherAppliedProductID: 14, voucherID: 5, productID: 1 },
      { voucherAppliedProductID: 15, voucherID: 5, productID: 2 },
      { voucherAppliedProductID: 16, voucherID: 5, productID: 5 },
    ],
  },
];
export default voucherData;
