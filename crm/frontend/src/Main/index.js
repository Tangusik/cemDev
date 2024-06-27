import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import MainInfo from "./MainInfo";
import Search from "../components/Search";
import Slider from "../components/Slider";
import Admin from "./Admin";
import Trainer from "./Trainer";

const Main = () => {
    const [userRole, setUserRole] = useState(null);

    return (
        <div>
            <Header></Header>
            <MainInfo setUserRole={setUserRole}></MainInfo>
            <ToDoList></ToDoList>
            {userRole === 'директор' ? <Admin></Admin> : <Trainer></Trainer>}
            <Slider title={"Новости"} text={"Скоро вы сможете добавлять новости"}></Slider>
            <Footer></Footer>
        </div>
    );
}

export default Main;
