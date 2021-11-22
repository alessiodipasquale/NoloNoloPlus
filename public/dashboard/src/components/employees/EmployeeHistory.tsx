import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import GenericTable from "../GenericTable";

export default function EmployeeHistory({ employeeId } : {employeeId: string}) {
    
    const [rentals, setRentals] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`users/${employeeId}/rentals`, {
            headers: {
                authorization: "bearer " + process.env.REACT_APP_TOKEN
            }
        })
        .then((res) => {
            return res.json();
        })
        .then(json => {
            setRentals(json); //TODO: define type for database objects
            setIsLoading(false)
            return json;
        })
        .then(json => console.log(json))
    }, [employeeId])

    const columns = useMemo(() => [
        {
            Header: "id",
            accessor: "_id"
        },
        {
            Header: "start date",
            accessor: "startDate"
        },
        {
            Header: "end date",
            accessor: "endDate"
        },
        {
            Header: "status",
            accessor: "state"
        }
    ], []);



    return (
        isLoading ? <p>loading</p> :  //TODO loading animation
        <GenericTable 
        columns={columns} 
        data={rentals} />
    )
}
