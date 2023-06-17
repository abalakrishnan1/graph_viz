import { GridItem } from '@chakra-ui/react';

const Node = ({i, j, handleGridClick, isStart, isFinish, path}) => {

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
            borderColor='black'
            bgColor={
                (() => {
                    if (isStart) return 'red';
                    else if (path) return 'blue';
                    else if (isFinish) return 'green';
                }
                )()}
         />
    )
}

export default Node;