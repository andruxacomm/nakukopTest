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
export type TProductsMockStructure = {
    Error: string;
    Id: number;
    Success: boolean;
    Value: {
        Goods: TProductMock[];
    };
};

export const getProducts = async (): Promise<TProduct[]> => {
    const response = await HttpClient.get<TProductsMockStructure>('products');
    const id: number | undefined = response.Id;
    if (typeof id === 'undefined') throw new Error('required property "Id" doesnt exist at "response"');

    return response.Value.Goods.map(v => ({
        id: v.T,
        groupId: v.G,
        price: v.C,
        quantity: v.P,
    }));
};
