import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Heading, Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { CartProduct } from './CartProduct';
import { priceRuFormat } from '../../lib/PriceFormat';

export const Cart: FC = observer(() => {
    const { cartStore, configStore } = useStore();
    const { totalPrice } = cartStore;
    const totalValue = priceRuFormat({ price: totalPrice, rate: configStore.rate });

    return (
        <>
            <Heading as="h2" size="3xl" padding="20px 0">
                Корзина
            </Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Наименование товара</Th>
                        <Th>Кол-во</Th>
                        <Th isNumeric>Цена</Th>
                        <Th />
                    </Tr>
                </Thead>
                <Tbody>
                    {cartStore.products.map(product => (
                        <Tr key={product.id}>
                            <CartProduct product={product} />
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th />
                        <Th />
                        <Th isNumeric>Итого - {totalValue}</Th>
                        <Th isNumeric />
                    </Tr>
                </Tfoot>
            </Table>
        </>
    );
});
