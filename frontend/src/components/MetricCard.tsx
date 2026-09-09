import React from 'react';
import type { LucideIcon } from 'lucide-react';


interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
  trend
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-xl ${iconBgColor} ${iconColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
        {subtext && (
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            {trend && <span className="font-semibold text-emerald-600">{trend}</span>}
            <span>{subtext}</span>
          </div>
        )}
      </div>
    </div>
  );
};
