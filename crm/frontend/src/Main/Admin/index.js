import styles from './index.module.css';
import Container from "../Container";

const Trainer = () => {
    return (
        <div>
            <Container title={"Роли сотрудников"}></Container>
            <Container title={"Ближайшее занятия"}></Container>
            <Container title={"Прошедшие занятия"}></Container>
        </div>
    );
}
export default Trainer;