import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { useHomeContext } from "../../contexts/Home/useHomeContext";
import { FilterBar } from "./FilterBar";

const DEFAULT_LOCALE = "en-US";

export const HomePageContent: React.FC = () => {
    const state = useHomeContext();
    return (
        <>
            <h2>
                My Dashboard{" "}
                {DateFilterHelpers.getDateFilterTitle(
                    state.dateFilterState.selectedFilterOption,
                    DEFAULT_LOCALE,
                )}
            </h2>
            <FilterBar
                dateFilterState={state.dateFilterState}
                dateFilterOnChange={state.setDateFilterState}
            />
        </>
    );
};
