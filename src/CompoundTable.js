import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import numberWithCommas from './Helpers/numberWithCommas.js';

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

export default function CompoundTable(props) {
    const classes = useStyles();
    const { data, loading } = props;

    if (loading) {
        return (null)
    }
    else {
        return (
            <TableContainer component={Paper} style={{ maxHeight: '400px' }}>
                <Table stickyHeader size="small" className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Total Interest</TableCell>
                            <TableCell align="right">Payments</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right">£{numberWithCommas(row.amount)}</TableCell>
                                <TableCell align="right">£{numberWithCommas(row.totalInterest)}</TableCell>
                                <TableCell align="right">£{numberWithCommas(row.totalPayments)}</TableCell>
                                <TableCell align="right">{numberWithCommas(row.year)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}