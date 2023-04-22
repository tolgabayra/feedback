'use client'

import { Box, Button, Collapse, useDisclosure } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Leftbar = (props: Props) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <div className='flex'>

            <Button onClick={onToggle}>Click Me</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p='40px'
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                >
                    Burası yazı yazıl
                </Box>
            </Collapse>
        </div>
    )
}

export default Leftbar