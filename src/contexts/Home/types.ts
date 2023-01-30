import { IDateFilter } from "@gooddata/sdk-model";
import { DateFilterOption } from "@gooddata/sdk-ui-filters";
import { useHomeState } from "./state";

export type HomeContextType = ReturnType<typeof useHomeState> & {
    dateFilter: IDateFilter;
};

export type DateFilterState = {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
};
