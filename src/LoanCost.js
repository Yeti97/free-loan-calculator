import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Monthly, TotalCost, TotalInterest, CostPerYear } from './Calculations.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FunctionsIcon from '@material-ui/icons/Functions';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  form: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function LoanCost() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [aprAmount, setAprAmount] = useState(3.2);
  const [loanTerm, setLoanTerm] = useState(36);
  const [monthly, setMonthly] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [interest, setinterest] = useState(0);
  const [costPerYear, setCostPerYear] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    //Check to see what we're updating and set the hook
    if (name === "LoanAmount") {
      setLoanAmount(value);
    }
    if (name === "LoanTerm") {
      setLoanTerm(value);
    }
    if (name === "AprAmount") {
      setAprAmount(value);
    }
  }

  const handleSubmit = () => {
    //Run the functions required to calculate all the data. Then setting the hooks
    let monthlyCostResponse = Monthly(aprAmount, loanTerm, loanAmount);
    setMonthly(monthlyCostResponse);

    let totalCostResponse = TotalCost(aprAmount, loanTerm, loanAmount);
    setTotalCost(totalCostResponse);

    let totalInterestResponse = TotalInterest(aprAmount, loanTerm, loanAmount);
    setinterest(totalInterestResponse);

    let costPerYear = CostPerYear(monthlyCostResponse);
    setCostPerYear(costPerYear);
  }

  return (
    <>
      <div style={{ padding: '5px', margin: '5px' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <TextField
              style={{ padding: '5px' }}
              id="outlined-basic"
              label="Loan Amount"
              value={loanAmount}
              name="LoanAmount"
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              onChange={handleChange}
              variant="outlined" />
            <TextField
              style={{ padding: '5px' }}
              id="outlined-basic"
              label="APR (%)"
              value={aprAmount}
              name="AprAmount"
              onChange={handleChange}
              variant="outlined" />
            <TextField
              style={{ padding: '5px' }}
              id="outlined-basic"
              label="Loan Term (months)"
              value={loanTerm}
              name="LoanTerm"
              onChange={handleChange}
              variant="outlined" />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FunctionsIcon />}
            >
              Calculate
            </Button>
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              style={{ padding: '5px' }}
              id="filled-read-only-input"
              label="Monthly Cost"
              value={monthly}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              variant="filled"
            />

            <TextField
              style={{ padding: '5px' }}
              id="filled-read-only-input"
              label="Cost per year"
              value={costPerYear}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              variant="filled"
            />

            <TextField
              style={{ padding: '5px' }}
              id="filled-read-only-input"
              label="Total Cost"
              value={totalCost}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              variant="filled"
            />

            <TextField
              style={{ padding: '5px' }}
              id="filled-read-only-input"
              label="Total Interest"
              value={interest}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              variant="filled"
            />


          </Grid>
        </Grid>
      </div>
    </>
  );
}
