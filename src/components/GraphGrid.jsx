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
            defaultGrid.push({i: i, j: j, id: uuidv4(), path: false})
        }
}

const GraphGrid = (props) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [mode, setMode] = useState('idle')
    const [start, setStart] = useState({})
    const [finish, setFinish] = useState({})

    const openSet = useRef()
    const closedSet = useRef([])
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
            default:
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

    const dist = (a, b) => {
        return Math.sqrt(Math.pow(a.i - b.i, 2)
             + Math.pow(a.j - b.j, 2))
    }


    const search = () => {
        cameFrom.current = new Map()
        gScore.current = new Map()
        fScore.current = new Map()
                
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (i === start.i && j === start.j) {
                    gScore.current.set(JSON.stringify({i: i, j: j}), 0)
                    fScore.current.set(JSON.stringify({i: i, j: j}), h(start))
                } else {
                    gScore.current.set(JSON.stringify({i: i, j: j}), 1600)
                    fScore.current.set(JSON.stringify({i: i, j: j}), 1600)
                }
            }
        }
        
        openSet.current = new PriorityQueue((a, b) => {
            return fScore.current.get(JSON.stringify(a)) < fScore.current.get(JSON.stringify(b))
        })

        openSet.current.enqueue(JSON.stringify(start))

        let current_done; 

        while (!openSet.current.isEmpty()) {
            // console.log(openSet.current.toArray())
            let current = JSON.parse(openSet.current.front())

            console.log("Current: ", current)
            if (current.i === finish.i && current.j === finish.j) {
                console.log("DONE DONE DONE")
                current_done = current
                
            }
            openSet.current.remove((node) => JSON.parse(node).i === current.i && JSON.parse(node).j === current.j)
            closedSet.current.push(JSON.stringify(current))
            neighbors.forEach((neighbor) => {
                let skip = false
                // check if in bounds neighbor
                if (
                    current.i + neighbor.i >= 0
                    && current.i + neighbor.i < 20
                    && current.j + neighbor.j >= 0
                    && current.j + neighbor.j < 20
                    ) {
                    
                    let neighbor_node = {i: current.i + neighbor.i, j: current.j + neighbor.j}
                    
                    if (!closedSet.current.includes(JSON.stringify(neighbor_node))) {
                        // console.log("neighbor node: ", neighbor_node)
                        let tentativeG = gScore.current.get(JSON.stringify(current)) + dist(neighbor_node, current)
                        // console.log("Tentative G value: ", tentativeG)
                        if (!openSet.current.toArray().includes(JSON.stringify(neighbor_node))) {
                                openSet.current.enqueue(JSON.stringify(neighbor_node))
                        } else if (tentativeG >= gScore.current.get(JSON.stringify(neighbor_node))) {
                            skip = true
                        }

                        if (!skip) {

                            cameFrom.current.set(JSON.stringify(neighbor_node), JSON.stringify(current))
                            gScore.current.set(JSON.stringify(neighbor_node), tentativeG)
                            fScore.current.set(JSON.stringify(neighbor_node), tentativeG + h(neighbor_node))

                        }
                    }
                 }
            })
        }

        const new_grid = [...grid]
        while (cameFrom.current.has(JSON.stringify(current_done))) {
            console.log("here")
            console.log("path: ", current_done)
            new_grid[current_done.i, current_done.j].path = true

            current_done = JSON.parse(cameFrom.current.get(JSON.stringify(current_done)))
        }

        setGrid(new_grid)
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
                        path = {cell.path}
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