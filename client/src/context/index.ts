import {createContext} from "react";
import type {User} from "../types";

interface userContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<userContextType | null>(null);