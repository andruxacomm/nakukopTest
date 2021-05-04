import HttpClient from '../lib/HttpClient';

export type TProductMock = {
    B: boolean;
    C: number;
    CV: null;
    G: number;
    P: number;
    Pl: null;
    T: number;
};
export type TProduct = {
    id: number;
    groupId: number;
    price: number;
    quantity: number;
};
export type TProductsStructure = {
    error: string;
    id: number;
    success: boolean;
    value: {
        goods: TProduct[];
    };
};
export type TProductsMockStructure = {
    Error: string;
    Id: number;
    Success: boolean;
    Value: {
        Goods: TProductMock[];
    };
};

export const getProducts = async (): Promise<TProductsStructure> => {
    const response = (await HttpClient.get('products')) as Partial<TProductsMockStructure>;
    const id: number | undefined = response.Id;
    if (typeof id === 'undefined') throw new Error('required property "Id" doesnt exist at response');
    const goods = response?.Value?.Goods || [];

    return {
        error: response?.Error || '',
        id: id,
        success: response?.Success ?? false,
        value: {
            goods: goods.map(v => ({
                id: v.T,
                groupId: v.G,
                price: v.C,
                quantity: v.P,
            })),
        },
    };
};
