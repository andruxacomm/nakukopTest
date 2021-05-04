import { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Input, Td } from '@chakra-ui/react';
import { TCartProduct, useStore } from '../../store';
import { priceRuFormat } from '../../lib/PriceFormat';

export interface ICartProduct {
    product: TCartProduct;
}
export const CartProduct: FC<ICartProduct> = observer(({ product }) => {
    const { cartStore, configStore } = useStore();
    const { name, price, cartQuantity, id, quantity } = product;
    const priceValue = useMemo<string>(() => priceRuFormat({ price: price * cartQuantity, rate: configStore.rate }), [price, cartQuantity, configStore.rate]);
    const onDelete = useCallback(() => cartStore.removeProductFromCart(id), [cartStore.removeProductFromCart, id]);
    const onChange = useCallback(
        (cartQuantity: number) => {
            cartStore.updateCartProduct({ ...product, cartQuantity });
        },
        [id, cartStore.updateCartProduct]
    );

    return (
        <>
            <Td>{name}</Td>
            <Td>
                <Flex>
                    <Button onClick={() => onChange(cartQuantity - 1)}>-</Button>
                    <Input variant="outline" placeholder="Outline" value={cartQuantity} onChange={e => onChange(parseInt(e.currentTarget.value))} width={75} margin="0 5px" />
                    <Button onClick={() => onChange(cartQuantity + 1)}>+</Button>
                </Flex>
                {quantity === cartQuantity && 'Предложение ограничено'}
            </Td>
            <Td isNumeric>{priceValue}</Td>
            <Td>
                <Button onClick={onDelete}>Delete</Button>
            </Td>
        </>
    );
});
