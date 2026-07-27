import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white bg-opacity-80 shadow-elev p-6 text-center backdrop-blur-sm">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
