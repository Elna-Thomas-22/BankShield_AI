import React from 'react';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  itemId: string;
  isBookmarked: boolean;
  onToggle: (id: string) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  itemId,
  isBookmarked,
  onToggle,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'p-1.5' : 'p-2';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(itemId);
      }}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
      className={`rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${sizeClasses} ${
        isBookmarked
          ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
          : 'bg-gray-100 text-gray-400 hover:text-amber-500 hover:bg-gray-200'
      } ${className}`}
    >
      <Bookmark className={`${iconSize} ${isBookmarked ? 'fill-amber-500' : ''}`} />
    </button>
  );
};
