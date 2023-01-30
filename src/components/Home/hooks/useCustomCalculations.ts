import { useCallback, useState } from "react";
import { maximumRevenue, minimumRevenue, medianRevenue } from "../calculations";

const calculations = [
    {
        key: "median",
        label: "Median revenue",
        calculationFn: medianRevenue,
    },
    {
        key: "min",
        label: "Minimum revenue",
        calculationFn: minimumRevenue,
    },
    {
        key: "max",
        label: "Maximum revenue",
        calculationFn: maximumRevenue,
    },
] as const;

export type Calculation = typeof calculations[number];

export type CalculationKey = Calculation["key"];

export const useCustomCalculations = () => {
    const [selectedCalculation, setSelectedCalculation] = useState<Calculation>(calculations[0]);

    return {
        selectedCalculation,
        calculations,
        selectCalculation: useCallback(
            (key: CalculationKey) =>
                setSelectedCalculation(calculations.find((x) => x.key === key) as Calculation),
            [],
        ),
    };
};
