import {StyledEngineProvider} from '@mui/material/styles';
import {IntelligentTable} from './components/IntelligentTable.tsx';
import './App.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
    <div className="App">
      <header className="App-header">
        <h1>be intelligent.</h1>
        <p>
          Enter a ticker symbol and see if the stock is an intelligent pick.
        </p>
        <IntelligentTable sx={{
          bgcolor:'#9c1d21',
        }}/>
      </header>
    </div>
    </StyledEngineProvider>
  );
}

export default App;
