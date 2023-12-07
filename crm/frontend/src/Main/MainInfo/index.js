import styles from './index.module.css';
import Photo from "../../components/Photo";
import Button from "../../components/Button";
import EditModal from "../../components/EditModal";
import Form from "../../components/Form";
import React, {useState} from "react";

const Container = () => {
    const [showMainDataModal, setShowMainDataModal] = useState(false);
    const [showStateDataModal, setShowStateDataModal] = useState(false);
    const handleEditMainData = () => {
        setShowMainDataModal(!showMainDataModal);
    }
    const handleEditStateData = () => {
        setShowStateDataModal(!showStateDataModal);
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
                <Button type={"change"} style={{marginTop:  '30px', marginRight: '10px'}} title={"Редактировать"} onClick={handleEditMainData}></Button>
                <Button type={"change"} style={{marginTop:  '30px'}} title={"Изменить статус"} onClick={handleEditStateData}></Button>
            </div>
        </div>
        {showMainDataModal &&
            <EditModal
                onClose={handleEditMainData}
                children={
                    <Form
                        title={'Редактирование профиля'}
                        children={
                            <div>
                                <input type="text" name="name"  placeholder="Имя"/>
                                <input type="text" name="last_name"  placeholder="Фамилия"/>
                                <input type="text" name="otchestcv" placeholder="Отчество"/>
                                <input type="text" name="email" placeholder="Почта"/>
                                <input type="submit" value="Добавить"/>
                            </div>}
                    ></Form>}
            ></EditModal>
        }
        {showStateDataModal &&
            <EditModal
                onClose={handleEditStateData}
                children={
                    <Form
                        title={'Изменение статуса'}
                        children={
                            <div>
                                <input type="text" name="state"  placeholder="Статус"/>
                                <input type="submit" value="Изменить"/>
                            </div>}
                    ></Form>}
            ></EditModal>
        }
        </div>
    );
}
export default Container;