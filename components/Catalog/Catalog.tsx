import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TGoods, useStore } from '../../store';
import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { priceEnFormat } from '../../lib/PriceFormat';

export const Catalog: FC = observer(() => {
    const { productsStore, configStore, cartStore } = useStore();
    const { groupedGoods } = productsStore;
    const { isUp, isDown } = configStore;
    const { addProductToCart } = cartStore;
    const pushProduct = useCallback((product: TGoods) => addProductToCart({ ...product, cartQuantity: 1 }), [addProductToCart]);

    return (
        <SimpleGrid columns={2} spacing={5}>
            {groupedGoods.map(group => {
                const { id, name, goods } = group;
                return (
                    <Box key={id} p={5} borderWidth="1px" borderRadius="lg">
                        <Heading as="h2" size="4sm" marginBottom={3} isTruncated>
                            {name}
                        </Heading>
                        <Divider marginBottom={3} />
                        {goods.length > 0
                            ? goods.map(product => (
                                  <Box
                                      key={product.id}
                                      padding="2"
                                      maxW="3xl"
                                      backgroundColor={isUp ? 'red' : isDown ? 'green' : 'gray.100'}
                                      onClick={() => pushProduct(product)}
                                      cursor="pointer">
                                      <Heading as="h3" size="3sm" marginBottom={2}>
                                          {product.name} - ({product.quantity}) - {priceEnFormat(product.price)}
                                      </Heading>
                                  </Box>
                              ))
                            : null}
                    </Box>
                );
            })}
        </SimpleGrid>
    );
});
