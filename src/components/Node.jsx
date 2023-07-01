import { GridItem } from '@chakra-ui/react';

const Node = ({i, j, handleGridClick, handleMouseEnter, isStart, isFinish, path, open, wall, isDrag}) => {

    const handleNodeClick = (e) => {
        handleGridClick(i, j)
    }

    const handleNodeEnter = (e) => {
        handleMouseEnter(i, j)
    }
    return (
        <>
        {isDrag ? 
        
        <GridItem 
            onMouseEnter={handleNodeEnter}
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
         />
        }
        </>

    )
}

export default Node;