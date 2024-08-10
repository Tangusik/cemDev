import styles from './index.module.css';
import Button from "../../components/Button";
import EditModal from "../../components/EditModal";
import Form from "../../components/Form";
import React, {useEffect, useState} from "react";
import { fetchGet } from '../../api/get';
import { fetchPost } from '../../api/post';
import PhotoSelect from "../../components/PhotoSelect";

const MainInfo = ({ setUserRole }) => {
    const [showMainDataModal, setShowMainDataModal] = useState(false);
    const [showStateDataModal, setShowStateDataModal] = useState(false);
    const [data, setData] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');

    const [statuses, setStatus] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleEditMainData = () => {
        setShowMainDataModal(!showMainDataModal);
    }
    const handleEditStateData = () => {
        setShowStateDataModal(!showStateDataModal);
    }

    useEffect(() => {
        const fetchGetData = async () => {
            const main_data = await fetchGet('trainer_card');
            setData(main_data);
            setUserRole(main_data.role.toString());

            const status = await fetchGet('change_tr_state');
            setStatus(status);
        };
        fetchGetData();
    }, []);

    function filterObject(obj) {
        return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] !== "") {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }

    const handleSubmitEditUser = async (event) => {
        event.preventDefault();
        let noFilterData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            middleName: middleName,
            phone: phone,
        };
        const data = filterObject(noFilterData);
        console.log(data);
        await fetchPost( 'user_edit', data);
        setShowMainDataModal(false)
        window.location.reload();
    }

    const handleSubmitEditStatus = async (event) => {
        event.preventDefault();
        const data = {
            state: selectedStatus
        };
        await fetchPost( 'change_tr_state', data);
        setShowStateDataModal(false)
        window.location.reload();
    }


    return (
        <div>
        <div className={styles.container} style={{backgroundColor:  '#98C1D9'}}>
            {/*<Photo></Photo>*/}
            <PhotoSelect></PhotoSelect>
            <div className={styles.containerText}>
                {data.user && (
                    <>
                        <div className={styles.userName}>
                            {data.user.last_name} {data.user.first_name} {data.middleName}
                            <div className={styles.state}>{data.state}</div>
                        </div>
                        <div className={styles.role}>{data.role}</div>
                        <div className={styles.mainData}>
                            <div>{data.user.email}</div>
                            <div>{data.phone}</div>
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
                                <input type="text" placeholder="Имя" defaultValue={data.user.first_name}
                                       onChange={(e) => setFirstName(e.target.value)}/>
                                <input type="text" placeholder="Фамилия" defaultValue={data.user.last_name}
                                       onChange={(e) => setLastName(e.target.value)}/>
                                <input type="text" placeholder="Отчество" defaultValue={data.middleName}
                                       onChange={(e) => setMiddleName(e.target.value)}/>
                                <input type="text" placeholder="Почта" defaultValue={data.user.email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <input type="text" placeholder="Номер телефона" defaultValue={data.phone}
                                       onChange={(e) => setPhone(e.target.value)}/>
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
                                <select required className={styles.select} style={{width: '100%'}}
                                        onChange={(e) => setSelectedStatus(e.target.value)}>
                                    <option value="" disabled selected>выбрать статус</option>
                                    {statuses.map((status) =>
                                        (<option key={status.id} value={status.id}>{status.title}</option>)
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