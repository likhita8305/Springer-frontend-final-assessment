import React from "react";
import SalesChart from "../components/SalesChart";
import { sales2022, sales2023, sales2024 } from "../data/salesData";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SalesChart data={sales2022} year={2022}/>
        <SalesChart data={sales2023} year={2023}/>
        <SalesChart data={sales2024} year={2024}/>
      </div>
    </div>
  );
}
