import { createContext } from "react";
import { useHomeState } from "./state";
import { HomeContextType } from "./types";

export const HomeContext = createContext<HomeContextType | null>(null);

export const HomeContextProvider: React.FC = ({ children }) => {
    const state = useHomeState();
    return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
};
