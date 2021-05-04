import { initStore, TRootStoreIn, TRootStoreInstance } from '../store';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSnapshot } from 'mobx-state-tree';

type Props = {
    store: TRootStoreIn;
};
type Fn = (store: TRootStoreInstance, context: GetServerSidePropsContext) => Promise<void>;

export const withStore = (fn?: Fn): GetServerSideProps<Props> => async context => {
    const store = initStore();
    await Promise.all([
        //put here custom server store actions
        fn?.(store, context),
    ]);
    return {
        props: {
            store: getSnapshot(store),
        },
    };
};
