import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                const response = await axios.get('crm/react_test');
                setClients(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClients();
    }, []);
    return (
        <div>
            <Header></Header>
            <h1>Clients Page</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <p>First Name: {client.first_name}</p>
                        <p>Last Name: {client.last_name}</p>
                        <p>Registration Date: {client.reg_date}</p>
                        <p>Birth Date: {client.birth_date}</p>
                        <p>State: {client.state}</p>
                        <p>Balance: {client.balance}</p>
                    </li>
                ))}
            </ul>
            <Footer></Footer>
        </div>
    );
}

export default Clients;
