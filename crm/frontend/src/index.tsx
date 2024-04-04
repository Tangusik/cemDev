import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.module.css';
import Schedule from "./Schedule/index.tsx";
import Clients from "./Clients/index.tsx";
import Colleagues from "./Colleagues/index.tsx";
import ClientPage from "./ClientPage/index.tsx";
import Sign from "./Sign/index.tsx";
import Main from "./Main/index.tsx";
import {StoreProvider} from "./store/storeContext.tsx";


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="colleagues" element={<Colleagues />} />
                <Route path="clients" element={<Clients />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="main" element={<Main />} />
                <Route path="client/:id" element={<ClientPage />} />
            </Routes>
            </Suspense>
        </StoreProvider>
    </BrowserRouter>,
);


