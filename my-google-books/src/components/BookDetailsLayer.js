import { Box, Layer } from 'grommet'
import React from 'react'

export default function BookDetailsLayer() {
    return(
        <Box>
            <Layer full='horizontal' margin='small' onEsc={() => {
                
            }}>
                <Box>Olar Mundo!</Box>
            </Layer>
        </Box>
    )
}