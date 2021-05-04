import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { CartProduct } from './CartProduct';
import { priceRuFormat } from '../../lib/PriceFormat';

export const Cart: FC = observer(() => {
    const { cartStore, configStore } = useStore();
    const { totalPrice } = cartStore;
    const totalValue = priceRuFormat({ price: totalPrice, rate: configStore.rate });

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Quantity</Th>
                    <Th isNumeric>price</Th>
                    <Th />
                </Tr>
            </Thead>
            <Tbody>
                {cartStore.products.map(product => (
                    <CartProduct product={product} key={product.id + '_' + product.cartQuantity} />
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th />
                    <Th />
                    <Th isNumeric>{totalValue}</Th>
                    <Th isNumeric />
                </Tr>
            </Tfoot>
        </Table>
    );
});
