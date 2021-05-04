import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { BaseStore } from './BaseStore';
import { TTimer } from './ProductsStore';

const rateTimeOut = 1000 * 15;
const delta = [50, 80];

export const ConfigStore = types
    .compose(
        BaseStore,
        types.model({
            rate: types.number,
            timer: types.optional(TTimer, null),
            isUp: types.optional(types.boolean, false),
            isDown: types.optional(types.boolean, false),
        })
    )
    .actions(self => {
        const updateRate = (): void => {
            const [min, max] = delta;
            const rate = parseFloat((Math.random() * (max - min) + min).toFixed(2));
            const isUp = rate > self.rate;
            const isDown = !isUp;

            applySnapshot(self, {
                ...self,
                rate,
                isDown,
                isUp,
            });
        };
        const startRateInterval = (interval = rateTimeOut): void => {
            const timer = setInterval(() => updateRate(), interval);
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
