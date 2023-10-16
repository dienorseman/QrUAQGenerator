import { useState, Dispatch, SetStateAction } from 'react';
import { UserContext } from './context/UserContext';
import { AppRouter } from './router/AppRouter';

export const App = () => {

    type UserContextType = {
        user: {
            logged: boolean;
            name: string;
            plan: string;
            studentId: number;
        };
        setUser: Dispatch<SetStateAction<UserContextType['user']>>;

    };

    const [user, setUser] = useState<UserContextType['user']>({
        logged: false,
        name: '',
        plan: '',
        studentId: 0,
    });

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
