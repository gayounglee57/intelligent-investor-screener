import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { IntelligentTableHead } from "./IntelligentTableHead";
import { IntelligentTableBody } from "./IntelligentTableBody";

export const IntelligentTable = () => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <IntelligentTableHead />
        <IntelligentTableBody />
      </Table>
    </TableContainer>
  );
};
