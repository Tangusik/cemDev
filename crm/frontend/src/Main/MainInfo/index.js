import styles from './index.module.css';
import Photo from "../../components/Photo";
import Button from "../../components/Button";
import EditModal from "../../components/EditModal";
import Form from "../../components/Form";
import React, {useEffect, useState} from "react";
import axios from "axios";

const Container = () => {
    const [showMainDataModal, setShowMainDataModal] = useState(false);
    const [showStateDataModal, setShowStateDataModal] = useState(false);
    const [data, setData] = useState([]);
    const handleEditMainData = () => {
        setShowMainDataModal(!showMainDataModal);
    }
    const handleEditStateData = () => {
        setShowStateDataModal(!showStateDataModal);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/trainer_card');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
        <div className={styles.container} style={{backgroundColor:  '#98C1D9'}}>
            <Photo></Photo>
            <div className={styles.containerText}>
                {data.user && (
                    <>
                <h3>ФИО {data.user.last_name} {data.user.first_name} {data.otchestv}</h3>
                <h4>Роль: {data.role}</h4>
                <h4>Почта: {data.user.email}</h4>
                <h4>День рождения: {data.birthdate}</h4>
                <h4>Статус: {data.state}</h4>
                    </>  )}
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