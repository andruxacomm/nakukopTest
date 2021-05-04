import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import { BaseStore } from './BaseStore';
import { TGoods } from './ProductsStore';
import { generateMobxType } from '../../lib/generateMobxType';

export type TCartProduct = TGoods & { cartQuantity: number };

const TCartProducts = generateMobxType<TCartProduct[]>({ name: 'TCartProducts' });

export const CartStore = types
    .compose(
        BaseStore,
        types.model({
            products: TCartProducts,
        })
    )
    .views(self => {
        return {
            get totalPrice(): number {
                return self.products.reduce<number>((accum, value) => {
                    return accum + value.price * value.cartQuantity;
                }, 0);
            },
        };
    })
    .actions(self => {
        const syncWithStorage = (products: TCartProduct[]): void => {
            localStorage.setItem('cart', JSON.stringify(products));
        };

        const initCart = (): void => {
            const cart = localStorage.getItem('cart') || '[]';
            //normalise structure
            const products = JSON.parse(cart).filter(
                v => v.hasOwnProperty('id') && v.hasOwnProperty('price') && v.hasOwnProperty('quantity') && v.hasOwnProperty('cartQuantity') && v.hasOwnProperty('name')
            );

            applySnapshot(self, {
                ...self,
                products,
            });
            syncWithStorage(products);
        };
        const addProductToCart = (product: TCartProduct): void => {
            const products = [...self.products];
            const cartProduct = products.find(item => item.id === product.id);
            if (cartProduct) {
                const updatedValue = cartProduct.cartQuantity + product.cartQuantity;
                cartProduct.cartQuantity = product.quantity >= updatedValue ? updatedValue : cartProduct.cartQuantity;
            } else {
                products.push(product);
            }

            applySnapshot(self, {
                ...self,
                products,
            });
            syncWithStorage(products);
        };
        const removeProductFromCart = (productId: number): void => {
            const products = self.products.filter(v => v.id !== productId);

            applySnapshot(self, {
                ...self,
                products,
            });
            syncWithStorage(products);
        };
        const updateCartProduct = (product: TCartProduct): void => {
            const products = self.products
                .map(v => {
                    const item = { ...v };
                    if (item.id === product.id) {
                        item.cartQuantity = product.quantity >= product.cartQuantity ? product.cartQuantity : product.quantity;
                    }
                    return item;
                })
                .filter(v => v.cartQuantity > 0);

            applySnapshot(self, {
                ...self,
                products,
            });
            syncWithStorage(products);
        };

        return {
            initCart,
            addProductToCart,
            removeProductFromCart,
            updateCartProduct,
        };
    });

export type TCartStoreInstance = Instance<typeof CartStore>;
export type TCartStoreIn = SnapshotIn<typeof CartStore>;
