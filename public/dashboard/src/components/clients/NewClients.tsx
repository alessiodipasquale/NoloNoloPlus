import React from 'react'
import { Client } from '../../@types/db-entities'

function NewClients( { clients } : {clients: Client[]})  {

    const clientsByRegistrationDate = clients.reduce((acc, client) => {
        

        return acc
    }, [] )

    return (
        <div>
            
        </div>
    )
}

export default NewClients
