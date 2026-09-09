import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import type { FraudAlert } from '../../types';
import { Search } from 'lucide-react';

export const FraudAlertsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: alerts } = useQuery<FraudAlert[]>({
    queryKey: ['fraudAlerts'],
    queryFn: async () => {
      const res = await apiClient.get('/employee/alerts');
      return res.data;
    }
  });

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiClient.patch(`/employee/alerts/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fraudAlerts'] });
    }
  });

  const alertList = alerts || [
    {
      id: 1,
      alert_code: 'ALT-9081',
      transaction_id: 2,
      customer_name: 'Rajesh Kumar',
      account_number: '5010 1234 5678',
      risk_level: 'CRITICAL',
      fraud_probability: 96.2,
      alert_type: 'High-Amount Foreign IP Velocity',
      status: 'New',
      assigned_employee: 'Vikram Verma',
      created_at: '2025-05-31T10:50:00'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Fraud Risk Alerts" subtitle="Monitor and resolve active fraud alerts flagged by AI" />

        <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alert code, customer name, account number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-100 outline-none"
              />
            </div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Alert Code</th>
                    <th className="px-6 py-4">Customer / Account</th>
                    <th className="px-6 py-4">Alert Type</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Probability</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alertList.map((alertItem) => (
                    <tr key={alertItem.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-rose-700 text-xs">{alertItem.alert_code}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{alertItem.customer_name}</p>
                        <p className="font-mono text-xs text-slate-400">{alertItem.account_number}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-700">{alertItem.alert_type}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={alertItem.risk_level} size="sm" />
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{alertItem.fraud_probability}%</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={alertItem.status} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          value={alertItem.status}
                          onChange={(e) => updateAlertMutation.mutate({ id: alertItem.id, status: e.target.value })}
                          className="px-2.5 py-1.5 rounded-lg border text-xs font-semibold bg-white text-slate-800 outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Confirmed Fraud">Confirmed Fraud</option>
                          <option value="False Positive">False Positive</option>
                          <option value="Resolved">Resolved</option>
                        </select>
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
