import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  getMainStats,
  getPriceStats,
  getLatestLongTermDebt,
  getEpsEvaluation,
  getPeRatioEvaluation,
  getBookValueEvaluation,
  getLiabilitesEvaluation,
  getLongTermDebtEvaluation,
} from "../utils/utils";

function createData(
  tickerSymbol: string,
  epsEvaluation: string,
  peRatioEvaluation: string,
  bookValueEvaluation: string,
  longTermDebtEvaluation: string,
  liabilitiesEvaluation: string
) {
  return {
    tickerSymbol,
    epsEvaluation,
    peRatioEvaluation,
    bookValueEvaluation,
    longTermDebtEvaluation,
    liabilitiesEvaluation,
  };
}

function createRow(
  { price, defaultKeyStatistics, financialData },
  { timeSeries }
) {
  const { sharesOutstanding, epsMostRecent, epsTtm, bookValue, totalAssets } =
    getMainStats(defaultKeyStatistics);
  const { priceValue, symbol } = getPriceStats(price);
  const latestLongTermDebt: number = getLatestLongTermDebt(timeSeries);
  const totalDebt: number = financialData.totalDebt.raw;
  const epsEvaluation = getEpsEvaluation(epsMostRecent, epsTtm);
  const bookValueEvaluation = getBookValueEvaluation(bookValue, priceValue);
  const liabilitiesEvaluation = getLiabilitesEvaluation(totalAssets, totalDebt);
  const peRatioEvaluation = getPeRatioEvaluation(
    epsMostRecent,
    epsTtm,
    priceValue
  );
  const longTermDebtEvaluation = getLongTermDebtEvaluation(
    bookValue,
    totalAssets,
    latestLongTermDebt,
    sharesOutstanding
  );

  const row = createData(
    symbol,
    epsEvaluation,
    peRatioEvaluation,
    bookValueEvaluation,
    longTermDebtEvaluation,
    liabilitiesEvaluation
  );
  return row;
}

export const IntelligentTableRowUI = ({ statsData, balanceSheetData }) => {
  const row = createRow(statsData, balanceSheetData);

  return (
    <TableRow
      key={row.tickerSymbol}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.tickerSymbol}
      </TableCell>
      <TableCell align="right">{row.epsEvaluation}</TableCell>
      <TableCell align="right">{row.peRatioEvaluation}</TableCell>
      <TableCell align="right">{row.bookValueEvaluation}</TableCell>
      <TableCell align="right">{row.longTermDebtEvaluation}</TableCell>
      <TableCell align="right">{row.liabilitiesEvaluation}</TableCell>
    </TableRow>
  );
};
