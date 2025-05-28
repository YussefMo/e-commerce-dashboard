'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface LineChartProps {
  chartData: ChartData[];
  totalSales: number;
  salesChange: number;
}

interface ChartData {
  name: string;
  Sells: number;
  Order: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const sellsData = payload.find((p: any) => p.dataKey === 'Sells');
    const orderData = payload.find((p: any) => p.dataKey === 'Order');

    return (
      <div className="custom-tooltip rounded-md border border-gray-200 bg-white p-3 shadow-md">
        <p className="label text-sm font-semibold text-gray-700">{`Date: ${label}`}</p>
        {sellsData && (
          <p className="intro text-sm text-blue-500">{`Sells: $${sellsData.value}`}</p>
        )}
        {orderData && (
          <p className="intro text-sm text-orange-500">{`Order: ${orderData.value}`}</p>
        )}
      </div>
    );
  }

  return null;
};

export default function LineChart({
  chartData,
  totalSales,
  salesChange
}: LineChartProps) {
  return (
    <div className="bg-card h-[300px] w-full rounded-lg p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-500">Subtitle</h3>
          <p className="text-2xl font-bold">
            ${totalSales.toFixed(2)}{' '}
            <span
              className={`text-sm font-semibold ${salesChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {salesChange.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="65%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Sells"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Order"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          {chartData.length > 0 && (
            <ReferenceDot
              x={chartData[chartData.length - 1].name}
              y={chartData[chartData.length - 1].Sells}
              r={5}
              fill="#8884d8"
              stroke="#8884d8"
            >
              <text
                x={chartData[chartData.length - 1].name}
                y={chartData[chartData.length - 1].Sells}
                dx={-40}
                dy={-20}
                fill="#8884d8"
                textAnchor="middle"
                className="text-xs font-bold"
              >
                {salesChange.toFixed(1)}% {salesChange >= 0 ? 'UP' : 'DOWN'}
              </text>
            </ReferenceDot>
          )}
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600">Sells</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-500"></span>
          <span className="text-sm text-gray-600">Order</span>
        </div>
      </div>
    </div>
  );
}
