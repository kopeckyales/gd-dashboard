import { useExecutionDataView } from "@gooddata/sdk-ui";
import { useMemo } from "react";
import styles from "./CustomComponent.module.scss";
import { CalculationKey, useCustomCalculations } from "./hooks/useCustomCalculations";
import * as Md from "../../md/full";
import { useHomeContext } from "../../contexts/Home/useHomeContext";
import CustomLoading from "../CustomLoading";
import Input from "../controls/Input";

export const CustomComponent: React.FC = () => {
    const { dateFilter } = useHomeContext();
    const {
        calculationFunction,
        calculationList,
        selectedCalculationInfo,
        selectCalculation,
        setUserInput,
        userInput,
    } = useCustomCalculations();

    const { result, status } = useExecutionDataView({
        execution: {
            seriesBy: [Md.Revenue, Md.Product.Default],
            slicesBy: [Md.DateDatasets.Date.Month.Long],
            filters: [dateFilter],
        },
    });

    const dataSeries = useMemo(() => result?.data().series().toArray(), [result]);

    const computedValue = useMemo(() => {
        if (dataSeries === undefined) {
            return null;
        }
        return calculationFunction(dataSeries);
    }, [dataSeries, calculationFunction]);

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
            <div className={styles.FilterContainer}>
                <select
                    value={selectedCalculationInfo.key}
                    onChange={(e) => selectCalculation(e.target.value as CalculationKey)}
                >
                    {calculationList.map((calculation) => (
                        <option key={calculation.key} value={calculation.key}>
                            {calculation.label}
                        </option>
                    ))}
                </select>
                {selectedCalculationInfo.hasUserInput && (
                    <Input
                        type="number"
                        value={Number(userInput)}
                        min={0}
                        max={1}
                        step={0.05}
                        onChange={(e) => setUserInput(e.currentTarget.value)}
                    />
                )}
            </div>
        </div>
    );
};
