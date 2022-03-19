import {StyledEngineProvider} from '@mui/material/styles';
import {IntelligentTable} from './components/IntelligentTable.tsx';
import {HeaderText} from './components/HeaderText.tsx';
import './App.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <header className="App-header">
          <HeaderText />
          <IntelligentTable />
        </header>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
