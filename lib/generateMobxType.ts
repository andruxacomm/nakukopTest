import { types } from 'mobx-state-tree';
import { IType } from 'mobx-state-tree/dist/internal';

export interface IGenerateMobxType<S> {
    name: string;
    fromSnapshot?: (value: S) => S;
    toSnapshot?: (value: S) => S;
    isTargetType?: (value: unknown) => boolean;
    getValidationMessage?: () => string;
}

export const generateMobxType = <S, T = S>({
    name,
    fromSnapshot = value => value,
    toSnapshot = value => value,
    isTargetType = () => true,
    getValidationMessage = () => '',
}: IGenerateMobxType<S>): IType<S, S, S> => {
    return types.custom<S, S>({
        name,
        fromSnapshot,
        toSnapshot,
        isTargetType,
        getValidationMessage,
    });
};
