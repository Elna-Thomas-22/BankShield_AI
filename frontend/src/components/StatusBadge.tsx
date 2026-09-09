import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = (val: string) => {
    const s = val.toLowerCase();
    if (s.includes('approved') || s.includes('active') || s.includes('low') || s.includes('verified') || s.includes('cleared')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    if (s.includes('pending') || s.includes('kyc pending') || s.includes('new')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (s.includes('review') || s.includes('investigation') || s.includes('medium')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (s.includes('rejected') || s.includes('fraud') || s.includes('critical') || s.includes('high')) {
      return 'bg-rose-100 text-rose-800 border-rose-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const py = size === 'sm' ? 'py-0.5 px-2 text-[11px]' : 'py-1 px-2.5 text-xs';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${py} ${getBadgeStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75"></span>
      {status}
    </span>
  );
};
