import { createContext } from "react";
import { AuthContextType } from "./types";

// Cria um contexto para autenticação
export const AuthContext = createContext<AuthContextType>({});