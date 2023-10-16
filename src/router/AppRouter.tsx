import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage';
import { LoginPage } from '../Pages/LoginPage';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const AppRouter = () => {

    const context = useContext(UserContext);



    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }

    const { user } = context;

    const { logged } = user;

    return (
        <Routes>
            {logged ? (
                <Route path="/" element={<MainPage />} />
            ) : (
                <Route path="/" element={<LoginPage />} />
            )}
        </Routes>
    );
};
