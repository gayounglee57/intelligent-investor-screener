import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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

// could move getters to util
function getBooleanEmoji(evaluation: boolean) {
  return evaluation ? '✨' : '👎🏽';
}

// function getEpsEvaluation(epsMostRecent: number, epsTtm: number) {
//   const epsBoolean = epsMostRecent > 0 && epsTtm > 0;
//   return getBooleanEmoji(epsBoolean);
// }

// turn these into utils of separate file and write tests to QA!
function getEpsEvaluation(defaultKeyStatistics: object) {
  const sharesOutstanding: number = defaultKeyStatistics.sharesOutstanding.raw;
  const netIncome: object = defaultKeyStatistics.netIncomeToCommon;
  const epsMostRecent: string = (netIncome.raw / sharesOutstanding);
  const epsTtm = defaultKeyStatistics.trailingEps.raw;
  const epsBoolean = epsMostRecent > 0 && epsTtm > 0;
  return getBooleanEmoji(epsBoolean);
}

function getPeRatioEvaluation(peRatioMostRecent: number, peRatioTtm: number) {
  const peRatioBoolean = peRatioMostRecent <= 25 && peRatioTtm <= 25;
  return getBooleanEmoji(peRatioBoolean);
}

function getBookValueEvaluation(bookValue: number, priceValue: number) {
  const bookValueBoolean = priceValue < (bookValue * 2);
  return getBooleanEmoji(bookValueBoolean);
}

function getNetValueEvaluation(bookValue: number, sharesOutstanding: number, marketCap: number) {
  const netValue = bookValue * sharesOutstanding;
  const netValueBoolean = (netValue / marketCap) >= 0.5;
  return getBooleanEmoji(netValueBoolean);
}

function getLiabilitesEvaluation(totalAssets: number, totalDebt: number) {
  const liabilitiesEvaluation = totalDebt * 2 < totalAssets;
  return getBooleanEmoji(liabilitiesEvaluation);
}

function getLongTermDebtEvaluation(bookValue: number, totalAssets: number, latestLongTermDebt: number, sharesOutstanding: number) {
  const financed = (totalAssets + latestLongTermDebt) / sharesOutstanding;
  const longTermDebtBoolean = bookValue / financed > 0.5;
  return getBooleanEmoji(longTermDebtBoolean);
}

// util - move if need to be shared
function createRow({ price, defaultKeyStatistics, financialData }, balanceSheetData) {
  const annualLongTermDebts: [object] = balanceSheetData.timeSeries.annualLongTermDebt;
  const latestLongTermDebtReport: object = annualLongTermDebts[annualLongTermDebts.length - 1];
  const latestLongTermDebt: number = latestLongTermDebtReport.reportedValue.raw;
  console.log('latestLongTermDebt', latestLongTermDebt);

  const sharesOutstanding: number = defaultKeyStatistics.sharesOutstanding.raw;
  const netIncome: object = defaultKeyStatistics.netIncomeToCommon;
  const epsMostRecent: string = (netIncome.raw / sharesOutstanding);
  const priceValue: number = price.regularMarketPrice.raw;
  const epsTtm: number = defaultKeyStatistics.trailingEps.raw;
  const totalDebt: number = financialData.totalDebt.raw;
  const marketCap: number = price.marketCap.raw;
  const bookValue: number = defaultKeyStatistics.bookValue.raw
  const totalAssets: number = bookValue * sharesOutstanding;

  // const epsEvaluation = getEpsEvaluation(epsMostRecent, defaultKeyStatistics.trailingEps.raw);
  const epsEvaluation = getEpsEvaluation(defaultKeyStatistics);
  const peRatioEvaluation = getPeRatioEvaluation(priceValue / epsMostRecent, priceValue / epsTtm);
  const bookValueEvaluation = getBookValueEvaluation(bookValue, priceValue);
  // const netValueEvaluation = getNetValueEvaluation(bookValue, sharesOutstanding, marketCap);
  const liabilitiesEvaluation = getLiabilitesEvaluation(totalAssets, totalDebt);
  const longTermDebtEvaluation = getLongTermDebtEvaluation(bookValue, totalAssets, latestLongTermDebt, sharesOutstanding);

  const row = createData(
    price.symbol,
    epsEvaluation,
    peRatioEvaluation,
    bookValueEvaluation,
    longTermDebtEvaluation,
    liabilitiesEvaluation,
  );
  return row;
}

export const IntelligentTableRowUI = ({ data, balanceSheetData }) => {
  const row = createRow(data, balanceSheetData);

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
