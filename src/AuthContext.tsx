import { createContext, Dispatch, SetStateAction } from "react";



export interface AuthContextType {
  user: string,
  favorite: Event[],
  setFavorite: Dispatch<SetStateAction<Event[]>>,
  setUser: Function,
  BASE_URL: string,
  setOpenFav: Function,
  openFav: boolean,
  setOpenEdtP: Function,
  openEdtP: boolean
  evento: [],
  setEvento: Function
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);