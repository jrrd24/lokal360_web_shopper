import React, { createContext, useContext, useState } from "react";

const DateRangeContext = createContext();

// Create a custom hook to access the context
export function useDateRange() {
  return useContext(DateRangeContext);
}

export function DateRangeProvider({ children }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Provide the date range values to the context
  const contextValue = {
    dateRange: state[0], // Assuming you only have one range
    setDateRange: (newRange) => setState([newRange]),
  };

  return (
    <DateRangeContext.Provider value={contextValue}>
      {children}
    </DateRangeContext.Provider>
  );
}
