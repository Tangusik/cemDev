import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import MainInfo from "./MainInfo";
import Search from "../components/Search";
import Slider from "../components/Slider";
import Admin from "./Admin";
import Trainer from "./Trainer";

const Main = () => {
    return (
        <div>
            <Header></Header>
            <MainInfo></MainInfo>
            <ToDoList></ToDoList>
            {/*<Trainer></Trainer>*/}
            <Admin></Admin>
            <Search></Search>
            <Slider title={"Новости"} text={"Какой-то текст"}></Slider>
            <Footer></Footer>
        </div>
    );
}

export default Main;
