import { Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';

type Props = {
    data: JSON;
}

const Datatable: React.FC<Props> =({data}) => {
    const columns = Object.keys(data);
    return (
       <TableContainer>
           <Table>
               <TableHead>
                   <TableRow>
                       <TableCell>
                          {columns.map(heading => <TableCell>{heading}</TableCell>)} 
                       </TableCell>
                   </TableRow>
               </TableHead>
           </Table>
       </TableContainer>
    )
}

export default Datatable;