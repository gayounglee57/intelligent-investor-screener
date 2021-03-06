import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { IntelligentTable } from "./components/IntelligentTable";
import { HeaderText } from "./components/HeaderText";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="App-header">
            <HeaderText />
            <IntelligentTable />
          </header>
        </div>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default App;
