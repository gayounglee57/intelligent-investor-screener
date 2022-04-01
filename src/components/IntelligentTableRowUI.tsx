import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function createData(
  tickerSymbol: string,
  price: number,
  epsTtm: number,
  sharesOutstanding: string,
  netIncome: string,
  epsMostRecent: string
) {
  return {
    tickerSymbol,
    price,
    epsTtm,
    sharesOutstanding,
    netIncome,
    epsMostRecent,
  };
}

// util - move if need to be shared
function createRow({ price, defaultKeyStatistics }) {
  const sharesOutstanding: number = defaultKeyStatistics.sharesOutstanding;
  const netIncome: number = defaultKeyStatistics.netIncomeToCommon;
  const epsMostRecent: string = (netIncome.raw / sharesOutstanding.raw).toFixed(
    2
  );
  const row = createData(
    price.symbol,
    price.regularMarketPrice.raw,
    defaultKeyStatistics.trailingEps.raw,
    sharesOutstanding.longFmt,
    netIncome.longFmt,
    epsMostRecent
  );
  return row;
}

export const IntelligentTableRowUI = ({ data }) => {
  const row = createRow(data);

  return (
    <TableRow
      key={row.tickerSymbol}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.tickerSymbol}
      </TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.epsTtm}</TableCell>
      <TableCell align="right">{row.sharesOutstanding}</TableCell>
      <TableCell align="right">{row.netIncome}</TableCell>
      <TableCell align="right">{row.epsMostRecent}</TableCell>
    </TableRow>
  );
};
