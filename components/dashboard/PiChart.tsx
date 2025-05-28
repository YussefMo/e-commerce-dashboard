'use client';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface TopProductData {
  name: string;
  sales: number;
}

interface PiChartProps {
  topProducts: TopProductData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded-md border border-gray-200 bg-white p-3 shadow-md">
        <p className="label text-sm font-semibold text-gray-700">{`${payload[0].name} : $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

function PiChart({ topProducts }: PiChartProps) {
  return (
    <div className="bg-card h-[300px] w-full rounded-lg p-4 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">Top Selling Products</h3>
      {topProducts.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={topProducts}
              dataKey="sales"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              fill="#8884d8"
              label
            >
              {topProducts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">
          No top selling products data available.
        </div>
      )}
    </div>
  );
}

export default PiChart;
