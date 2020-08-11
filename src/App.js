import React from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <header>
        <Typography variant="h4" style={{padding:"5px"}}>
          Free Loan Calculators
        </Typography>
      </header>
      <body>
        <Dashboard/>
      </body>
    </div>
  );
}

export default App;
