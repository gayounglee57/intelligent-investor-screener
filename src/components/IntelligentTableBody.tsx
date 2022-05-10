import * as React from "react";
import TableBody from "@mui/material/TableBody";
import { IntelligentTableRow } from "./IntelligentTableRow";
import { IntelligentTableInput } from "./IntelligentTableInput";

export const IntelligentTableBody = () => {
  const [tickers, setTickers] = React.useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTickers([...tickers, e.target.value]);
      e.target.value = "";
    }
  };

  return (
    <TableBody>
      {tickers &&
        tickers.map((ticker) => (
          <IntelligentTableRow key={ticker} ticker={ticker} />
        ))}
      <IntelligentTableInput handleKeyPress={handleKeyPress} />
    </TableBody>
  );
};
