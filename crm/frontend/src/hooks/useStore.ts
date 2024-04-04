import { useContext } from 'react';
import {StoreContext} from "../store/storeContext.tsx";

export const useStore = () => {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return context.state;
};
