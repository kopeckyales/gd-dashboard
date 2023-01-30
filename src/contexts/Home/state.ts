import { defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { useState } from "react";
import { DateFilterState } from "./types";

export const useHomeState = () => {
    const [dateFilterState, setDateFilterState] = useState<DateFilterState>({
        selectedFilterOption: defaultDateFilterOptions.allTime!,
        excludeCurrentPeriod: false,
    });

    return {
        dateFilterState,
        setDateFilterState,
    };
};
