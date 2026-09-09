import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  UploadCloud, 
  CreditCard, 
  HelpCircle, 
  LayoutDashboard, 
  Cpu, 
  AlertTriangle, 
  FolderLock, 
  BarChart3, 
  History,
  ShieldCheck
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  portal: 'customer' | 'employee';
}

export const Sidebar: React.FC<SidebarProps> = ({ portal }) => {
  const { user } = useAuth();
  const location = useLocation();

  const customerNav = [
    { name: 'Home', path: '/customer/dashboard', icon: Home },
    { name: 'Open New Account', path: '/customer/open-account', icon: PlusCircle },
    { name: 'Track Applications', path: '/customer/applications', icon: FileText },
    { name: 'Upload KYC', path: '/customer/upload-kyc', icon: UploadCloud },
    { name: 'My Accounts', path: '/customer/my-accounts', icon: CreditCard },
    { name: 'Support & Help', path: '/customer/support', icon: HelpCircle },
  ];

  const employeeNav = [
    { name: 'Dashboard Overview', path: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'Application Review', path: '/employee/applications', icon: FileText },
    { name: 'Fraud Detection (AI)', path: '/employee/fraud-detection', icon: Cpu },
    { name: 'Fraud Risk Alerts', path: '/employee/alerts', icon: AlertTriangle },
    { name: 'Fraud Cases', path: '/employee/cases', icon: FolderLock },
    { name: 'Reports & Analytics', path: '/employee/analytics', icon: BarChart3 },
    { name: 'Security Audit Logs', path: '/employee/audit-logs', icon: History },
  ];

  const navItems = portal === 'customer' ? customerNav : employeeNav;

  return (
    <aside className="w-64 bg-navy-900 text-white min-h-screen flex flex-col border-r border-slate-800 shadow-xl shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            BankShield <span className="text-blue-400 text-xs px-1.5 py-0.5 rounded bg-blue-500/20 font-semibold border border-blue-400/30">AI</span>
          </h1>
          <p className="text-xs text-slate-400 capitalize">{portal} Portal</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Main Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Card Footer */}
      <div className="p-4 border-t border-slate-800 bg-navy-800/60 m-3 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-blue-300 border border-slate-600">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.full_name || 'Bank Customer'}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
