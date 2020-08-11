import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Monthly, TotalCost, TotalInterest, CostPerYear } from './Calculations.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FunctionsIcon from '@material-ui/icons/Functions';
import { Grid, Typography } from '@material-ui/core';
import Chart from './Chart.js';

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
  textField: {
    padding: '5px',
    width: '120px'
  }
}));

export default function CompoundInterest() {
  const classes = useStyles();
  const [initialAmount, setInitialAmount] = useState(5000);
  const [aprAmount, setAprAmount] = useState(3.2);
  const [monthly, setMonthly] = useState(0);
  const [term, setTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [interest, setinterest] = useState(0);
  const [costPerYear, setCostPerYear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "term") {
      setTerm(value);
    }
    if (name === "aprAmount") {
      setAprAmount(value);
    }
    if (name === "monthlyPayment") {
      setMonthlyPayment(value);
    }
  }

  const handleSubmit = () => {
    //Build the chart data to return
    //DATA = [Year 0, amount: 5000, interest: 50],[Year 1, amount: 7000, interest: 70],[Year 2, amount: 9000, interest: 100]
    //Return the year, amount and interest in the savings. Can also be used for a table view. 

    //Get the values we need to calculate
    let years = term;
    let apr = aprAmount;
    let initial = initialAmount;
    let months = years * 12;
    let totalInterest = 0;
    let totalPayments = 0;
    let dataArray = [];
    let monthCounter = 1;
    let yearCounter = 1;

    //For each month calculate the interest and monthly payments.
    for (let i = 1; i < months; i++) {
      //Get the current amount + monthly payment + Yearly APR / 12

      //Return
      let dataItem = {};
      dataItem.year = yearCounter;
      dataItem.month = monthCounter;

      if (monthCounter == 12) {
        yearCounter++;
        monthCounter = 1;
      } else {
        monthCounter++;
      }

      //Get the latest amount
      let total = parseInt(initial) + parseInt(monthlyPayment);
  
      //Work out the APR
      let princ = initialAmount;
      let intr = apr / 1200;
      let monthInterest = parseInt(initial) * intr;

      //Add the APR to our amount
      initial = parseInt(initial) + parseInt(monthlyPayment) + monthInterest;

      totalInterest += monthInterest;
      totalPayments += parseInt(monthlyPayment);

      //Build our object to return
      dataItem.amount = total;
      dataItem.interest = monthInterest.toFixed(2);
      dataItem.totalInterest = totalInterest.toFixed(2); 
      dataItem.totalPayments = totalPayments;
      dataArray.push(dataItem);
    }

    console.log(monthlyPayment);
    console.log(dataArray);
  }

  
  return (
    <>
      <div style={{ padding: '5px', margin: '5px' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Initial Amount"
              name="initialAmount"
              value={initialAmount}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              onChange={handleChange}
              variant="outlined" />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="APR (%)"
              value={aprAmount}
              name="aprAmount"
              onChange={handleChange}
              variant="outlined" />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Saving Term (years)"
              value={term}
              name="term"
              onChange={handleChange}
              variant="outlined" />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Monthly Payment"
              value={monthlyPayment}
              name="monthlyPayment"
              onChange={handleChange}
              variant="outlined" />

            <br />

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<FunctionsIcon />}
            >
              Calculate
            </Button>

            <Typography variant="subtitle2"> * interest is calculated monthly </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ overflowX: 'auto' }}>
              <Chart data={chartData} loading={loading} max={totalCost} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
