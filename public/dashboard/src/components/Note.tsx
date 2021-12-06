import { Container, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'

function Note({children, author, color} : {children: any, author: string, color?: string}) {
    const defaultColor = "gray.200"
    // lineChart1const [color, setColor] = useState('grey.50')

    return (
        <Container
        height="10rem"
        borderRadius="base"

        backgroundColor={color || defaultColor}>
            <Text>{children}</Text>
            <Text>By: {author}</Text>
            
        </Container>
    )
}

export default Note