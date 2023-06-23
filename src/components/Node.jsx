import { GridItem, color } from '@chakra-ui/react';

const Node = ({i, j, handleGridClick, isStart, isFinish, path, open, wall}) => {

    const handleNodeClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        handleGridClick(i, j)
    }

    return (
        <>
        {wall ? 
        <GridItem 
            onDrag={handleNodeClick}
            h='5' 
            w='5'
            borderWidth='1px'
            borderColor='black'
            bgColor={
                (() => {
                    if (isStart) return 'red';
                    else if (path) return 'blue';
                    else if (isFinish) return 'green'
                    else if (open) return 'green';
                    else if (wall) return 'black';
                }
                )()}
         />
        :
        <GridItem 
            onMouseDown={handleNodeClick}
            h='5' 
            w='5'
            borderWidth='1px'
            borderColor='black'
            bgColor={
                (() => {
                    if (isStart) return 'red';
                    else if (path) return 'blue';
                    else if (isFinish) return 'green'
                    else if (open) return 'green';
                    else if (wall) return 'black';
                }
                )()}
         />}
         </>
    )
}

export default Node;