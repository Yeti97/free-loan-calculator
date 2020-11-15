import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Monthly, TotalCost, TotalInterest, CostPerYear } from './Calculations.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FunctionsIcon from '@material-ui/icons/Functions';
import { Grid, Typography, Table } from '@material-ui/core';
import Chart from './LoanRepaymentChart.js';
import CompoundChart from './CompoundChart.js';
import OverpaymentTable from './OverpaymentTable.js';
import OverpaymentChart from './OverpaymentChart.js';

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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Overpayment() {
  const classes = useStyles();
  const [initialAmount, setInitialAmount] = useState(250000);
  const [aprAmount, setAprAmount] = useState(2);
  const [monthly, setMonthly] = useState(0);
  const [term, setTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(1060);
  const [totalAmount, setTotalAmount] = useState(0);
  const [interest, setinterest] = useState(0);
  const [costPerYear, setCostPerYear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [yearlyPercent, setYearlyPercent] = useState(10);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "initialAmount") {
      setInitialAmount(value);
    }
    if (name === "term") {
      setTerm(value);
    }
    if (name === "aprAmount") {
      setAprAmount(value);
    }
    if (name === "monthlyPayment") {
      setMonthlyPayment(value);
    }
    if (name === "yearlyPercent") {
      setYearlyPercent(value);
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
    let intitialOver = initialAmount;
    let maxOverpayment = 0;
    let yearly = yearlyPercent;
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

      //Work out the APR
      let intr = apr / 1200;
      let monthInterest = parseInt(initial) * intr;
      let monthInterestOver = parseInt(intitialOver) * intr;

      //Work out the max % for this month
      let monthlyInt = yearlyPercent / 1200;
      let overpaymentInt = parseInt(intitialOver) * monthlyInt;

      //Add the APR to our amount
      initial = (parseInt(initial) - parseInt(monthlyPayment)) + monthInterest;
      intitialOver = (parseInt(intitialOver) - parseInt(monthlyPayment) - overpaymentInt) + monthInterestOver;

      totalInterest += monthInterest;
      totalPayments += parseInt(monthlyPayment);

      if (intitialOver >= 0) {
        //Build our object to return
        dataItem.initialAmount = initialAmount.toFixed(2);
        dataItem.amount = initial.toFixed(0);
        dataItem.interest = monthInterest.toFixed(2);
        dataItem.totalInterest = totalInterest.toFixed(2);
        dataItem.totalPayments = totalPayments.toFixed(0);
        dataItem.totalWithOver = intitialOver.toFixed(0);
        dataItem.overPayment = ((parseInt(intitialOver) * 0.1) / 12).toFixed(2);
      }
      else {
        //Build our object to return
        dataItem.initialAmount = initialAmount.toFixed(2);
        dataItem.amount = initial.toFixed(0);
        dataItem.interest = monthInterest.toFixed(2);
        dataItem.totalInterest = totalInterest.toFixed(2);
        dataItem.totalPayments = totalPayments.toFixed(0);
      }

      dataArray.push(dataItem);
    }

    setTotalAmount(intitialOver);
    setChartData(dataArray);
    setLoading(false);
  }

  return (
    <>
      <div style={{ padding: '5px', margin: '5px' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Mortgage Amount"
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
              label="Term (years)"
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
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Yearly %"
              value={yearlyPercent}
              name="yearlyPercent"
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

          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ overflowX: 'auto' }}>
              <OverpaymentChart data={chartData.filter(x => x.month == 12).sort((a, b) => a < b)} loading={loading} max={totalAmount} initial={initialAmount} />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <OverpaymentTable data={chartData.filter(x => x.month == 12).sort((a, b) => a < b)} loading={loading} initial={initialAmount} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
