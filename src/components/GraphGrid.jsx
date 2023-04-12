import { Grid, GridItem, Center, Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import Node from './Node.jsx';
import {v4 as uuidv4} from 'uuid';

const GraphGrid = (props) => {
    const defaultGrid = [];

    const [mode, setMode] = useState('idle')
    const [start, setStart] = useState({})
    const [finish, setFinish] = useState({})

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

    for (let i=0; i<20; i++) {
        for(let j=0; j<20; j++) {
            defaultGrid.push(
                <Node
                    i={i}
                    j={j}
                    key={uuidv4()}
                    isStart={start.i === i && start.j === j}
                    isFinish={finish.i === i && finish.j === j}
                    handleGridClick={handleGridClick}
                />
            );
        }
    }

    return (
        <>
            <Center height='75vh'>
            <Grid templateColumns='repeat(20, 1fr)' templateRows='repeat(20, 1fr)' gridGap={'1'}>
            
                {defaultGrid}
                
            </Grid>
            </Center>
            <Stack direction='row' justifyContent='center'>
                <Button colorScheme='red' onClick={() => setMode('start')}>
                    Set Start
                </Button>
                <Button colorScheme='green' onClick={() => setMode('finish')}>
                    Set Finish
                </Button>
                <Button>
                    Go
                </Button>
            </Stack>
        </>

    );
}

export default GraphGrid;