import { Box } from '@chakra-ui/react'
import React from 'react'
import EmployeeDetails from '../components/employees/EmployeeDashboard'
import RentalHistory from '../components/employees/RentalsHistory'

function Employees() {
    return (
            <EmployeeDetails employeeId="User1"/>
    )
}

export default Employees
