import { IDataSeries } from "@gooddata/sdk-ui";
import { useCallback, useMemo, useState } from "react";
import { maximumRevenue, minimumRevenue, medianRevenue, quantileRevenue } from "../calculations";

export type CalculationKey = "median" | "min" | "max" | "quantile";

type CalculationInfo = {
    key: CalculationKey;
    label: string;
    hasUserInput: boolean;
};

const calculationList: CalculationInfo[] = [
    {
        key: "median",
        label: "Median revenue",
        hasUserInput: false,
    },
    {
        key: "min",
        label: "Minimum revenue",
        hasUserInput: false,
    },
    {
        key: "max",
        label: "Maximum revenue",
        hasUserInput: false,
    },
    {
        key: "quantile",
        label: "Quantile",
        hasUserInput: true,
    },
];

const calculationFunctions: Record<CalculationKey, (set: IDataSeries[], userInput: string) => string | null> =
    {
        max: maximumRevenue,
        median: medianRevenue,
        min: minimumRevenue,
        quantile: quantileRevenue,
    };

export const useCustomCalculations = () => {
    const [selectedCalculationKey, setSelectedCalculationKey] = useState<CalculationKey>("median");
    const [userInput, setUserInput] = useState<string>("0.5");

    const selectedCalculationInfo = useMemo(
        () => calculationList.find((x) => x.key === selectedCalculationKey) as CalculationInfo,
        [selectedCalculationKey],
    );

    const calculationFunction = useCallback(
        (set: IDataSeries[]) => calculationFunctions[selectedCalculationKey](set, userInput),
        [userInput, selectedCalculationKey],
    );

    return {
        calculationList,
        calculationFunction,
        selectedCalculationInfo,
        selectCalculation: setSelectedCalculationKey,
        userInput,
        setUserInput,
    };
};
