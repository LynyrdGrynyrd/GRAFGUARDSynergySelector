"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ExpansionChartProps {
  data: {
    temp: string;
    expansion: number;
  }[];
}

export function ExpansionChart({ data }: ExpansionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="temp" />
        <YAxis label={{ value: 'Expansion (cc/g)', angle: -90, position: 'insideLeft', offset: -5 }} />
        <Tooltip cursor={{ fill: 'rgba(206, 212, 218, 0.3)' }} />
        <Bar dataKey="expansion" fill="#2f855a" name="Expansion" unit=" cc/g" />
      </BarChart>
    </ResponsiveContainer>
  );
}