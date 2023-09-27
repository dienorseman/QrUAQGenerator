import { createContext } from 'react';

export const UserContext = createContext({
    name: null,
    plan: null,
    logged: true,
    studentId: null,
});