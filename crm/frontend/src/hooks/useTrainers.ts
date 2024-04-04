import {ITrainer} from "../api/types/types.ts";
import { fetchGet } from "../api/get/index.ts";
import {fetchPost} from "../api/post";
import {StoreContext} from "../store/storeContext.tsx";
import {useContext} from "react";
import {useStore} from "./useStore.ts";

export const useTrainers = () => {
    const { dispatch } = useContext(StoreContext) ?? {};
    // const { trainers = [] } = useStore();

    const createTrainer = async (data: Omit<ITrainer, 'id'>) => {
        try {
            const trainer = await fetchPost('trainer_create', data);
            dispatch?.({ type: 'ADD_TRAINER', payload: trainer });
            return trainer;
        } catch (error) {
            console.error("Ошибка при создании тренера: ", error);
        }
    };

    const changeTrainer = async (id: string, data: {}) => {

    };

    const getTrainers = async () => {
        const trainers = await fetchGet('trainer_list');
        return trainers;
    };

    const deleteTrainer = async (id: string) => {
    };

    return {
        createTrainer,
        changeTrainer,
        getTrainers,
        deleteTrainer,
    };
};
