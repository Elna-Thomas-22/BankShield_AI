import React from 'react';

interface CategoryCardProps {
  title: string;
  kannadaTitle: string;
  icon: string;
  countText?: string;
  onClick: () => void;
  colorHex?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  kannadaTitle,
  icon,
  countText,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-emerald-100/90 hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl p-3 bg-emerald-50 group-hover:bg-emerald-100 rounded-2xl transition-colors">
          {icon}
        </span>
        {countText && (
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
            {countText}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-extrabold text-lg text-emerald-950 group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>
        <p className="kannada-text text-xs text-amber-700 font-semibold mt-0.5">
          {kannadaTitle}
        </p>
      </div>
    </div>
  );
};
