import React, { useEffect, useState } from 'react'
import RentalDash from '../components/rentals/RentalDash'
import type { Rental } from '../types/db-entities'

function Rentals() {

    const [data, setData] = useState([]) as [Rental[], any]
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        fetch(`rentals`, {
            headers: {
                authorization: "bearer " + process.env.REACT_APP_TOKEN
            }
        })
        .then((res) => {
            return res.json();
        })
        .then(json => {
            setData(json); //TODO: define type for database objects
            setIsLoading(false)
            return json;
        })
        .then(json => console.log(json))
    }, [])


    return (
        <div>hi</div>
        //<RentalDash rentals={data}/>
    )
}

export default Rentals
