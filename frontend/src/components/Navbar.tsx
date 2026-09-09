import React from 'react';
import { LogOut, Bell, User as UserIcon, RefreshCw } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title || 'Dashboard'}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          AI Protection Engine Active
        </div>

        {/* Portal Switcher Button */}
        <button
          onClick={() => navigate('/')}
          className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Switch Portal
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Pill & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-800">{user?.full_name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
