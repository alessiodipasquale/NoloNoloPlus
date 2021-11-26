import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import GenericTable from "../GenericTable";

export default function EmployeeHistory({ employeeId, isLoading, data } : {employeeId: string, isLoading: boolean, data: any }) {
    
    

    const columns = useMemo(() => [
        {
            Header: "id",
            accessor: "_id"
        },
        {
            Header: "client id",
            accessor: "clientId"
        },
        {
            Header: "item id",
            accessor: "itemId"
        },
        // {
        //     Header: "start date",
        //     accessor: "startDate"
        // },
        // {
        //     Header: "end date",
        //     accessor: "endDate"
        // },
        {
            Header: "status",
            accessor: "state"
        },
        {
            Header: "final price",
            accessor: "finalPrice"
        }
    ], []);



    return (
        isLoading ? <p>loading</p> :  //TODO loading animation
        <GenericTable 
        columns={columns} 
        data={data} />
    )
}
