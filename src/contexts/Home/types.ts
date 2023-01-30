import { DateFilterOption } from "@gooddata/sdk-ui-filters";
import { useHomeState } from "./state";

export type HomeContextType = ReturnType<typeof useHomeState> & {};

export type DateFilterState = {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
};
