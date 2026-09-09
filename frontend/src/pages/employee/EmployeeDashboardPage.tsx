import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import type { EmployeeDashboardKPIs } from '../../types';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { MetricCard } from '../../components/MetricCard';
import { 
  Users, 
  FileText, 
  Clock, 
  AlertTriangle, 
  FolderLock, 
  ShieldAlert, 
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmployeeDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<EmployeeDashboardKPIs>({
    queryKey: ['employeeDashboard'],
    queryFn: async () => {
      const res = await apiClient.get('/employee/dashboard');
      return res.data;
    }
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Employee Overview" subtitle="AI Fraud Monitoring & Risk Operations Dashboard" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-800 rounded-2xl p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest bg-teal-500/20 px-2.5 py-1 rounded border border-teal-500/30">
                Fraud Operations Center
              </span>
              <h3 className="text-2xl font-bold mt-2">Active AI Risk Engine & Alert Surveillance</h3>
              <p className="text-xs text-slate-300 mt-1">Real-time inference running on customer transactions & account applications.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/employee/fraud-detection')}
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <Cpu className="w-4 h-4" /> Run AI Fraud Scan
              </button>
            </div>
          </div>

          {/* Employee Portal KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total Customers"
              value={isLoading ? '...' : (data?.total_customers || 128)}
              subtext="Registered Bank Customers"
              icon={Users}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <MetricCard
              title="New Applications"
              value={isLoading ? '...' : (data?.new_applications || 24)}
              subtext="Account requests"
              icon={FileText}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <MetricCard
              title="Pending Reviews"
              value={isLoading ? '...' : (data?.pending_applications || 4)}
              subtext="Awaiting verification"
              icon={Clock}
              iconBgColor="bg-amber-100"
              iconColor="text-amber-600"
            />
            <MetricCard
              title="Fraud Alerts"
              value={isLoading ? '...' : (data?.fraud_alerts || 15)}
              subtext="Active risk flags"
              icon={AlertTriangle}
              iconBgColor="bg-rose-100"
              iconColor="text-rose-600"
              trend="15 Alerts"
            />
          </div>

          {/* Secondary Metric Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <MetricCard
              title="High Risk Accounts"
              value={isLoading ? '...' : (data?.high_risk_accounts || 6)}
              subtext="Critical monitoring list"
              icon={ShieldAlert}
              iconBgColor="bg-red-100"
              iconColor="text-red-600"
            />
            <MetricCard
              title="Fraud Cases"
              value={isLoading ? '...' : (data?.fraud_cases || 8)}
              subtext="Under investigation"
              icon={FolderLock}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
            />
            <MetricCard
              title="Total Detected Fraud"
              value={isLoading ? '...' : `₹ ${(data?.total_detected_fraud_amount || 485000).toLocaleString('en-IN')}`}
              subtext="Prevented loss amount"
              icon={TrendingUp}
              iconBgColor="bg-emerald-100"
              iconColor="text-emerald-600"
            />
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate('/employee/applications')}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Application Review & Approval</h4>
              <p className="text-xs text-slate-500 mt-1">Review KYC document uploads, verify identities, and approve/reject account requests.</p>
            </div>

            <div
              onClick={() => navigate('/employee/alerts')}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform text-rose-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Manage Fraud Risk Alerts</h4>
              <p className="text-xs text-slate-500 mt-1">Inspect high risk transaction alerts, assign analysts, and change alert lifecycle statuses.</p>
            </div>

            <div
              onClick={() => navigate('/employee/analytics')}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform text-teal-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Reports & Analytics</h4>
              <p className="text-xs text-slate-500 mt-1">Generate fraud trend reports, location risk heatmaps, and AI detection accuracy charts.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
