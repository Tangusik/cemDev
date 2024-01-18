import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.module.css';
import Main from "./Main";
import Schedule from "./Schedule";
import Clients from "./Clients";
import Sign from "./Sign";
import Colleagues from "./Colleagues";
import ClientPage from "./ClientPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Sign />} />
            <Route path="colleagues" element={<Colleagues />} />
            <Route path="clients" element={<Clients />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="main" element={<Main />} />
            <Route path="client" element={<ClientPage />} />
        </Routes>
    </BrowserRouter>,
);


