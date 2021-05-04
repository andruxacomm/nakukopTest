import { StoreProvider } from '../store';
import Layout from "../components/Layout";

const App = ({ Component, pageProps }) => (
    <StoreProvider initialState={pageProps.store}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </StoreProvider>
);

export default App;
