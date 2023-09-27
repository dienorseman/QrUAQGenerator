import React, { useContext } from 'react';

import QRCode from 'react-qr-code';

import { UserContext } from '../context/UserContext';

export const MainPage = () => {
    const { user } = useContext(UserContext);
    const { name, studentId, plan } = user;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '100vh',
            }}
        >
            <h1>Bienvenido {name}</h1>

            <QRCode value={studentId} />

            <h2>
                Expediente: {studentId} plan: {plan}
            </h2>
        </div>
    );
};
