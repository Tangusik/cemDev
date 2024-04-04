
export interface IRole {
    id: string;
    title: string;
}

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
}
export interface ITrainer {
    id: string;
    user: IUser;
    middleName: string;
    birthDate: string;
    role: IRole;
    state: ITrainerState;
}

export interface IClient {
    id: string;
    firstName: string;
    avatar: string;
    lastName: string;
    middleName: string;
    address: string;
    regDate: string;
    birthDate: string;
    state: IClientState;
    balance: number;
}


export interface ISportType {
    id: string;
    name: string;
}

export interface IAbonement {
    id: string;
    title: string;
    price: number;
    duration: string;
    lessonCount: number;
    clients: IClient[];
    sportType: ISportType;
}

export  interface IGroup {
    id: string;
    title: string;
    clients: IClient[] | null;
    sportType: ISportType;
    trainer: ITrainer;
    possibleAbonements: IAbonement[] | null;
}

export interface IEmployeeState {
    id: string;
    name: string;
}

export interface IClientState {
    id: string;
    title: string;
}

export interface ITrainerState {
    id: string;
    title: string;
}
export interface IArea {
    id: string;
    address: string;
}
export interface ISportType {
    id: string;
    title: string;
}

export interface ILesson {
    id: string;
    area: IArea;
    actDate: string;
    actTimeBegin: string;
    actTimeEnd: string;
    clients: IClient[] | null;
    trainer: ITrainer | null;
    // status = models.CharField(max_length=20, default="Состоится")
    group: IGroup;
}

export interface IPresence {
    id: string;
    lesson: ILesson;
    client: IClient;
    presence: boolean;
}

export interface IPurchaseHistoryStatus {
    id: string;
    title: string;
}

export interface IPurchaseHistory{
    id: string;
    client: IClient;
    abonement: IAbonement;
    purchaseDate: string;
    status: IPurchaseHistoryStatus;
    activitiesLeft: number;
    endDate: string;
}