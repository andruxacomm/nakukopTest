import { types } from 'mobx-state-tree';

export const BaseStore = types
    .model({
        isFetching: false,
        error: types.maybeNull(types.string),
    })
    .actions(self => {
        const setFetching = (value: boolean): void => {
            self.isFetching = value;
        };

        const setError = (e: Error): void => {
            self.error = e.message;
        };

        const clearError = (): void => {
            self.error = null;
        };

        return {
            setFetching,
            clearError,
            setError,
        };
    })
    .views(self => ({
        get isSuccess(): boolean {
            return !self.isFetching && !self.error;
        },
    }));
