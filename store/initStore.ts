import { defaultState, RootStore, TRootStoreInstance } from './RootStore';
import { applySnapshot } from 'mobx-state-tree';

let index: TRootStoreInstance | undefined;

export function initStore(snapshot?: TRootStoreInstance) {
    const _store = index ?? RootStore.create(defaultState);

    if (snapshot) {
        applySnapshot(_store, snapshot);
    }

    if (typeof window === 'undefined') {
        return _store;
    } else {
    }

    if (!index) {
        index = _store;
    }

    return index;
}
