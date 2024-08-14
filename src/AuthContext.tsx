import { createContext } from "react";



export interface AuthContextType {
  user: {},
  setUser: {},
  BASE_URL:string
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);