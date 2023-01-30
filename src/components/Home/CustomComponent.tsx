import { useExecutionDataView } from "@gooddata/sdk-ui";
import { useMemo } from "react";
import styles from "./CustomComponent.module.scss";
import { CalculationKey, useCustomCalculations } from "./hooks/useCustomCalculations";
import * as Md from "../../md/full";
import { useHomeContext } from "../../contexts/Home/useHomeContext";
import CustomLoading from "../CustomLoading";

export const CustomComponent: React.FC = () => {
    const { dateFilter } = useHomeContext();
    const { calculations, selectCalculation, selectedCalculation } = useCustomCalculations();

    const { result, status } = useExecutionDataView({
        execution: {
            seriesBy: [Md.Revenue, Md.Product.Default],
            slicesBy: [Md.DateDatasets.Date.Month.Long],
            filters: [dateFilter],
        },
    });
    const computedValue = useMemo(() => {
        const series = result?.data().series().toArray();
        if (series === undefined) {
            return null;
        }
        return selectedCalculation.calculationFn(series);
    }, [result, selectedCalculation]);

    return (
        <div className={styles.CustomComponent}>
            <div className={styles.Value}>
                {(status === "success" || status === "error") && (
                    <h2>{computedValue === null ? "N/A" : computedValue}</h2>
                )}
                {(status === "loading" || status === "pending") && (
                    <CustomLoading imageHeight="20px" height="35px" />
                )}
            </div>
            <select
                value={selectedCalculation.key}
                onChange={(e) => selectCalculation(e.target.value as CalculationKey)}
            >
                {calculations.map((calculation) => (
                    <option key={calculation.key} value={calculation.key}>
                        {calculation.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
