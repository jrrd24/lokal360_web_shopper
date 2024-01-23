import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import HomepageContent from "./HomepageContent";
import { QueryClient, QueryClientProvider } from "react-query";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});
function Homepage() {
  //Set Document Title
  useEffect(() => {
    document.title = "Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomAppbar component={HomepageContent} isHome />
    </QueryClientProvider>
  );
}

export default Homepage;
