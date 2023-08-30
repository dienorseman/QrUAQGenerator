import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { AppRouter } from './router/AppRouter';

export const App = () => {
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            <AppRouter />
        </UserContext.Provider>
    );
};
