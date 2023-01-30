import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { useHomeContext } from "../../contexts/Home/useHomeContext";
import { FilterBar } from "./FilterBar";
import styles from "./HomePageContent.module.scss";
import { LineChart } from "@gooddata/sdk-ui-charts";
import * as Md from "../../md/full";
import { CustomComponent } from "./CustomComponent";

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
            <div className={styles.ChartContainer}>
                <LineChart
                    segmentBy={Md.Product.Default}
                    trendBy={Md.DateDatasets.Date.Month.Long}
                    filters={[state.dateFilter]}
                    measures={[Md.Revenue]}
                    config={{ legend: { position: "bottom" } }}
                />
                <CustomComponent />
            </div>
        </>
    );
};
