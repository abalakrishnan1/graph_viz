import { Grid, Center, Button, Stack } from '@chakra-ui/react';
import {
    PriorityQueue
} from '@datastructures-js/priority-queue';

import { useState, useRef } from 'react';
import Node from './Node.jsx';
import {v4 as uuidv4} from 'uuid';

const defaultGrid = [];
const neighbors = [
    {i: 0, j: 1, w: 10},
    {i: 1, j: 1, w: 14},
    {i: 1, j: 0, w: 10},
    {i: 1, j:-1, w: 14},
    {i: 0, j: -1, w: 10},
    {i: -1, j: -1, w: 14},
    {i: -1, j: 0, w: 10},
    {i: -1, j: 1, w: 14}
];

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
    const fScore = useRef()

    
    const handleGridClick = (i, j) => {
        switch(mode) {
            case 'start':
                setStart({i: i, j: j})
                console.log("SET START")
                break;
            case 'finish':
                setFinish({i: i, j: j})
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
        cameFrom.current = new Map()
        gScore.current = new Map()
        fScore.current = new Map()
                
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (i === start.i && j === start.j) {
                    gScore.current.set({i: i, j: j}, 0)
                    fScore.current.set({i: i, j: j}, h(start))
                } else {
                    gScore.current.set({i: i, j: j}, Infinity)
                    fScore.current.set({i: i, j: j}, Infinity)
                }
            }
        }

        openSet.current = new PriorityQueue((a, b) => {
            return fScore.current.get(a) < fScore.current.get(b)
        })

        openSet.current.enqueue(start)

        while (!openSet.current.isEmpty()) {
            console.log("in loop")
            let current = openSet.current.front()

            if (current.i === finish.i && current.j === finish.j) {
                console.log("DONE DONE DONE")
                return true
            }
            openSet.current.remove((node) => node.i === current.i && node.j === current.j)

            neighbors.forEach((neighbor) => {
                if (
                    current.i + neighbor.i >= 0
                    && current.i + neighbor.i < 20
                    && current.j + neighbor.j >= 0
                    && current.j + neighbor.j < 20) {
                    
                    let neighbor_node = {i: current.i + neighbor.i, j: current.j + neighbor.j}

                    console.log(neighbor_node)
                    let tentativeG = gScore.current.get(current) + neighbor.w
                    if (tentativeG < gScore.current.get(neighbor_node)) {

                        cameFrom.current.set(neighbor, current)
                        gScore.current.set(neighbor, tentativeG)
                        fScore.current.set(neighbor, tentativeG + h(neighbor))
                        
                        if (![...openSet.current].includes(neighbor_node)) {
                            openSet.current.enqueue(neighbor_node)
                        }
                    }
                 }
            })
        }

        return false
        
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
                        key = {cell.id}
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
                <Button onClick={search}>
                    Go
                </Button>
            </Stack>
        </>

    );
}

export default GraphGrid;