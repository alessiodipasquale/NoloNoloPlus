import React from 'react'
import { Item } from '../../@types/db-entities'
import StatCard from '../cards/StatCard'

function AvailableCard( { items } : { items: Item[] } ) {

    const available = items.filter(item => item.available)

    const data = {
        "available": { 
            value: "" + available.length.toString() + "/" + items.length.toString(),
            helper: <></>
        }
    }


    return (
        <StatCard label="Available items" data={data} options={["available"]}/>
    )
}

export default AvailableCard
