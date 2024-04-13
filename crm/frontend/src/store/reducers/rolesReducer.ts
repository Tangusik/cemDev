import {IRole} from "../../api/types/types.ts";

export type RoleAction =
    | { type: 'ADD_ROLE'; payload: IRole }
    | { type: 'REMOVE_ROLE'; payload: string };

export const rolesReducer = (state: IRole[] = [], action: RoleAction) => {
    switch (action.type) {
        case 'ADD_ROLE':
            return [...state, action.payload];
        case 'REMOVE_ROLE':
            return state.filter(role => role.id !== action.payload);
        default:
            return state;
    }
};
