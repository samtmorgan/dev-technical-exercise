import Papa, { ParseResult } from "papaparse";
import { InputData, OutputData } from "../types/types";
import { SetStateAction } from "react";

export function transformData(data: InputData[]): OutputData[] {
  const transformedData: OutputData[] = data.map((row, index) => {
    //   placeholder row data
    const rowData: OutputData = { week: "", tCO2e: 0 };
    rowData.week = row.Week;
    if (index === 0) {
      rowData.tCO2e = Number(row.tCO2e);
    } else {
      rowData.tCO2e = Number(row.tCO2e) - Number(data[index - 1].tCO2e);
    }
    rowData.tCO2e = Number(rowData.tCO2e.toFixed(2));
    return rowData;
  });
  return transformedData;
}

export function getCSV(
  setValues: (value: SetStateAction<OutputData[] | undefined>) => void
) {
  Papa.parse("/anon_carbon_data.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    delimiter: ",",
    complete: (results: ParseResult<InputData>) => {
      const transformedData = transformData(results.data);
      setValues(transformedData);
    },
    error: (error: object) => {
      console.log(error);
      setValues(undefined);
    },
  });
}
