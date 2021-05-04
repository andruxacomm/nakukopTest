import { FC, useCallback } from 'react';
import { TGoods, useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import { priceEnFormat } from '../../lib/PriceFormat';
import { Box, Container, Divider, Heading } from '@chakra-ui/react';

export interface ICatalogProduct {
    product: TGoods;
}

export const CatalogProduct: FC<ICatalogProduct> = observer(({ product }) => {
    const { name, price, quantity } = product;
    const { configStore, cartStore } = useStore();
    const { isUp, isDown } = configStore;
    const priceValue = priceEnFormat(price);
    const pushProduct = useCallback(() => cartStore.addProductToCart({ ...product, cartQuantity: 1 }), [product, cartStore.addProductToCart]);

    return (
        <Container maxW="xl">
            <Box padding="2" maxW="3xl" backgroundColor={isUp ? 'red' : isDown ? 'green' : 'gray.100'} onClick={pushProduct}>
                <Heading as="h3" size="3sm" marginBottom={2}>
                    {name} - ({quantity})
                </Heading>
                <Divider marginBottom={2} />
                Price - {priceValue}
            </Box>
        </Container>
    );
});
