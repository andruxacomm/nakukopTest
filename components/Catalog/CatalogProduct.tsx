import { FC, useCallback, useMemo } from 'react';
import { TGoods, useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { priceEnFormat } from '../../lib/PriceFormat';
import { Box, Heading } from '@chakra-ui/react';

export interface ICatalogProduct {
    product: TGoods;
}

export const CatalogProduct: FC<ICatalogProduct> = observer(({ product }) => {
    const { name, price, quantity } = product;
    const { configStore, cartStore } = useStore();
    const { isUp, isDown } = configStore;
    const priceValue = useMemo<string>(() => priceEnFormat(price), [price]);
    const pushProduct = useCallback(() => cartStore.addProductToCart({ ...product, cartQuantity: 1 }), [product, cartStore.addProductToCart]);

    return (
        <Box padding="2" maxW="3xl" backgroundColor={isUp ? 'red' : isDown ? 'green' : 'gray.100'} onClick={pushProduct} cursor="pointer">
            <Heading as="h3" size="3sm">
                {name} - ({quantity}) - {priceValue}
            </Heading>
        </Box>
    );
});
