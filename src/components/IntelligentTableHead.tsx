import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const IntelligentTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell align="right">Ticker Symbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">TTM EPS</TableCell>
            <TableCell align="right">Shares outstanding</TableCell>
            <TableCell align="right">Most recent net income</TableCell>
            <TableCell align="right">Most recent EPS</TableCell>
        </TableRow>
    </TableHead>
);