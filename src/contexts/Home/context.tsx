import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { createContext } from "react";
import { useHomeState } from "./state";
import { HomeContextType } from "./types";
import * as Md from "../../md/full";

export const HomeContext = createContext<HomeContextType | null>(null);

export const HomeContextProvider: React.FC = ({ children }) => {
    const state = useHomeState();

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        state.dateFilterState.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        state.dateFilterState.excludeCurrentPeriod,
    );

    return <HomeContext.Provider value={{ ...state, dateFilter }}>{children}</HomeContext.Provider>;
};
