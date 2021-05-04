import HttpClient from '../lib/HttpClient';

export type TProductNameMock = {
    N: string;
    T: number;
};
export type TNameMock = {
    G: string;
    C?: number;
    B: Record<string, TProductNameMock>;
};
export type TNamesMockStructure = Record<string, TNameMock>;
export type TNameProduct = {
    id: number;
    name: string;
};
export type TNameGroups = {
    id: number;
    name: string;
    products: TNameProduct[];
}[];

export const getNames = async (): Promise<TNameGroups> => {
    const response = (await HttpClient.get('names')) as Partial<TNamesMockStructure>;
    const responseKeys = Object.keys(response);

    return responseKeys.map(key => {
        const groupId = parseInt(key);
        const { G, B } = response[key];
        const productsKeys = Object.keys(B);
        return {
            id: groupId,
            name: G,
            products: productsKeys.map(pKey => {
                const { N } = B[pKey];
                return {
                    id: parseInt(pKey),
                    name: N,
                };
            }),
        };
    });
};
