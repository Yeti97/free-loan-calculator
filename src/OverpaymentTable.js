import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import numberWithCommas from './Helpers/numberWithCommas.js';

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

export default function OverpaymentTable(props) {
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
                            <TableCell align="right">Remaining /w Over</TableCell>
                            <TableCell align="right">Remaining no Overpayment</TableCell>
                            <TableCell align="right">Monthly Overpayment</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                {row.totalWithOver ? <TableCell align="right">£{numberWithCommas(row.totalWithOver)}</TableCell> : <TableCell align="right"></TableCell>}
                                {row.amount ? <TableCell align="right">£{numberWithCommas(row.amount)}</TableCell> : <TableCell align="right"></TableCell>}
                                {row.overPayment ? <TableCell align="right">£{numberWithCommas(row.overPayment)}</TableCell> : <TableCell align="right"></TableCell>}
                                {row.year ? <TableCell align="right">{numberWithCommas(row.year)}</TableCell> : <TableCell align="right"></TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}