import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import MainInfo from "./MainInfo";
import Slider from "../components/Slider";
import Admin from "./Admin";
import Trainer from "./Trainer";
import {fetchGet} from "../api/get";
const Main = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const mainData = await fetchGet('trainer_card');
                if (mainData && mainData.role !== undefined) {
                    setUserRole(mainData.role.toString());
                } else {
                    console.error('Ошибка: данные роли пользователя не определены');
                    setUserRole('null');
                }
            } catch (error) {
                console.error('Ошибка при получении данных роли пользователя:', error);
                setUserRole('null');
            }
        };

        fetchUserRole();
    }, []);

    return (
        <div>
            <Header />
            <MainInfo setUserRole={setUserRole} />
            <ToDoList />
            {userRole && userRole === 'директор' ? <Admin /> : <Trainer />}
            <Slider title={"Новости"} text={"Скоро вы сможете добавлять новости"} />
            <Footer />
        </div>
    );
}

export default Main;