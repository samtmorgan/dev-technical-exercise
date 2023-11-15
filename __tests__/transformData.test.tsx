// import React from 'react';
import { transformData } from "../src/utils/functions";

const mockData = [
  {
    Week: "1",
    tCO2e: "341.97",
  },
  {
    Week: "2",
    tCO2e: "699.73",
  },
  {
    Week: "3",
    tCO2e: "1141.83",
  },
];

const mockDataOutput = [
  {
    week: "1",
    tCO2e: 341.97,
  },
  {
    week: "2",
    tCO2e: 357.76,
  },
  {
    week: "3",
    tCO2e: 442.1,
  },
];

describe("Test the transformData function", () => {
  it("should return and array", () => {
    const result = transformData(mockData);
    expect(Array.isArray(result)).toBe(true);
  });
  it("should return an array of objects", () => {
    const result = transformData(mockData);
    function isObject(item: any) {
      return typeof item === "object";
    }
    expect(result.every(isObject)).toBe(true);
  });
  it("should return an array of object with expected properties", () => {
    const result = transformData(mockData);
    function hasExpectedProperties(item: any) {
      return item.hasOwnProperty("week") && item.hasOwnProperty("tCO2e");
    }
    expect(result.every(hasExpectedProperties)).toBe(true);
  });
  it("should return an array of object with expected value types", () => {
    const result = transformData(mockData);
    function hasExpectedValueTypes(item: any) {
      return typeof item.week === "string" && typeof item.tCO2e === "number";
    }
    expect(result.every(hasExpectedValueTypes)).toBe(true);
  });
  it("should return weekly values", () => {
    const result = transformData(mockData);
    expect(result).toEqual(mockDataOutput);
  });
});
