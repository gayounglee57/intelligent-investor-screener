import * as React from 'react';
import axios from "axios";
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';

// config - hide api key with Node BE
const url = 'https://yh-finance.p.rapidapi.com/stock/v3/get-statistics';
const  options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-statistics',
    params: {symbol: 'GOOG'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
};

// util - move if need to be shared
function createData(
    tickerSymbol: string,
    price: number,
    epsTtm: number,
    sharesOutstanding: string,
    netIncome: string,
    epsMostRecent: string,
  ) {
    return { tickerSymbol, price, epsTtm, sharesOutstanding, netIncome, epsMostRecent };
}

// util - move if need to be shared
function createRows({price, defaultKeyStatistics}) {
    const sharesOutstanding: number = defaultKeyStatistics.sharesOutstanding;
    const netIncome: number = defaultKeyStatistics.netIncomeToCommon;
    const epsMostRecent: string = (netIncome.raw / sharesOutstanding.raw).toFixed(2);
    const rows = [
        createData(
            price.symbol, 
            price.regularMarketPrice.raw, 
            defaultKeyStatistics.trailingEps.raw,
            sharesOutstanding.longFmt, 
            netIncome.longFmt,
            epsMostRecent,
        ),
    ];
    return rows;
}

export const IntelligentTableBody = () => {
    const [data, setData] = React.useState(null);
    const [rows, setRows] = React.useState([
        createData('GOOG', 159, 6.0, 24, 4.0, 50),
        createData('HI', 159, 6.0, 24, 4.0, 50),
    ]);

    React.useEffect(() => {
        // const fetchData = async () => {
        //     await axios
        //         .get(url, options)
        //         .then((response) => {
        //             setData(response.data);
        //             console.log("done", data); 
        //             const dynamicRows = createRows(response.data);
        //             setRows(dynamicRows);
        //         }
        //     );
        // };

        // try {
        //     // write tests
        //     fetchData();
        // }
        // catch(e) {
        //     console.error(e);
        // }
    }, [data]);
    
    return (
        <TableBody>
            {rows.map((row, index) => (
            <TableRow
                key={row.tickerSymbol}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {index === rows.length - 1 ? <Input placeholder="eg. GOOG" /> : row.tickerSymbol}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.epsTtm}</TableCell>
                <TableCell align="right">{row.sharesOutstanding}</TableCell>
                <TableCell align="right">{row.netIncome}</TableCell>
                <TableCell align="right">{row.epsMostRecent}</TableCell>
            </TableRow>
            ))}
        </TableBody>
    );
}