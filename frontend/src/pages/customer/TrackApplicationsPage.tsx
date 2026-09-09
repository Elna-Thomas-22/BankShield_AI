import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import type { Application } from '../../types';
import { FileText } from 'lucide-react';

export const TrackApplicationsPage: React.FC = () => {
  const { data: applications } = useQuery<Application[]>({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const res = await apiClient.get('/customer/applications');
      return res.data;
    }
  });

  const appsList = applications && applications.length > 0 ? applications : [
    {
      id: 1,
      reference_no: 'BSAI-ACC-2025-05-31-000123',
      account_type: 'Savings Account',
      status: 'KYC Pending',
      submitted_on: '2025-05-31T10:45:00',
      documents: []
    },
    {
      id: 2,
      reference_no: 'BSAI-ACC-2025-05-30-000089',
      account_type: 'Current Account',
      status: 'Under Review',
      submitted_on: '2025-05-30T14:20:00',
      documents: []
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Track Applications" subtitle="Real-time status of your bank account applications" />

        <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Your Submitted Applications</h3>

            <div className="space-y-4">
              {appsList.map((app) => (
                <div key={app.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{app.account_type}</h4>
                          <span className="font-mono text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            {app.reference_no}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Submitted on {new Date(app.submitted_on).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={app.status} />
                  </div>

                  {/* Application Timeline / Step indicator */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {['Submitted', 'KYC Received', 'Under Review', 'Decision'].map((step, idx) => {
                      const isPast = idx < 2;
                      const isCurrent = idx === 2;

                      return (
                        <div key={step} className="text-center space-y-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              isPast ? 'bg-emerald-500' : isCurrent ? 'bg-blue-600 animate-pulse' : 'bg-slate-200'
                            }`}
                          ></div>
                          <span className="text-[11px] font-semibold text-slate-600 block">{step}</span>
                        </div>
                      );
                    })}
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
