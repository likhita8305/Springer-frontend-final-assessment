import React from "react";
import SalesChart from "../components/SalesChart";
import { sales2022, sales2023, sales2024 } from "../data/salesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-semibold">Sales Dashboard</h1>
        <Button className="rounded-2xl px-6 py-2">Download Report</Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Sales (2024)", value: "₹ 18.2M" },
          { label: "Active Customers", value: "12,450" },
          { label: "New Leads", value: "1,245" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-700">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Charts Section */}
      <Card className="p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Sales Overview (2022–2024)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SalesChart data={sales2022} year={2022} />
          <SalesChart data={sales2023} year={2023} />
          <SalesChart data={sales2024} year={2024} />
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activities */}
        <Card className="rounded-2xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>
          <div className="space-y-3">
            {[
              "New customer ‘Ravi’ placed an order worth ₹12,500",
              "2024 Q1 report exported",
              "New lead added from website",
              "Payment verification completed"
            ].map((item) => (
              <div
                key={item}
                className="p-3 bg-white rounded-xl shadow-sm border"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Add Customer", "Create Invoice", "Upload CSV", "View Logs"].map(
              (action) => (
                <Button
                  key={action}
                  className="rounded-2xl py-6 text-lg w-full"
                >
                  {action}
                </Button>
              )
            )}
          </div>
        </Card>
        
      </div>
    </div>
  );
}
