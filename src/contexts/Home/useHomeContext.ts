import { Context, useContext } from "react";
import { HomeContext } from "./context";
import { HomeContextType } from "./types";

export const useHomeContext = () => {
    return useContext<HomeContextType>(HomeContext as Context<HomeContextType>);
};
