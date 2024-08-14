import { createContext } from "react";



export interface AuthContextType {
  user: {name:string, email:string, token:string},
  setUser: Function,
  BASE_URL:string
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);