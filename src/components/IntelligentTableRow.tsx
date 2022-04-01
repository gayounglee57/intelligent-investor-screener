import * as React from 'react';
import axios from "axios";
import {useQuery} from 'react-query';
import {IntelligentTableRowUI} from './IntelligentTableRowUI.tsx';

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
}

export const IntelligentTableRow = ({ticker}) => {
    console.log('ticker', ticker);
    const { isLoading, error, data } = useStats(ticker);
    console.log('data from row', data);

    if(isLoading || !data) return <div>{"Loading"}</div>;
    if(error) return <div>{"Error: " + error}</div>;
    
    return (
        <>
            {data && <IntelligentTableRowUI data={data} />}
        </>
    );
}