import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trainers from "./Trainers";
import './index.module.css';
import Main from "./Main";
import Schedule from "./Schedule";
import Clients from "./Clients";
import Sign from "./Sign";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Sign />} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="clients" element={<Clients />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="main" element={<Main />} />
        </Routes>
    </BrowserRouter>,
);


