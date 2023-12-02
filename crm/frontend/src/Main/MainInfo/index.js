import styles from './index.module.css';
import Photo from "../../components/Photo";
import Button from "../../components/Button";
import EditModal from "../../components/EditModal";
import Form from "../../components/Form";
import React, {useState} from "react";

const Container = () => {
    const [showModal, setShowModal] = useState(false);
    const handleEditMainDataOpen = () => {
        setShowModal(true);
    }
    const handleEditMainDataClose = () => {
        setShowModal(false);
    }
    return (
        <div>
        <div className={styles.container} style={{backgroundColor:  '#98C1D9'}}>
            <Photo></Photo>
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
        </div>
    );
}
export default Container;