interface IRawFormatted {
  raw: number;
  fmt: string;
  longFmt?: string;
}

interface IDefaultKeyStatistics {
  sharesOutstanding: IRawFormatted;
  netIncomeToCommon: IRawFormatted;
  trailingEps: IRawFormatted;
  bookValue: IRawFormatted;
}

interface IPrice {
  symbol: string;
  regularMarketPrice: IRawFormatted;
}

interface IAnnualLongTermDebt {
  dataId: number;
  asOfDate: string;
  periodType: string;
  currencyCode: string;
  reportedValue: IRawFormatted;
}

interface IMainStats {
  sharesOutstanding: number;
  epsTtm: number;
  bookValue: number;
  epsMostRecent: number;
  totalAssets: number;
}

interface IPriceStats {
  symbol: string;
  priceValue: number;
}

export function getBooleanEmoji(evaluation: boolean): string {
  return evaluation ? "✨" : "👎🏽";
}

export function getMainStats(
  defaultKeyStatistics: IDefaultKeyStatistics
): IMainStats {
  const sharesOutstanding: number = defaultKeyStatistics.sharesOutstanding.raw;
  const netIncome: IRawFormatted = defaultKeyStatistics.netIncomeToCommon;
  const epsTtm: number = defaultKeyStatistics.trailingEps.raw;
  const bookValue: number = defaultKeyStatistics.bookValue.raw;
  const epsMostRecent: number = netIncome.raw / sharesOutstanding;
  const totalAssets: number = bookValue * sharesOutstanding;

  return {
    sharesOutstanding,
    epsTtm,
    bookValue,
    epsMostRecent,
    totalAssets,
  };
}

export function getPriceStats(price: IPrice): IPriceStats {
  const symbol: string = price.symbol;
  const priceValue: number = price.regularMarketPrice.raw;

  return {
    symbol,
    priceValue,
  };
}

export function getLatestLongTermDebt(timeSeries): number {
  const annualLongTermDebts: [IAnnualLongTermDebt] =
    timeSeries.annualLongTermDebt;
  const latestLongTermDebtReport: IAnnualLongTermDebt =
    annualLongTermDebts[annualLongTermDebts.length - 1];
  return latestLongTermDebtReport.reportedValue.raw;
}

export function getEpsEvaluation(epsMostRecent: number, epsTtm: number) {
  const epsBoolean = epsMostRecent > 0 && epsTtm > 0;
  return getBooleanEmoji(epsBoolean);
}

export function getPeRatioEvaluation(
  epsMostRecent: number,
  epsTtm: number,
  priceValue: number
) {
  const peRatioMostRecent = priceValue / epsMostRecent;
  const peRatioTtm = priceValue / epsTtm;
  const peRatioBoolean = peRatioMostRecent <= 25 && peRatioTtm <= 25;
  return getBooleanEmoji(peRatioBoolean);
}

export function getBookValueEvaluation(bookValue: number, priceValue: number) {
  const bookValueBoolean = priceValue < bookValue * 2;
  return getBooleanEmoji(bookValueBoolean);
}

export function getLiabilitesEvaluation(
  totalAssets: number,
  totalDebt: number
) {
  const liabilitiesEvaluation = totalDebt * 2 < totalAssets;
  return getBooleanEmoji(liabilitiesEvaluation);
}

export function getLongTermDebtEvaluation(
  bookValue: number,
  totalAssets: number,
  latestLongTermDebt: number,
  sharesOutstanding: number
) {
  const financed = (totalAssets + latestLongTermDebt) / sharesOutstanding;
  const longTermDebtBoolean = bookValue / financed > 0.5;
  return getBooleanEmoji(longTermDebtBoolean);
}
