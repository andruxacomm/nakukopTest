import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { CatalogProduct } from './CatalogProduct';

export const Catalog: FC = observer(() => {
    const { productsStore } = useStore();
    const { groupedGoods } = productsStore;
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
                            ? goods.map((product, index) => (
                                  <Box key={product.id}>
                                      <CatalogProduct product={product} />
                                      {index === goods.length - 1 ? <Divider marginBottom={3} /> : null}
                                  </Box>
                              ))
                            : null}
                    </Box>
                );
            })}
        </SimpleGrid>
    );
});
