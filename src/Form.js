import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Monthly, TotalCost, TotalInterest, CostPerYear } from './Calculations.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FunctionsIcon from '@material-ui/icons/Functions';

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

export default function Form() {
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
        <TextField
          style={{ padding: '5px' }}
          id="outlined-basic"
          label="Loan Amount"
          value={loanAmount}
          name="LoanAmount"
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
          label="Loan Term"
          value={loanTerm}
          name="LoanTerm"
          onChange={handleChange}
          variant="outlined" />

        <br />
        <br />

        {/* <div style={{ margin: '10px' }} >
        <Slider onChange={handleChange} loanTerm={loanTerm} />
      </div> */}

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<FunctionsIcon />}
        >
          Calculate
        </Button>

        <br />
        <br />

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
          label="Interest Amount"
          value={interest}
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
      </div>
    </>
  );
}
