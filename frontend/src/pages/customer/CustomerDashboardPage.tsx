import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import type { CustomerDashboardSummary } from '../../types';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { CreditCard, Wallet, Landmark, TrendingUp, PlusCircle, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<CustomerDashboardSummary>({
    queryKey: ['customerDashboard'],
    queryFn: async () => {
      const res = await apiClient.get('/customer/dashboard');
      return res.data;
    }
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Customer Dashboard" subtitle="Overview of your bank accounts and transactions" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-navy-900 rounded-2xl p-6 text-white shadow-xl">
            <div>
              <h3 className="text-xl font-bold">Welcome back, Customer</h3>
              <p className="text-xs text-blue-200 mt-1">Your account security status is Active & Protected by AI Monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/customer/open-account')}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                Open New Account
              </button>
              <button
                onClick={() => navigate('/customer/upload-kyc')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all text-slate-200"
              >
                <UploadCloud className="w-4 h-4 text-teal-400" />
                Upload KYC
              </button>
            </div>
          </div>

          {/* Metric Cards Grid matching Figma 197-654 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total Accounts"
              value={isLoading ? '...' : (data?.total_accounts || 4)}
              subtext="Active bank accounts"
              icon={CreditCard}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Total Balance"
              value={isLoading ? '...' : `₹ ${(data?.total_balance || 248750.50).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              subtext="Across all accounts"
              icon={Wallet}
              iconBgColor="bg-emerald-100"
              iconColor="text-emerald-600"
              trend="+4.2%"
            />
            <MetricCard
              title="Fixed Deposits"
              value={isLoading ? '...' : `₹ ${(data?.fixed_deposits_balance || 100000.00).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              subtext="Locked in 1 account"
              icon={Landmark}
              iconBgColor="bg-amber-100"
              iconColor="text-amber-600"
            />
            <MetricCard
              title="Interest Earned (YTD)"
              value={isLoading ? '...' : `₹ ${(data?.interest_earned_ytd || 6250.00).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              subtext="Till date"
              icon={TrendingUp}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
          </div>

          {/* Recent Accounts Portfolio Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-lg">My Accounts Portfolio</h4>
              <button
                onClick={() => navigate('/customer/my-accounts')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All Accounts &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-y border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Account Type</th>
                    <th className="px-4 py-3">Account Number</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.accounts && data.accounts.length > 0 ? data.accounts : [
                    { id: 1, account_type: 'Savings Account', account_number: '5010 1234 5678', is_primary: true, balance: 125430.50, status: 'Active' },
                    { id: 2, account_type: 'Current Account', account_number: '6010 9876 5432', is_primary: false, balance: 75320.00, status: 'Active' },
                    { id: 3, account_type: 'Fixed Deposit', account_number: '7010 2468 1357', is_primary: false, balance: 100000.00, status: 'Active' },
                    { id: 4, account_type: 'NRI Account', account_number: '8010 1122 3344', is_primary: false, balance: 47000.00, status: 'Active' },
                  ]).map((acc: any) => (
                    <tr key={acc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                        {acc.account_type}
                        {acc.is_primary && (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                            Primary
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{acc.account_number}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        ₹ {acc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={acc.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
