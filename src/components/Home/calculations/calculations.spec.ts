import { DataValue } from "@gooddata/sdk-model";
import { DataPoint, IDataSeries } from "@gooddata/sdk-ui";
import { minimumRevenue } from ".";

class TestMockDataSeries implements IDataSeries {
    id = "test";
    descriptor = {} as any;
    constructor(private mockDataPoints: DataPoint[]) {}
    rawData(): DataValue[] {
        throw new Error("Method not implemented.");
    }
    dataPoints(): DataPoint[] {
        return this.mockDataPoints;
    }
    measureTitle(): string {
        throw new Error("Method not implemented.");
    }
    measureFormat(): string {
        throw new Error("Method not implemented.");
    }
    scopeTitles(): string[] {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<DataPoint, any, undefined> {
        throw new Error("Method not implemented.");
    }
}

describe("Calculation functions", () => {
    it("should return min value", () => {
        const mockData1 = new TestMockDataSeries([
            {
                coordinates: null as any,
                formattedValue: () => "not a min value",
                rawValue: 21,
                seriesDesc: null as any,
            },
            {
                coordinates: null as any,
                formattedValue: () => "not a min value",
                rawValue: 4,
                seriesDesc: null as any,
            },
            {
                coordinates: null as any,
                formattedValue: () => "not a min value",
                rawValue: 15,
                seriesDesc: null as any,
            },
        ]);
        const mockData2 = new TestMockDataSeries([
            {
                coordinates: null as any,
                formattedValue: () => "not a min value",
                rawValue: 45,
                seriesDesc: null as any,
            },
            {
                coordinates: null as any,
                formattedValue: () => "min value",
                rawValue: 2,
                seriesDesc: null as any,
            },
            {
                coordinates: null as any,
                formattedValue: () => "not a min value",
                rawValue: 4,
                seriesDesc: null as any,
            },
        ]);
        expect(minimumRevenue([mockData1, mockData2])).toBe("min value");
    });
});

export {};
