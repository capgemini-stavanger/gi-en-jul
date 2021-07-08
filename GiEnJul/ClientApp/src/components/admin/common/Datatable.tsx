import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';

type Props = {
    data: JSON[];
}

const Datatable: React.FC<Props> =({data}) => {
    const columns = Object.keys(data[0]);
    console.log(Object.values(data[0]))
    console.log(Object.values(data[0]))
    const rows = Object.values(data)
    return (
       <TableContainer>
           <Table>
               <TableHead>
                   <TableRow>
                          {columns.map(heading => <TableCell>{heading}</TableCell>)}
                   </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.map(row => 
                       <TableRow>
                           {columns.map(column => 
                           <TableCell>{row[column]}</TableCell>)}
                       </TableRow>)}
                   </TableBody>

               
           </Table>
       </TableContainer>
    )
}

export default Datatable;