import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage';
import { LoginPage } from '../Pages/LoginPage';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const AppRouter = () => {
    const { user } = useContext(UserContext);
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
