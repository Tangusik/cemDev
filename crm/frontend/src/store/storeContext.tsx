import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { rootReducer, initialState, RootState, RootAction } from './reducers/index.ts';

export interface StoreProviderProps {
    children: ReactNode;
}

export interface StoreContextType {
    state: RootState;
    dispatch: Dispatch<RootAction>;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
