import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { CreditCard, Wallet, Landmark, TrendingUp, ChevronRight, Download, Filter } from 'lucide-react';

export const MyAccountsPage: React.FC = () => {
  const { data: accountsData } = useQuery({
    queryKey: ['myAccounts'],
    queryFn: async () => {
      const res = await apiClient.get('/customer/accounts');
      return res.data;
    }
  });

  const accounts = accountsData && accountsData.length > 0 ? accountsData : [
    { id: 1, account_type: 'Savings Account', account_number: '5010 1234 5678', is_primary: true, balance: 125430.50, status: 'Active' },
    { id: 2, account_type: 'Current Account', account_number: '6010 9876 5432', is_primary: false, balance: 75320.00, status: 'Active' },
    { id: 3, account_type: 'Fixed Deposit', account_number: '7010 2468 1357', is_primary: false, balance: 100000.00, maturity_date: '31 May 2026', status: 'Active' },
    { id: 4, account_type: 'NRI Savings Account', account_number: '8010 1122 3344', is_primary: false, balance: 47000.00, status: 'Active' },
  ];

  const totalBalance = accounts.reduce((acc: number, curr: any) => acc + (curr.balance || 0), 0);
  const fdBalance = accounts.filter((a: any) => a.account_type.includes('Fixed')).reduce((acc: number, curr: any) => acc + (curr.balance || 0), 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="My Accounts" subtitle="View and manage all your bank accounts in one place" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Summary Metric Cards matching Figma node 197-654 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total Accounts"
              value={accounts.length}
              subtext="Active Accounts"
              icon={CreditCard}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Total Balance"
              value={`₹ ${totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              subtext="All Accounts"
              icon={Wallet}
              iconBgColor="bg-emerald-100"
              iconColor="text-emerald-600"
            />
            <MetricCard
              title="Fixed Deposits"
              value={`₹ ${fdBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
              subtext="In 1 Account"
              icon={Landmark}
              iconBgColor="bg-amber-100"
              iconColor="text-amber-600"
            />
            <MetricCard
              title="Interest Earned (YTD)"
              value="₹ 6,250.00"
              subtext="Till Date"
              icon={TrendingUp}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
          </div>

          {/* Account Portfolio Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">Your Bank Accounts</h3>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50">
                  <Filter className="w-3.5 h-3.5" /> All Accounts
                </button>
                <button className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50">
                  <Download className="w-3.5 h-3.5" /> Download Statement
                </button>
              </div>
            </div>

            {/* List of Accounts Cards matching Figma 197-654 */}
            <div className="space-y-4">
              {accounts.map((acc: any) => (
                <div
                  key={acc.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-white flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{acc.account_type}</h4>
                        {acc.is_primary && (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">Acc Number: {acc.account_number}</p>
                      {acc.maturity_date && (
                        <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Maturity Date: {acc.maturity_date}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Available Balance</p>
                      <p className="text-xl font-extrabold text-slate-900">
                        ₹ {acc.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <StatusBadge status={acc.status} />

                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
