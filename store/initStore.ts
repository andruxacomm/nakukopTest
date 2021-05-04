import { RootStore, TRootStoreInstance } from './RootStore';
import { applySnapshot } from 'mobx-state-tree';

let index: TRootStoreInstance | undefined;

export function initStore(snapshot?: TRootStoreInstance) {
    const _store =
        index ??
        RootStore.create({
            productsStore: {},
            configStore: {
                rate: 50,
            },
            cartStore: {},
        });

    // If your page has Next.js data fetching methods that use a Mobx index, it will
    // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
    if (snapshot) {
        applySnapshot(_store, snapshot);
    }
    // For SSG and SSR always create a new index
    if (typeof window === 'undefined') {
        return _store;
    } else {
        _store.cartStore.initCart();
    }
    // Create the index once in the client
    if (!index) {
        index = _store;
    }

    return index;
}
