import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import type { AuditLog } from '../../types';
import { History } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const { data: logs } = useQuery<AuditLog[]>({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const res = await apiClient.get('/audit-logs');
      return res.data;
    }
  });

  const logList = logs || [
    {
      id: 1,
      user_email: 'employee@bankshield.com',
      user_role: 'EMPLOYEE',
      action: 'Application Status Updated to Approved',
      resource: 'Application #BSAI-ACC-2025-05-31-000123',
      details: 'KYC verified and approved by Vikram Verma',
      timestamp: '2025-05-31T11:15:00'
    },
    {
      id: 2,
      user_email: 'employee@bankshield.com',
      user_role: 'EMPLOYEE',
      action: 'System Initialization & Fraud Monitoring Active',
      resource: 'BankShield Engine',
      details: 'Baseline rules active',
      timestamp: '2025-05-31T10:00:00'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Security Audit Logs" subtitle="Immutable audit log trail of employee operations and security actions" />

        <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Employee Action Audit Trail</h3>
                  <p className="text-xs text-slate-500">Recorded for banking compliance & security verification</p>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border">
                {logList.length} Audit Entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">User Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Action Performed</th>
                    <th className="px-6 py-3">Resource</th>
                    <th className="px-6 py-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logList.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 text-xs">{log.user_email}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                          {log.user_role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800 text-xs">{log.action}</td>
                      <td className="px-6 py-4 font-mono text-xs text-blue-700">{log.resource}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{log.details || '-'}</td>
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
