"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo-text-here.png";
import { getCSV } from "../utils/functions";
import { OutputData } from "../types/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Home() {
  const [values, setValues] = useState<OutputData[] | undefined>();

  useEffect(() => {
    getCSV(setValues);
  }, []);

  if (!values) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image src={logo} alt="Logo" className="w-[100px]" priority />

      <BarChart
        width={1100}
        height={400}
        data={values}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="week"
          tick={{ fontSize: "10px" }}
          tickCount={values.length}
          label="Week"
          height={75}
        />

        <YAxis
          domain={[0, "dataMax"]}
          width={100}
          label="tCO2e"
          tick={{ fontSize: "10px" }}
        />
        <Tooltip />
        <Bar
          dataKey="tCO2e"
          fill="#EE6C60"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </main>
  );
}
