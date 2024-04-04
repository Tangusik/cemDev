import {RoleAction, rolesReducer} from './rolesReducer.ts';
import {TrainerAction, trainersReducer} from "./trainersReducer.ts";
import {ClientAction, clientsReducer} from "./clientsReducer.ts";
import {IClient, IRole, ITrainer} from "../../api/types/types.ts";

export interface RootState {
    roles: IRole[];
    trainers: ITrainer[];
    clients: IClient[];
}

export type RootAction = RoleAction | TrainerAction | ClientAction;

export const rootReducer = (state: RootState | undefined, action: RootAction): RootState => {
    return {
        roles: rolesReducer(state?.roles, action as RoleAction),
        trainers: trainersReducer(state?.trainers, action as TrainerAction),
        clients: clientsReducer(state?.clients, action as ClientAction),
    };
};

export const initialState: RootState = {
    roles: [],
    trainers: [],
    clients: [],
};
