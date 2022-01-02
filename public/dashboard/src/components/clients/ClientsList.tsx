import React, { useMemo } from 'react'
import { Column } from 'react-table'
import { ClientWithRevenueAndDamage } from '../../@types/db-entities'
import GenericTable from '../GenericTable'

function ClientsList( { clients } : {clients : ClientWithRevenueAndDamage[]}) {

    const columns: Column[] = useMemo(() => [
        { 
            Header: "username",
            accessor: "user.username",
        },
        { 
            Header: "No of Rentals",
            accessor: "user.rentals.length",
        },
    ],[])

    return (
        <GenericTable columns={columns} data={clients} />
    )
}

export default ClientsList
