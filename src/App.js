import { Container } from "@mui/material";
import "./App.css";
import theme from "./Theme";
import { ThemeProvider } from "@emotion/react";
import { DateRangeProvider } from "./contexts/DateRangeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";
import "./css/scrollbar.css";

const queryClient = new QueryClient();

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
