import styles from './index.module.css';
import Container from "../Container";

const Trainer = () => {
    return (
        <div>
            <Container title={"Мои группы и клиенты"}></Container>
            <Container title={"Статусы сотрудников"}></Container>
            <Container title={"Статусы клиентов"}></Container>
            <Container title={"Площадки"}></Container>
            <Container title={"Виды спорта"}></Container>
            <Container title={"Абонементы"}></Container>
        </div>
    );
}
export default Trainer;