import { ChakraProvider } from '@chakra-ui/react';
import GraphGrid from './components/GraphGrid.jsx';

function App() {
  return (
    <ChakraProvider>
      <GraphGrid />
    </ChakraProvider>
  );
}

export default App;
