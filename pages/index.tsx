import { GetServerSideProps, NextPage } from 'next';
import { useStore, withStore } from '../store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Catalog } from '../components/Catalog';
import { Cart } from '../components/Cart';

const Home: NextPage = observer(() => {
    const { productsStore, configStore } = useStore();

    useEffect(() => {
        productsStore.startFetchingWithInterval();
        configStore.startRateInterval();

        return () => {
            productsStore.clearFetchingInterval();
            configStore.clearRateInterval();
        };
    }, []);

    return (
        <>
            <Catalog />
            <Cart />
        </>
    );
});

export const getServerSideProps: GetServerSideProps = withStore(async store => {
    await store.productsStore.fetch();
});

export default Home;
