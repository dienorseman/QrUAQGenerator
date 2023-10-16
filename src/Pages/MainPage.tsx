import { useContext } from 'react';

import QRCode from 'react-qr-code';

import { UserContext } from '../context/UserContext';


export const MainPage = () => {

    const context = useContext(UserContext);



    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { user } = context;

    const { name, plan, studentId } = user; 

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

            <QRCode value={studentId.toString()} />

            <h2>
                Expediente: {studentId} plan: {plan}
            </h2>
        </div>
    );
};
