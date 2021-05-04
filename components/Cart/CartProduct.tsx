import { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Td, Tr } from '@chakra-ui/react';
import { TCartProduct, useStore } from '../../store';
import { priceRuFormat } from '../../lib/PriceFormat';

export interface ICartProduct {
    product: TCartProduct;
}
export const CartProduct: FC<ICartProduct> = observer(({ product }) => {
    const { cartStore, configStore } = useStore();
    const { name, price, cartQuantity, id } = product;
    const priceValue = priceRuFormat({ price: price * cartQuantity, rate: configStore.rate });
    const onDelete = useCallback(() => cartStore.removeProductFromCart(id), [cartStore.removeProductFromCart, id]);
    const onChange = useCallback(
        (value: string) => {
            cartStore.updateCartProduct({ ...product, cartQuantity: parseInt(value) });
        },
        [id, cartStore.updateCartProduct]
    );
    return (
        <Tr>
            <Td>{name}</Td>
            <Td>
                <NumberInput value={cartQuantity} min={0} onChange={onChange}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td isNumeric>{priceValue}</Td>
            <Td>
                <Button onClick={onDelete}>Delete</Button>
            </Td>
        </Tr>
    );
});
