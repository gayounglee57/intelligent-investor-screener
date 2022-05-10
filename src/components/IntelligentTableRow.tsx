import * as React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";
import { IntelligentTableRowUI } from "./IntelligentTableRowUI";
import { TransitionText } from "./TransitionText";
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
  return useQuery(
    "stats-" + symbol,
    async () => {
      const { data } = await axios.get(statsUrl, options);
      console.log("About to call stats");
      return data;
    },
    { staleTime: 1000 * 60 * 60 }
  );
}

function useBalanceSheet(symbol: string) {
  const options = getOptions(symbol, balanceSheetUrl);
  return useQuery(
    "balance-sheet-" + symbol,
    async () => {
      const { data } = await axios.get(balanceSheetUrl, options);
      console.log("About to call balance sheet");
      return data;
    },
    { staleTime: 1000 * 60 * 60 }
  );
}

// function getMockData() {
//     return mockData;
// }

export const IntelligentTableRow = ({ ticker }) => {
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

  console.log("statsData", statsData);
  console.log("balanceSheetData", balanceSheetData);

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
