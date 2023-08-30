import React, { useContext } from 'react';

import QRCode from 'react-qr-code';

import { UserContext } from '../context/UserContext';

export const MainPage = () => {
    const { user } = useContext(UserContext);
    const { name, studentId, email } = user;

    return (
        <div>
            <h1>Bienvenido {name}</h1>

            <QRCode value={studentId} />

            <h2>
                Expediente: {studentId} email: {email}
            </h2>
        </div>
    );
};
