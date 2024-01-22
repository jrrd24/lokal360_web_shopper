import { Container } from "@mui/material";
import "./App.css";
import theme from "./Theme";
import { ThemeProvider } from "@emotion/react";
import { DateRangeProvider } from "./contexts/DateRangeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import "./css/scrollbar.css";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

// const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DateRangeProvider>
        <ThemeProvider theme={theme}>
          <Container disableGutters maxWidth="100%">
            <div className="App custom-scrollbar">
              <Router />
            </div>
          </Container>
        </ThemeProvider>
      </DateRangeProvider>
    </QueryClientProvider>
  );
}

export default App;
