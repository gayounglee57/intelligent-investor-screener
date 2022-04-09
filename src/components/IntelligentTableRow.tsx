import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";
import { IntelligentTableRowUI } from "./IntelligentTableRowUI.tsx";
import { TransitionText } from "./TransitionText.tsx";
// import {mockData} from '../__tests__/mockStatsData.ts';

// config - hide api key with Node BE, Next.js BE
const statsUrl = "https://yh-finance.p.rapidapi.com/stock/v3/get-statistics";
const balanceSheetUrl =
  "https://yh-finance.p.rapidapi.com/stock/v2/get-balance-sheet";

function getOptions(symbol: string, url: string): AxiosRequestConfig<any> {
  return {
    method: "GET",
    url,
    params: { symbol },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };
}

function useStats(symbol: string) {
  const options = getOptions(symbol, statsUrl);
  return useQuery("stats-" + symbol, async () => {
    const { data } = await axios.get(statsUrl, options);
    return data;
  });
}

function useBalanceSheet(symbol: string) {
  const options = getOptions(symbol, balanceSheetUrl);
  return useQuery("balance-sheet-" + symbol, async () => {
    const { data } = await axios.get(balanceSheetUrl, options);
    return data;
  });
}

// function getMockData() {
//     return mockData;
// }

export const IntelligentTableRow = ({ ticker }) => {
  console.log("ticker", ticker);
  // const statsData = getMockData();
  const {
    isLoading: isStatsLoading,
    error: statsError,
    data: statsData,
  } = useStats(ticker);
  const {
    isLoading: isBalanceSheetLoading,
    error: balanceSheetError,
    data: balanceSheetData,
  } = useBalanceSheet(ticker);
  const isLoading = isStatsLoading || isBalanceSheetLoading;

  if (isLoading || !statsData || !balanceSheetData)
    return <TransitionText text={"Loading"} />;
  if (statsError || balanceSheetError) return <TransitionText text={"Error"} />;

  return (
    <>
      {statsData && balanceSheetData && (
        <IntelligentTableRowUI
          statsData={statsData}
          balanceSheetData={balanceSheetData}
        />
      )}
    </>
  );
};
