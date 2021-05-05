import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TCartProduct, useStore } from '../../store';
import {
    Button,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { priceRuFormat } from '../../lib/PriceFormat';

export const Cart: FC = observer(() => {
    const { cartStore, configStore } = useStore();
    const { totalPrice, updateCartProduct, removeProductFromCart } = cartStore;
    const totalValue = priceRuFormat({ price: totalPrice, rate: configStore.rate });
    const onDelete = useCallback((id: number) => removeProductFromCart(id), [removeProductFromCart]);
    const onChange = useCallback(
        (product: TCartProduct, cartQuantity: number) => {
            updateCartProduct({ ...product, cartQuantity });
        },
        [updateCartProduct]
    );

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
                            <Td>{product.name}</Td>
                            <Td>
                                <NumberInput onChange={v => onChange(product, parseInt(v))} value={product.cartQuantity} max={product.quantity} min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {product.quantity === product.cartQuantity && 'Предложение ограничено'}
                            </Td>
                            <Td isNumeric>{priceRuFormat({ price: product.price * product.cartQuantity, rate: configStore.rate })}</Td>
                            <Td>
                                <Button onClick={() => onDelete(product.id)}>Delete</Button>
                            </Td>
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
