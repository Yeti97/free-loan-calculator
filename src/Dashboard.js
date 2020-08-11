import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LoanCost from './LoanCost.js';
import Chart from './Chart.js';
import { Typography } from '@material-ui/core';
import CompoundInterest from './CompoundInterest.js';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={1} style={{border: '1px lightgrey solid'}}>
                        <Typography variant="h6"> Loan Cost </Typography>
                        <LoanCost />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={1} style={{border: '1px lightgrey solid'}}>
                        <Typography variant="h6"> Savings Interest Calculator </Typography>
                        <CompoundInterest />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={1} style={{border: '1px lightgrey solid'}}>
                        <Typography variant="h6"> Overpayment Calculator </Typography>
                        <Typography> Under Construction </Typography>
                        {/* <LoanCost /> */}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
