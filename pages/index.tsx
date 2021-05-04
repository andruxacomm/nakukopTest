import { GetServerSideProps, NextPage } from 'next';
import { useStore, withStore } from '../store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const Home: NextPage = observer(() => {
    const { productsStore, configStore } = useStore();
    useEffect(() => {
        productsStore.startFetchingWithInterval();
        configStore.updateRate();
        configStore.startRateInterval();

        return () => {
            productsStore.clearFetchingInterval();
            configStore.clearRateInterval();
        };
    }, []);

    return (
        <>
            {productsStore.isFetching + ''} <br /> {JSON.stringify(productsStore.goods)} <br />
            {JSON.stringify(configStore.rate)}
        </>
    );
});

export const getServerSideProps: GetServerSideProps = withStore(async store => {
    await store.productsStore.fetch();
});

export default Home;
