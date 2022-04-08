import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const TransitionText = ({ text }) => (
  <TableRow
    key={text}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {text}
    </TableCell>
  </TableRow>
);
