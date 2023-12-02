import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from './index.module.css';
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import Form from "../components/Form";

const Main = () => {
    const [showModal, setShowModal] = useState(false);
    const handleEditMainDataOpen = () => {
        setShowModal(true);
    }
    const handleEditMainDataClose = () => {
        setShowModal(false);
    }
    return (
        <div>
            <Header></Header>
            <div className={styles.container} style={{backgroundColor:  '#98C1D9'}}>
                <div>
                    <div className="photo"></div>
                </div>
                <div className={styles.containerText}>
                    <h3>ФИО</h3>
                    <h4>Роль:</h4>
                    <h4>Почта: </h4>
                    <h4>День рождения: </h4>
                    <h4>Статус:</h4>
                    <Button type={"change"} style={{marginTop:  '30px'}} title={"Редактировать"} onClick={handleEditMainDataOpen}></Button>
                </div>
            </div>
            {showModal && <EditModal onClose={handleEditMainDataClose} children={<Form></Form>}></EditModal>}
            <Footer></Footer>
        </div>
    );
}

export default Main;
