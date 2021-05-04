import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { BaseStore } from './BaseStore';
import { TTimer } from './ProductsStore';

const rateTimeOut = 1000 * 2;
const delta = [50, 80];

export const ConfigStore = types
    .compose(
        BaseStore,
        types.model({
            rate: types.number,
            timer: types.optional(TTimer, null),
        })
    )
    .actions(self => {
        const updateRate = (): void => {
            const [min, max] = delta;
            applySnapshot(self, {
                ...self,
                rate: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
            });
        };
        const startRateInterval = (): void => {
            const timer = setInterval(() => updateRate(), rateTimeOut);
            applySnapshot(self, {
                ...self,
                timer,
            });
        };
        const clearRateInterval = (): void => {
            clearInterval(self.timer);
            applySnapshot(self, {
                ...self,
                timer: null,
            });
        };
        return {
            updateRate,
            startRateInterval,
            clearRateInterval,
        };
    });

export type TConfigStoreInstance = Instance<typeof ConfigStore>;
export type TConfigStoreIn = SnapshotIn<typeof ConfigStore>;
