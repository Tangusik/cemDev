import Container from "../Container";
import Button from "../../components/Button";
import React, {useState} from "react";
import Form from "../../components/Form";
import EditModal from "../../components/EditModal";

const Admin = () => {
    const [showModalRoles, setShowModalRoles] = useState(false);
    const [showModalEmployeeStates, setShowModalEmployeeStates] = useState(false);
    const [showModalClientStates, setShowModalClientStates] = useState(false);
    const [showModalAreas, setShowModalAreas] = useState(false);
    const [showModalTypeSports, setShowModalTypeSports] = useState(false);
    const [showModalAbonements, setShowModalAbonements] = useState(false);

    const handleRoles = () => {
        setShowModalRoles(!showModalRoles)
    }
    const handleEmployeeStates = () => {
        setShowModalEmployeeStates(!showModalEmployeeStates)
    }
    const handleClientStates = () => {
        setShowModalClientStates(!showModalClientStates)
    }
    const handleAreas = () => {
        setShowModalAreas(!showModalAreas)
    }
    const handleTypeSports = () => {
        setShowModalTypeSports(!showModalTypeSports)
    }
    const handleAbonements = () => {
        setShowModalAbonements(!showModalAbonements)
    }
    return (
        <div>
            <Container
                title={"Роли сотрудников"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить роль"} onClick={handleRoles}></Button>
                }
            ></Container>
            {showModalRoles &&
                <EditModal
                    onClose={handleRoles}
                    children={
                        <Form
                            title={'Добавление роли'}
                            children={
                                <div>
                                    <input type="text" name="role" placeholder="Название роли" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Статусы сотрудников"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить статус"} onClick={handleEmployeeStates}></Button>
                }
            ></Container>
            {showModalEmployeeStates &&
                <EditModal
                    onClose={handleEmployeeStates}
                    children={
                        <Form
                            title={'Добавление статуса сотрудников'}
                            children={
                                <div>
                                    <input type="text" name="trainer_state" placeholder="Название статуса" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Статусы клиентов"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить статус"} onClick={handleClientStates}></Button>
                }
            ></Container>
            {showModalClientStates &&
                <EditModal
                    onClose={handleClientStates}
                    children={
                        <Form
                            title={'Добавление статуса клиентов'}
                            children={
                                <div>
                                    <input type="text" name="client_state" placeholder="Название статуса" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Площадки"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить площадку"} onClick={handleAreas}></Button>
                }
            ></Container>
            {showModalAreas &&
                <EditModal
                    onClose={handleAreas}
                    children={
                        <Form
                            title={'Добавление площадки'}
                            children={
                                <div>
                                    <input type="text" name="address" placeholder="Адрес площадки" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Виды спорта"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить вид спорта"} onClick={handleTypeSports}></Button>
                }
            ></Container>
            {showModalTypeSports &&
                <EditModal
                    onClose={handleTypeSports}
                    children={
                        <Form
                            title={'Добавление вида спорта'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Вид спорта" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Абонементы"}
                polosa={true}
                children={
                    <Button type={"change"} title={"Добавить абонемент"} onClick={handleAbonements}></Button>
                }
            ></Container>
            {showModalAbonements &&
                <EditModal
                    onClose={handleAbonements}
                    children={
                        <Form
                            title={'Добавление абонемента'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Название абонемента" required/>
                                        <input type="text" name="price" placeholder="Цена абонемента" required/>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <input type="text" name="duration" placeholder="Длительность" style={{marginRight: '1em'}}/>
                                                    <select name="duration_type" required>
                                                        <option value="days" selected> Дней</option>
                                                        <option value="weeks"> Недель</option>
                                                        <option value="month"> Месяцев</option>
                                                    </select>
                                            </div>
                                            <input type="text" name="count" placeholder="Количество занятий"/>
                                                <select id="select_sport" name="sport">
                                                    <option value="{{sport.id}}"> </option>
                                                </select>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
        </div>
    );
}
export default Admin;