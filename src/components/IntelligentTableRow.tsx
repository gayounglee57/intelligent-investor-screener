import * as React from 'react';
import axios from "axios";
import {useQuery} from 'react-query';
import {IntelligentTableRowUI} from './IntelligentTableRowUI.tsx';
import {TransitionText} from './TransitionText.tsx';
import {mockData} from '../__tests__/mockStatsData.ts';

// config - hide api key with Node BE, Next.js BE
const url = 'https://yh-finance.p.rapidapi.com/stock/v3/get-statistics';

function getOptions(symbol: string) {
    return {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-statistics',
        params: {symbol},
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    };
}

function useStats(symbol: string) {
    const options = getOptions(symbol);
    return useQuery("stats-" + symbol, async () => {
      const { data } = await axios.get(url, options);
      return data;
    });
    // return mockData;
}

function getMockData() {
    return mockData;
}

export const IntelligentTableRow = ({ticker}) => {
    console.log('ticker', ticker);
    const { isLoading, error, data } = useStats(ticker);
    // const data = getMockData();
    console.log('data from row', data);

    if(isLoading || !data) return <TransitionText text={"Loading"} />;
    if(error) return <TransitionText text={"Error"} />;
    
    return (
        <>
            {data && <IntelligentTableRowUI data={data} />}
        </>
    );
}