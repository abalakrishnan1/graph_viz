import { Grid, Center, Button, Stack } from '@chakra-ui/react';
import {
    PriorityQueue
} from '@datastructures-js/priority-queue';

import { useState, useRef } from 'react';
import Node from './Node.jsx';
import {v4 as uuidv4} from 'uuid';

const defaultGrid = [];

for (let i=0; i<20; i++) {
        for(let j=0; j<20; j++) {
            defaultGrid.push({i: i, j: j, id: uuidv4()})
        }
}

const GraphGrid = (props) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [mode, setMode] = useState('idle')
    const [start, setStart] = useState({})
    const [finish, setFinish] = useState({})
    const openSet = useRef()
    const cameFrom = useRef()
    const gScore = useRef()

    
    const handleGridClick = (i, j) => {
        switch(mode) {
            case 'start':
                setStart({i, j})
                console.log("SET START")
                break;
            case 'finish':
                setFinish({i, j})
                console.log("SET FINISH")
                break;
        }
    }

    // <Node
    //                 i={i}
    //                 j={j}
    //                 key={uuidv4()}
    //                 isStart={start.i === i && start.j === j}
    //                 isFinish={finish.i === i && finish.j === j}
    //                 handleGridClick={handleGridClick}
    //             />

    const h = (node) => {
        return Math.sqrt(Math.pow(node.i - finish.i, 2)
             + Math.pow(node.j - finish.j, 2))
    }

    const search = () => {
        cameFrom.current = new Map([])
        gScore.current = new Map()
        gScore[start] = 0

    }

    return (
        <>
            <Center height='75vh'>
            <Grid templateColumns='repeat(20, 1fr)' templateRows='repeat(20, 1fr)' gridGap={'1'}>
            
                {grid.map((cell) => (
                    <Node 
                        i={cell.i}
                        j={cell.j}
                        isStart={start.i === cell.i && start.j === cell.j}
                        isFinish={finish.i === cell.i && finish.j === cell.j}
                        handleGridClick={handleGridClick}
                    ></Node>
                ))}
                
            </Grid>
            </Center>
            <Stack direction='row' justifyContent='center'>
                <Button colorScheme='red' onClick={() => setMode('start')}>
                    Set Start
                </Button>
                <Button colorScheme='green' onClick={() => setMode('finish')}>
                    Set Finish
                </Button>
                <Button onClick={search()}>
                    Go
                </Button>
            </Stack>
        </>

    );
}

export default GraphGrid;