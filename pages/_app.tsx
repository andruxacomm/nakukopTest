import { StoreProvider } from '../store';
import Layout from '../components/Layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Component, pageProps }) => (
    <ChakraProvider>
        <StoreProvider initialState={pageProps.store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    </ChakraProvider>
);

export default App;
