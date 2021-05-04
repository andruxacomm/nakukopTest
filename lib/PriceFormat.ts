export interface IPriceRuFormat {
    price: number;
    rate: number;
}

export const priceRuFormat = ({ price, rate }: IPriceRuFormat): string => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price * rate);
};

export const priceEnFormat = (price: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(price);
};
