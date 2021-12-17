import { Box } from '@chakra-ui/layout'
import { useStyleConfig } from '@chakra-ui/system'
import React from 'react'

function Card( {children, variant, ...rest}: {children: React.ReactNode, variant?: string}) {

    const styles = useStyleConfig('Card', { variant })

    return (
        <Box __css={styles} {...rest} >
            {children}
        </Box>
    )
}

export default Card
