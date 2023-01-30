import { DateFilter } from "@gooddata/sdk-ui-filters";
import { shallow } from "enzyme";

import { FilterBar } from "../FilterBar";

describe("FilterBar component", () => {
    it("should render DateFilter", () => {
        const wrapper = shallow(
            <FilterBar
                dateFilterState={{
                    excludeCurrentPeriod: false,
                    selectedFilterOption: null as any,
                }}
                dateFilterOnChange={null as any}
            />,
        );
        expect(wrapper.find(DateFilter).length).toBe(1);
    });
});
