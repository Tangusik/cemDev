import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from './index.module.css';
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import Form from "../components/Form";
import Photo from "../components/Photo";
import ToDoList from "../components/ToDoList";
import Trainer from "./Trainer";
import MainInfo from "./MainInfo";
import Search from "../components/Search";
import Slider from "../components/Slider";

const Main = () => {
    return (
        <div>
            <Header></Header>
            <MainInfo></MainInfo>
            <ToDoList></ToDoList>
            <Trainer></Trainer>
            <Search></Search>
            <Slider title={"Новости"} text={"Какой-то текст"}></Slider>
            <Footer></Footer>
        </div>
    );
}

export default Main;
