import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { CartStore, ConfigStore, ProductsStore } from './modules';

export const RootStore = types.model({
    productsStore: ProductsStore,
    configStore: ConfigStore,
    cartStore: CartStore,
});

export type TRootStoreInstance = Instance<typeof RootStore>;
export type TRootStoreIn = SnapshotIn<typeof RootStore>;
