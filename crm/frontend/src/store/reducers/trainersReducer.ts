import {ITrainer} from "../../api/types/types.ts";

export type TrainerAction =
    | { type: 'SET_TRAINERS'; payload: ITrainer[] }
    | { type: 'ADD_TRAINER'; payload: ITrainer }
    | { type: 'REMOVE_TRAINER'; payload: string };

export const trainersReducer = (state: ITrainer[] = [], action: TrainerAction) => {
    switch (action.type) {
        case 'SET_TRAINERS':
            return action.payload;;
        case 'ADD_TRAINER':
            return [...state, action.payload];
        case 'REMOVE_TRAINER':
            return state.filter(role => role.id !== action.payload);
        default:
            return state;
    }
};
