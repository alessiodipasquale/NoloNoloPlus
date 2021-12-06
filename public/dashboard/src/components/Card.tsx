import { Box } from '@chakra-ui/react'
import React from 'react'

function Card({children} : {children: any}) {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default Card
