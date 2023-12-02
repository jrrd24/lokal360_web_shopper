const orderData = [
  {
    orderID: 1,
    shopperID: 1,
    deliveryAddressID: 1,
    shopperClaimedVoucherID: 1,
    status: "Pending Approval",
    shipping_method: "Delivery",
    created_at: "2023-05-10 15:30:00",
    approved_at: "",
    completed_at: "",
    total_price: 240.0,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 1,
        orderID: 1,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        product_image: null,
        variation_name: "variation 1",
      },
      {
        orderItemID: 2,
        orderID: 1,
        productID: 2,
        productVariationID: 3,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Eco-Friendly Bamboo Toothbrush",
        product_image: null,
        variation_name: "variation 3",
      },
    ],

    //shoppper inner join
    username: "Samantha Miller",
    userID: 1,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: 2,
    // inner join Voucher
    promo_type: "Percent Discount",
    discount_amount: 0.2,
  },

  {
    orderID: 2,
    shopperID: 2,
    deliveryAddressID: 2,
    shopperClaimedVoucherID: 2,
    status: "Preparing",
    shipping_method: "Delivery",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "",
    total_price: 195.5,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 3,
        orderID: 2,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        product_image: null,
        variation_name: "variation 1",
      },
      {
        orderItemID: 4,
        orderID: 2,
        productID: 2,
        productVariationID: 3,
        quantity: 2,
        price: 120.0,
        //inner join product
        product_name: "Eco-Friendly Bamboo Toothbrush",
        product_image: null,
        variation_name: "variation 3",
      },
    ],

    //shoppper inner join
    username: "Benjamin Martinez",
    userID: 2,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: 2,
    // inner join Voucher
    promo_type: "Peso Discount",
    discount_amount: 15,
  },
  {
    orderID: 3,
    shopperID: 4,
    deliveryAddressID: 4,
    shopperClaimedVoucherID: 4,
    status: "Ready For Pick-Up",
    shipping_method: "Pick-Up",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "",
    total_price: 135.15,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 5,
        orderID: 3,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        product_image: null,
        variation_name: "variation 1",
      },
      {
        orderItemID: 6,
        orderID: 3,
        productID: 2,
        productVariationID: 3,
        quantity: 2,
        price: 120.0,
        //inner join product
        product_name: "Eco-Friendly Bamboo Toothbrush",
        product_image: null,
        variation_name: "variation 3",
      },
      {
        orderItemID: 7,
        orderID: 3,
        productID: 5,
        productVariationID: 3,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Fiber Bath Towels",
        variation_name: "variation 3",
      },
    ],

    //shoppper inner join
    username: "Ava Thompson",
    userID: 4,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: 2,
    // inner join Voucher
    promo_type: "Percent Discount",
    discount_amount: 0.2,
  },
  {
    orderID: 4,
    shopperID: 7,
    deliveryAddressID: 7,
    shopperClaimedVoucherID: 7,
    status: "On Delivery",
    shipping_method: "Delivery",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "",
    total_price: 120.0,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 5,
        orderID: 3,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        variation_name: "variation 1",
      },
    ],

    //shoppper inner join
    username: "Elijah Williams",
    userID: 7,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: 2,
    // inner join Voucher
    promo_type: "Free Shipping",
    discount_amount: 20.0,
  },
  {
    orderID: 5,
    shopperID: 4,
    deliveryAddressID: 4,
    shopperClaimedVoucherID: 4,
    status: "Complete",
    shipping_method: "Pick-Up",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "2023-07-10 15:30:30",
    total_price: 55.0,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 6,
        orderID: 5,
        productID: 2,
        productVariationID: 3,
        quantity: 2,
        price: 120.0,
        //inner join product
        product_name: "Eco-Friendly Bamboo Toothbrush",
        product_image: null,
        variation_name: "variation 3",
      },
    ],

    //shoppper inner join
    username: "Ava Thompson",
    userID: 1,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: 2,
    // inner join Voucher
    promo_type: "Percent Discount",
    discount_amount: 0.2,
  },
  {
    orderID: 6,
    shopperID: 5,
    deliveryAddressID: 5,
    shopperClaimedVoucherID: 5,
    status: "Cancelled",
    shipping_method: "Pick-Up",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "",
    total_price: 35.0,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 5,
        orderID: 3,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        product_image: null,
        variation_name: "variation 1",
      },
    ],

    //shoppper inner join
    username: "Nick Jackson",
    userID: 1,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: null,
    // inner join Voucher
    promo_type: "",
    discount_amount: 0,
  },

  {
    orderID: 7,
    shopperID: 10,
    deliveryAddressID: 10,
    shopperClaimedVoucherID: 10,
    status: "For Refund",
    shipping_method: "Delivery",
    created_at: "2023-05-10 15:30:00",
    approved_at: "2023-05-10 15:30:30",
    completed_at: "",
    total_price: 35.0,
    shipping_fee: 15.0,

    // inner join
    orderItem: [
      {
        orderItemID: 5,
        orderID: 3,
        productID: 1,
        productVariationID: 1,
        quantity: 1,
        price: 120.0,
        //inner join product
        product_name: "Bamboo Bliss Bedsheets",
        product_image: null,
        variation_name: "variation 1",
      },
    ],

    //shoppper inner join
    username: "Noah Robinson",
    userID: 1,
    //user innser join
    contact_number: "09661234567",
    // inner join deliveryAddress
    municipality: "Tuguegarao City",
    postal_code: "3500",
    region: "Cagayan Valley",
    province: "Cagayan ",
    addressLine1: "#40 Apple Street",
    addressLine2: "",
    barangay: "Centro 2",
    // inner join shopperClaimedVoucher
    voucherID: null,
    // inner join Voucher
    promo_type: "",
    discount_amount: 0,
  },
];

export default orderData;
