import {IClient} from "../../api/types/types.ts";

export type ClientAction =
    | { type: 'ADD_ROLE'; payload: IClient }
    | { type: 'REMOVE_ROLE'; payload: string };

export const clientsReducer = (state: IClient[] = [], action: ClientAction) => {
    switch (action.type) {
        case 'ADD_ROLE':
            return [...state, action.payload];
        case 'REMOVE_ROLE':
            return state.filter(role => role.id !== action.payload);
        default:
            return state;
    }
};
