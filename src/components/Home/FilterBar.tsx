import { DateFilter, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { DateFilterState } from "../../contexts/Home/types";
import styles from "./FilterBar.module.scss";

type Props = {
    dateFilterState: DateFilterState;
    dateFilterOnChange: (state: DateFilterState) => void;
};

export const FilterBar: React.FC<Props> = ({ dateFilterState, dateFilterOnChange }) => {
    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        dateFilterOnChange({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    return (
        <div className={styles.FilterBar}>
            <DateFilter
                excludeCurrentPeriod={dateFilterState.excludeCurrentPeriod}
                selectedFilterOption={dateFilterState.selectedFilterOption}
                filterOptions={defaultDateFilterOptions}
                onApply={onApply}
            />
        </div>
    );
};
