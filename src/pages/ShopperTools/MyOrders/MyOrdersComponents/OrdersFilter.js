import React from "react";
import OrdersFilterContainer from "../../../../components/Containers/OrdersFilterContainer";
import MapData from "../../../../utils/MapData";
import theme from "../../../../Theme";

function OrdersFilter({ setSelectedFilter, selectedFilter }) {
  const orderOptions = [
    { id: 1, name: "Pending Approval", color: theme.palette.status.pending },
    { id: 2, name: "Preparing", color: theme.palette.status.preparing },
    { id: 3, name: "Ready For Pick-Up", color: theme.palette.status.pickUp },
    { id: 4, name: "On Delivery", color: theme.palette.status.delivery },
    { id: 5, name: "Complete", color: theme.palette.status.complete },
    { id: 6, name: "Cancelled", color: theme.palette.status.cancel },
    { id: 7, name: "For Refund", color: theme.palette.status.refund },
  ];
  return (
    <div>
      <MapData
        inputData={orderOptions}
        component={(props) => (
          <OrdersFilterContainer
            {...props}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )}
        horizontal
        height={90}
      />
    </div>
  );
}

export default OrdersFilter;
