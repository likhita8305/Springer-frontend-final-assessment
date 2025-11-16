// components/SalesChart.tsx
import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import type { MonthSales } from "../data/salesData";

type Props = { data: MonthSales[]; year: number };

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
  "#b0e0e6",
  "#d8bfd8",
  "#f4a460",
  "#9acd32",
];

const ChartButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`px-3 py-1 rounded text-sm border transition ${active
      ? "bg-gray-800 text-white dark:bg-white dark:text-black"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }`}
  >
    {children}
  </button>
);

export default function SalesChart({ data, year }: Props) {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState<string>("");

  const filtered = useMemo<MonthSales[]>(() => {
    if (!threshold) return data;
    const n = Number(threshold);
    if (Number.isNaN(n)) return data;
    return data.filter((d) => d.sales >= n);
  }, [threshold, data]);

  // single child for ResponsiveContainer
  const chart = useMemo(() => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        );

      case "line":
        return (
          <LineChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={filtered}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="sales"
              nameKey="month"
              label
            >
              {filtered.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  }, [chartType, filtered]);

  return (
    <div className="dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">Sales {year}</h2>

        {/* Controls */}
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min sales"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border px-3 py-1 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring focus:ring-gray-300 dark:focus:ring-gray-700"
          />

          <ChartButton active={chartType === "bar"} onClick={() => setChartType("bar")}>
            BAR
          </ChartButton>
          <ChartButton active={chartType === "line"} onClick={() => setChartType("line")}>
            LINE
          </ChartButton>
          <ChartButton active={chartType === "pie"} onClick={() => setChartType("pie")}>
            PIE
          </ChartButton>
        </div>
      </div>

      {/* Chart area */}
      <div style={{ height: 340 }} className="relative">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-300">
            No data available for this filter.
          </div>
        ) : (
          <motion.div
            key={`${chartType}-${threshold}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chart}
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
}
