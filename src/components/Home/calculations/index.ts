import { IDataSeries } from "@gooddata/sdk-ui";

export function minimumRevenue(set: IDataSeries[]): string | null {
    const min = set
        .flatMap((series) => series.dataPoints())
        .filter((x) => x.rawValue !== null)
        .reduce((min, current) =>
            min === undefined || Number(min.rawValue) > Number(current.rawValue) ? current : min,
        );
    return min.formattedValue();
}

export function maximumRevenue(set: IDataSeries[]): string | null {
    const max = set
        .flatMap((series) => series.dataPoints())
        .filter((x) => x.rawValue !== null)
        .reduce((max, current) =>
            max === undefined || Number(max.rawValue) < Number(current.rawValue) ? current : max,
        );
    return max.formattedValue();
}

export function medianRevenue(set: IDataSeries[]): string | null {
    const sortedSet = set
        .flatMap((series) => series.dataPoints())
        .filter((x) => x.rawValue !== null)
        .sort((a, b) => Number(a.rawValue) - Number(b.rawValue));

    if (sortedSet.length === 0) {
        return null;
    }
    const middle = Math.floor(sortedSet.length / 2);
    //TODO: correct median when array length is even (how to format rawValue?)
    return sortedSet[middle].formattedValue();
}
