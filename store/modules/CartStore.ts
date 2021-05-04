import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { BaseStore } from './BaseStore';
import { TGoods } from './ProductsStore';
export type TCartProduct = TGoods & { cartQuantity: number };

const TCartProducts = types.custom<TCartProduct[], TCartProduct[]>({
    name: 'TCartProducts',
    fromSnapshot(value) {
        return value;
    },
    toSnapshot(value) {
        return value;
    },
    isTargetType(): boolean {
        return true;
    },
    getValidationMessage(value): string {
        if (true) return ''; // OK
        return `'${value}' doesn't look like a valid SettingsStructure`;
    },
});

export const CartStore = types
    .compose(
        BaseStore,
        types.model({
            products: types.optional(TCartProducts, []),
        })
    )
    .actions(self => {
        const initCart = (): void => {
            const cart = localStorage.getItem('cart') || '[]';
            applySnapshot(self, {
                ...self,
                products: JSON.parse(cart),
            });
        };
        const addProductToCart = (product: TCartProduct): void => {
            const products = [...self.products];
            const clone = products.find(item => item.id === product.id);
            if (clone) {
                clone.cartQuantity = clone.cartQuantity + product.cartQuantity;
            } else {
                products.push(product);
            }
            applySnapshot(self, {
                ...self,
                products,
            });
            localStorage.setItem('cart', JSON.stringify(products));
        };
        const removeProductFromCart = (productId: number): void => {
            const products = self.products.filter(v => v.id !== productId);
            applySnapshot(self, {
                ...self,
                products,
            });
            localStorage.setItem('cart', JSON.stringify(products));
        };
        const updateProductCartQuantity = (productId: number, updatedQuantity: number): void => {
            const products = self.products.map(v => {
                const item = { ...v };
                if (item.id === productId) {
                    item.cartQuantity = updatedQuantity;
                }
                return item;
            });

            applySnapshot(self, {
                ...self,
                products,
            });
            localStorage.setItem('cart', JSON.stringify(products));
        };

        return {
            initCart,
            addProductToCart,
            removeProductFromCart,
            updateProductCartQuantity,
        };
    });

export type TCartStoreInstance = Instance<typeof CartStore>;
export type TCartStoreIn = SnapshotIn<typeof CartStore>;
