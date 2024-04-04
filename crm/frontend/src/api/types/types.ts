
// export enum IRoles {
    // TRAINER = 'trainer',
    // ADMIN = 'admin',
// }

export interface IRoles {
    id: string;
    name: string;
}

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
}
export interface ITrainer {
    id: string;
    user: IUser;
}

export interface ISportTypes {
    id: string;
    name: string;
}

export interface IAbonements {
    id: string;
    name: string;
}

export interface IEmployeeStates {
    id: string;
    name: string;
}

export interface IEmployeeStates {
    id: string;
    name: string;
}
export interface IEmployeeStates {
    id: string;
    name: string;
}
export interface IEmployeeStates {
    id: string;
    name: string;
}