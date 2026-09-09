import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import type { Application } from '../../types';
import { CheckCircle2, XCircle, Eye, Search, Filter } from 'lucide-react';

export const ApplicationReviewPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const { data: applications } = useQuery<Application[]>({
    queryKey: ['allApplications'],
    queryFn: async () => {
      const res = await apiClient.get('/employee/applications');
      return res.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: number; status: string; notes?: string }) => {
      const res = await apiClient.patch(`/employee/applications/${id}/status`, { status, notes });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allApplications'] });
      setSelectedApp(null);
      setReviewNotes('');
    }
  });

  const appList = applications || [
    {
      id: 1,
      reference_no: 'BSAI-ACC-2025-05-31-000123',
      account_type: 'Savings Account',
      status: 'KYC Pending',
      submitted_on: '2025-05-31T10:45:00',
      personal_info: { full_name: 'Rajesh Kumar', email: 'example@gmail.com', phone: '+91 98765 43210', pan: 'ABCDE1234F' },
      address_info: { city: 'Mumbai', state: 'Maharashtra', zip: '400050' },
      documents: [
        { id: 1, document_type: 'Identity Proof', document_name: 'Aadhaar_Card.pdf', file_url: '#', status: 'Uploaded', uploaded_at: '2025-05-31T10:46:00' },
        { id: 2, document_type: 'Address Proof', document_name: 'Aadhaar_Card.pdf', file_url: '#', status: 'Uploaded', uploaded_at: '2025-05-31T10:46:00' },
        { id: 3, document_type: 'PAN Card', document_name: 'PAN_Card.pdf', file_url: '#', status: 'Uploaded', uploaded_at: '2025-05-31T10:47:00' },
        { id: 4, document_type: 'Selfie', document_name: 'Selfie.jpg', file_url: '#', status: 'Uploaded', uploaded_at: '2025-05-31T10:48:00' }
      ]
    },
    {
      id: 2,
      reference_no: 'BSAI-ACC-2025-05-30-000089',
      account_type: 'Current Account',
      status: 'Under Review',
      submitted_on: '2025-05-30T14:20:00',
      personal_info: { full_name: 'Priya Sharma', email: 'customer@example.com', phone: '+91 91234 56789', pan: 'XYZPK9876Q' },
      address_info: { city: 'New Delhi', state: 'Delhi', zip: '110001' },
      documents: []
    }
  ];

  const filteredApps = appList.filter(a =>
    a.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.account_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.personal_info?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Application Review & Approvals" subtitle="Review customer KYC submissions and approve bank accounts" />

        <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Top Bar with Filter & Search */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reference number, customer name, or account type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50">
                <Filter className="w-3.5 h-3.5" /> All Applications ({filteredApps.length})
              </button>
            </div>
          </div>

          {/* Applications Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Reference No</th>
                    <th className="px-6 py-4">Applicant Name</th>
                    <th className="px-6 py-4">Account Type</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-blue-700">{app.reference_no}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {app.personal_info?.full_name || 'Rajesh Kumar'}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">{app.account_type}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(app.submitted_on).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect KYC
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Detailed Application Inspection Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Inspect Application #{selectedApp.reference_no}</h3>
                  <p className="text-xs text-slate-500">Submitted by {selectedApp.personal_info?.full_name}</p>
                </div>
                <StatusBadge status={selectedApp.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase">PAN Card Number</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{selectedApp.personal_info?.pan || 'ABCDE1234F'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase">Account Choice</span>
                  <span className="font-bold text-blue-600 text-sm">{selectedApp.account_type}</span>
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Uploaded KYC Documents (4 Files)</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Identity Proof', file: 'Aadhaar_Card.pdf' },
                    { type: 'Address Proof', file: 'Aadhaar_Card.pdf' },
                    { type: 'PAN Card', file: 'PAN_Card.pdf' },
                    { type: 'Selfie Photograph', file: 'Selfie.jpg' }
                  ].map((doc) => (
                    <div key={doc.type} className="p-3 bg-white border rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{doc.type}</p>
                        <p className="text-[11px] font-mono text-slate-500">{doc.file}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Verified</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Analyst Notes</label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Enter notes or audit commentary..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 border font-semibold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatusMutation.mutate({ id: selectedApp.id, status: 'Rejected', notes: reviewNotes })}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20"
                >
                  <XCircle className="w-4 h-4" /> Reject Application
                </button>
                <button
                  onClick={() => updateStatusMutation.mutate({ id: selectedApp.id, status: 'Approved', notes: reviewNotes })}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
