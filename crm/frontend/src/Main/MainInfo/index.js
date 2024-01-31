import styles from './index.module.css';
import Photo from "../../components/Photo";
import Button from "../../components/Button";
import EditModal from "../../components/EditModal";
import Form from "../../components/Form";
import React, {useEffect, useState} from "react";
import axios from "axios";

const MainInfo = ({ setUserRole }) => {
    const [showMainDataModal, setShowMainDataModal] = useState(false);
    const [showStateDataModal, setShowStateDataModal] = useState(false);
    const [data, setData] = useState([]);

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [otchestv, setOtchestv] = useState('');

    const [statuses, setStatus] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("");

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
                setUserRole(response.data.role.toString());
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchEmployeeStates = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/tr_statuses');
                setStatus(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployeeStates();
    }, []);

    function getCSRFToken() {
        let csrfToken;
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const parts = cookie.split('=');
            if (parts[0].trim() === 'csrftoken') {
                csrfToken = parts[1];
                break;
            }
        }
        return csrfToken;
    }

    const handleSubmitEditUser = async (event) => {
        event.preventDefault();

        const port = 8000;
        const url = `http://localhost:${port}/crm/user_edit`;
        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            otchestv: otchestv,
        };

        try {
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {'X-CSRFToken': getCSRFToken()}
            });

            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData);
                setShowMainDataModal(false)
                window.location.reload();
            } else {
                setShowMainDataModal(false)
                console.error('Ошибка при отправке запроса:', response.statusText);
                window.location.reload();
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSubmitEditStatus = async (event) => {
        event.preventDefault();

        const port = 8000;
        const url = `http://localhost:${port}/crm/tr_statuses`;
        const data = {
            state: selectedStatus
        };

        try {
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {'X-CSRFToken': getCSRFToken()}
            });

            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData);
                setShowStateDataModal(false)
                // window.location.reload();
            } else {
                setShowStateDataModal(false)
                console.error('Ошибка при отправке запроса:', response.statusText);
                // window.location.reload();
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    return (
        <div>
        <div className={styles.container} style={{backgroundColor:  '#98C1D9'}}>
            <Photo></Photo>
            <div className={styles.containerText}>
                {data.user && (
                    <>
                        <div className={styles.userName}>
                            {data.user.last_name} {data.user.first_name} {data.otchestv}
                            <div className={styles.state}>{data.state}</div>
                        </div>
                        <div className={styles.role}>{data.role}</div>
                        <div className={styles.mainData}>
                            <div>{data.user.email}</div>
                            <div>phone number</div>
                        </div>
                    </>
                )}
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
                        onSubmit={handleSubmitEditUser}
                        children={
                            <div>
                                <input type="text" name="name" placeholder="Имя" onChange={(e) => setFirst_name(e.target.value)}/>
                                <input type="text" name="last_name"  placeholder="Фамилия" onChange={(e) => setLast_name(e.target.value)}/>
                                <input type="text" name="otchestcv" placeholder="Отчество" onChange={(e) => setOtchestv(e.target.value)}/>
                                <input type="text" name="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)}/>
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
                        onSubmit={handleSubmitEditStatus}
                        children={
                            <div>
                                <select name="duration_type" required className={styles.selectSport} style={{width: '100%'}} onChange={handleStatusChange} >
                                    {statuses.map((status)=>
                                        (<option name={status.name}>{status.name}</option>)
                                    )}
                                </select>
                                <input type="submit" value="Изменить"/>
                            </div>}
                    ></Form>}
            ></EditModal>
        }
        </div>
    );
}
export default MainInfo;