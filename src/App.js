import React from 'react';
import './App.css';
import Dashboard from './Dashboard.js';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header>
        <Typography variant="h4" style={{ padding: "5px" }}>
          Free Loan Calculators
        </Typography>
      </header>
      <body>
        <Dashboard />
      </body>
      <footer>
        <footer style={{
          width: "100%",
          height: "50px",
          borderTop: "1px solid #eaeaea",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <p>
            <a
              href="https://www.macaulaywhite.co.uk"
              target="_blank"
              style={{ color: 'inherit', textDecoration: 'none' }}
              rel="noopener noreferrer"
            >
              Designed by{' '} Macaulay White
            </a>
          </p>
        </footer>
      </footer>
    </div >
  );
}

export default App;
