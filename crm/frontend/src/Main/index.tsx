import React, { useState } from 'react';
import Header from "../components/Header/index.tsx";
import Footer from "../components/Footer/index.tsx";
import ToDoList from "../components/ToDoList/index.tsx";
import MainInfo from "./MainInfo/index.tsx";
import Slider from "../components/Slider/index.tsx";
import Admin from "./Admin/index.tsx";
import Trainer from "./Trainer/index.tsx";

const Main = () => {
    const [userRole, setUserRole] = useState(null);

    return (
        <div>
            <Header></Header>
            <MainInfo setUserRole={setUserRole}></MainInfo>
            <ToDoList></ToDoList>
            {userRole === 'директор' ? <Admin></Admin> : <Trainer></Trainer>}
            <Slider title={"Новости"} text={"Какой-то текст"}></Slider>
            <Footer></Footer>
        </div>
    );
}

export default Main;
