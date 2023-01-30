import { DataPoint, IDataSeries } from "@gooddata/sdk-ui";

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
    return quantileInternal(
        set.flatMap((series) => series.dataPoints()).filter((x) => x.rawValue !== null),
        0.5,
    );
}

function quantileInternal(points: DataPoint[], quantile: number): string | null {
    const sortedPoints = points.sort((a, b) => Number(a.rawValue) - Number(b.rawValue));
    if (sortedPoints.length === 0) {
        return null;
    }

    if (quantile <= 0 || sortedPoints.length < 2) {
        return sortedPoints[0].formattedValue();
    }
    if (quantile >= 1) {
        return sortedPoints[sortedPoints.length - 1].formattedValue();
    }
    const quantileIndex = (sortedPoints.length - 1) * quantile;
    //TODO: not a correct quantile implementation
    //should be computed from two values in some cases (how to format rawValue?)
    return sortedPoints[Math.floor(quantileIndex)].formattedValue();
}

export function quantileRevenue(set: IDataSeries[], rawQuantile: string): string | null {
    const quantile = Number(rawQuantile);
    if (isNaN(quantile)) {
        return null;
    }
    return quantileInternal(
        set.flatMap((series) => series.dataPoints()).filter((x) => x.rawValue !== null),
        quantile,
    );
}
