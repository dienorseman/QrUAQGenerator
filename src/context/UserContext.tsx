import { Dispatch, SetStateAction, createContext } from 'react';

type UserContextType = {
    user: {
        logged: boolean;
        name: string;
        plan: string;
        studentId: number;
    };
    setUser: Dispatch<SetStateAction<UserContextType['user']>>;

};

export const UserContext = createContext({} as UserContextType);

