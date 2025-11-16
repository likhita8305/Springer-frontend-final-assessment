import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell
} from "recharts";
import type { MonthSales } from "../data/salesData";

type Props = { data: MonthSales[]; year: number; };

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb", "#b0e0e6", "#d8bfd8", "#f4a460", "#9acd32"];

export default function SalesChart({ data, year }: Props) {
  const [chartType, setChartType] = useState("bar");
  const [threshold, setThreshold] = useState("");

  const filtered = useMemo(() => {
    if (threshold === "") return data;
    const t = Number(threshold);
    return data.filter(d => d.sales >= t);
  }, [threshold, data]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Sales {year}</h2>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min sales"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          {["bar", "line", "pie"].map(t => (
            <button key={t} onClick={() => setChartType(t)}
              className={`px-2 py-1 rounded ${chartType === t ? "bg-gray-200" : ""}`}
            >{t}</button>
          ))}
        </div>
      </div>

      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          ) : (
            <LineChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          )}
        </ResponsiveContainer>

      </div>
    </div>
  );
}
