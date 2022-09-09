import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';



const Table = (props: tableProps) => {

    const columns: GridColDef[] = [
        {field: "id", headerName: "Order ID", width: 300},
        //maybe format this if I get the time
        {field: "createdDate", headerName: "Created Date", width: 150},
        {field: "createdByUsername", headerName: "Created By", width: 150},
        {field: "type", headerName: "Order Type", width:150},
        {field: "customerName", headerName: "Customer", width: 150}
    ]

    React.useEffect(() => {
        props.rows.forEach((element: Order) => {
            element.createdDate = new Date(element.createdDate);
            let index = element.type.indexOf('O');
            element.type = element.type.substring(0, index) + ' ' + element.type.substring(index);
        });
    }, [props.rows])

    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                rows={props.rows}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(newSelect: any) => {
                    props.onSelectChange(newSelect);
                }}
            />
        </div>
    )

}

export default Table;