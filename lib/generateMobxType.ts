import { types } from 'mobx-state-tree';
import { IType } from 'mobx-state-tree/dist/internal';

export default <S, T=S>(name: string):IType<S, S, S> => {
    return types.custom<S, S>({
        name,
        fromSnapshot(value) {
            return value;
        },
        toSnapshot(value) {
            return value;
        },
        isTargetType(): boolean {
            return true;
        },
        getValidationMessage(value): string {
            return `'${value}' doesn't look like a valid ${name}`;
        },
    })
}
