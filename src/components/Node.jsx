import { useState } from 'react';
import { GridItem } from '@chakra-ui/react';

const Node = ({i, j, handleGridClick, isStart, isFinish}) => {

    const handleNodeClick = (e) => {
        console.log(`i: ${i}, j: ${j}`)
        handleGridClick(i, j)
    }

    return (
        <GridItem 
            onClick={handleNodeClick}
            h='5' 
            w='5'
            borderWidth='1px'
            borderColor='white'
            bgColor={
                (() => {
                    if (isStart) return 'red';
                    else if (isFinish) return 'green';
                }
                )()}
         />
    )
}

export default Node;