import React from 'react';
import { Home, BookOpen, PenTool, Layers, MessageSquare } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: PenTool },
    { id: 'words', label: 'Words', icon: Layers },
    { id: 'conversations', label: 'Chats', icon: MessageSquare }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg px-2 py-1">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-700 font-bold bg-emerald-50 scale-105'
                  : 'text-gray-500 font-medium hover:text-emerald-600'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
