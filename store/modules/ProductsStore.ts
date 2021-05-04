import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { BaseStore } from './BaseStore';
import { getNames, getProducts } from '../../api';
import generateMobxType from '../../lib/generateMobxType';

export type TGoodsGroupedList = {
    id: number;
    name: string;
    goods: TGoods[];
}[];
export type TGoods = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};
export const TTimer = generateMobxType<NodeJS.Timeout>('TTimer')
export const TGoodsList = generateMobxType<TGoodsGroupedList>('TGoodsList');
const fetchTimeOut = 1000 * 5;

export const ProductsStore = types
    .compose(
        BaseStore,
        types.model({
            goods: types.optional(TGoodsList, []),
            timer: types.optional(TTimer, null),
        })
    )
    .actions(self => {
        const { setFetching, setError } = self;

        const fetch = async (): Promise<void> => {
            setFetching(true);
            try {
                const [products, names] = await Promise.all([getProducts(), getNames()]);
                const productGoods = products.value.goods;
                applySnapshot(self, {
                    ...self,
                    goods: names.map(group => ({
                        id: group.id,
                        name: group.name,
                        goods: group.products
                            .map(product => {
                                const clone = productGoods.find(item => item.id === product.id && item.groupId === group.id);
                                return {
                                    id: clone?.id ?? -1,
                                    name: product.name || '',
                                    price: clone?.price || 0,
                                    quantity: clone?.quantity || 0,
                                };
                            })
                            .filter(v => v.id !== -1),
                    })),
                });
            } catch (e) {
                setError(e);
            }
            setFetching(false);
        };
        const startFetchingWithInterval = (interval = fetchTimeOut): void => {
            const timer = setInterval(() => fetch(), interval);
            applySnapshot(self, {
                ...self,
                timer,
            });
        };
        const clearFetchingInterval = (): void => {
            clearInterval(self.timer);
            applySnapshot(self, {
                timer: null,
            });
        };

        return {
            fetch,
            startFetchingWithInterval,
            clearFetchingInterval,
        };
    });

export type TProductsStoreInstance = Instance<typeof ProductsStore>;
export type TProductsStoreIn = SnapshotIn<typeof ProductsStore>;
