import Container from "../Container";
import React from "react";

const Trainer = () => {
    return (
        <div>
            <Container
                title={"Мои группы и клиенты"}
                polosa={true}
            ></Container>
            <Container
                title={"Ближайшие занятия"}
                polosa={true}
            ></Container>
            <Container
                title={"Прошедшие занятия"}
            ></Container>
        </div>
    );
}
export default Trainer;