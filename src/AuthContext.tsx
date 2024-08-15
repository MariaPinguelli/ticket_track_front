import { createContext, Dispatch, SetStateAction } from "react";



export interface AuthContextType {
  user: string,
  favorite: Event[],
  setFavorite: Dispatch<SetStateAction<Event[]>>,
  setUser: Function,
  BASE_URL:string
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);