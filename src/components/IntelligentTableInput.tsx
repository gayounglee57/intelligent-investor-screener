import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';

export const IntelligentTableInput = ({handleKeyPress}) => {
    return (
        <TableRow
                key={"inputRow"}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Input placeholder="eg. GOOG" onKeyPress={handleKeyPress} defaultValue=""/>
            </TableCell>
        </TableRow>
    )
}