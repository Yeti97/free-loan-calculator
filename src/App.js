import React from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <header>
        <Typography style={{padding:"5px"}}>
          Loan Repayment Calculator
        </Typography>
      </header>
      <body>
        <Dashboard/>
      </body>
    </div>
  );
}

export default App;
