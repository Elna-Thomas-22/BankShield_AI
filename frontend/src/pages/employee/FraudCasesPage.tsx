import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import type { FraudCase } from '../../types';
import { Plus } from 'lucide-react';

export const FraudCasesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [newCase, setNewCase] = useState({
    title: '',
    customer_id: 1,
    account_number: '5010 1234 5678',
    risk_level: 'CRITICAL',
    notes: '',
    evidence_details: ''
  });

  const { data: cases } = useQuery<FraudCase[]>({
    queryKey: ['fraudCases'],
    queryFn: async () => {
      const res = await apiClient.get('/employee/cases');
      return res.data;
    }
  });

  const createCaseMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiClient.post('/employee/cases', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fraudCases'] });
      setShowModal(false);
    }
  });

  const caseList = cases || [
    {
      id: 1,
      case_number: 'CASE-101',
      title: 'Suspicious International Transfer & Device Anomaly',
      customer_id: 1,
      account_number: '5010 1234 5678',
      risk_level: 'CRITICAL',
      status: 'Under Investigation',
      assigned_employee: 'Vikram Verma (Fraud Analyst)',
      notes: 'Account placed on temporary hold pending verification call.',
      evidence_details: 'IP Location: Lagos, NG. Foreign POS merchant code mismatch.',
      created_at: '2025-05-31T11:00:00',
      updated_at: '2025-05-31T11:00:00'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Fraud Case Management" subtitle="Manage formal fraud investigations and evidence dossiers" />

        <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Active Investigation Dossiers</h3>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Open New Fraud Case
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseList.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-700">{c.case_number}</span>
                    <h4 className="font-bold text-slate-900 text-base mt-0.5">{c.title}</h4>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Target Account</span>
                    <span className="font-mono font-bold text-slate-900">{c.account_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Assigned Analyst</span>
                    <span className="font-semibold text-slate-800">{c.assigned_employee}</span>
                  </div>
                </div>

                {c.evidence_details && (
                  <div className="text-xs p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <strong className="text-amber-800 block mb-1">Evidence & Signals:</strong>
                    <span className="text-amber-900">{c.evidence_details}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Create Fraud Case</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createCaseMutation.mutate(newCase);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Case Title *</label>
                  <input
                    type="text"
                    required
                    value={newCase.title}
                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    placeholder="e.g. Account Takeover Attempt"
                    className="w-full p-2.5 rounded-xl border outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={newCase.account_number}
                    onChange={(e) => setNewCase({ ...newCase, account_number: e.target.value })}
                    className="w-full p-2.5 rounded-xl border outline-none text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Evidence Summary</label>
                  <textarea
                    rows={2}
                    value={newCase.evidence_details}
                    onChange={(e) => setNewCase({ ...newCase, evidence_details: e.target.value })}
                    className="w-full p-2.5 rounded-xl border outline-none"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl">Create Case</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
