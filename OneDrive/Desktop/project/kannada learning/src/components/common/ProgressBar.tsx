import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  color?: 'green' | 'amber' | 'blue';
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  color = 'green',
  height = 'md'
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5'
  };

  const colorClasses = {
    green: 'bg-gradient-to-r from-emerald-500 to-green-600',
    amber: 'bg-gradient-to-r from-amber-400 to-amber-500',
    blue: 'bg-gradient-to-r from-blue-500 to-indigo-600'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span>{Math.round(normalizedProgress)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden shadow-inner ${heightClasses[height]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${colorClasses[color]}`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};
