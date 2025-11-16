export type MonthSales = { month: string; sales: number };

export const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function randomSales(min = 2000, max = 20000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sales2022 = months.map((m) => ({ month: m, sales: randomSales(1500,15000) }));
export const sales2023 = months.map((m) => ({ month: m, sales: randomSales(3000,20000) }));
export const sales2024 = months.map((m) => ({ month: m, sales: randomSales(8000,35000) }));
