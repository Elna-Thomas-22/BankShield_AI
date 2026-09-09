import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import { UploadCloud, CheckCircle2, FileText, Camera, ShieldCheck, FileCheck } from 'lucide-react';
import { apiClient } from '../../api/client';

export const UploadKYCPage: React.FC = () => {
  const [uploads, setUploads] = useState({
    identity: { uploaded: true, filename: 'Aadhaar_Card.pdf' },
    address: { uploaded: true, filename: 'Aadhaar_Card.pdf' },
    pan: { uploaded: true, filename: 'PAN_Card.pdf' },
    selfie: { uploaded: true, filename: 'Selfie.jpg' },
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = async (type: 'identity' | 'address' | 'pan' | 'selfie', file: File) => {
    const formData = new FormData();
    formData.append('document_type', type);
    formData.append('application_id', '1');
    formData.append('file', file);

    try {
      await apiClient.post('/customer/kyc/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploads(prev => ({ ...prev, [type]: { uploaded: true, filename: file.name } }));
      setMessage(`Successfully uploaded ${file.name}`);
    } catch (err) {
      setMessage(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Upload KYC Verification" subtitle="Submit required identity verification documents securely" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
          {/* Application Reference Header Bar matching Figma node 197-653 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Application Ref:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border text-sm">
                  BSAI-ACC-2025-05-31-000123
                </span>
                <StatusBadge status="KYC Pending" size="sm" />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span>Account Type: <strong className="text-slate-800">Savings Account</strong></span>
                <span>•</span>
                <span>Submitted: <strong className="text-slate-800">31 May 2025, 10:45 AM</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              256-Bit Encrypted Vault
            </div>
          </div>

          {message && (
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-200">
              {message}
            </div>
          )}

          {/* Required Documents Matrix (4 Cards) matching Figma node 197-653 */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Required Verification Documents</h3>
            <p className="text-xs text-slate-500 mb-6">
              Please upload clear copies. Accepted formats: JPG, PNG, or PDF (Max 10MB per file).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Identity Proof */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Identity Proof *</h4>
                      <p className="text-[11px] text-slate-500">Aadhaar / Passport / Voter ID / DL</p>
                    </div>
                  </div>
                  {uploads.identity.uploaded && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                  {uploads.identity.uploaded ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-semibold text-slate-800">{uploads.identity.filename}</span>
                      </div>
                      <label className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                        Replace
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('identity', e.target.files[0])} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-2">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-600">Click to upload document</span>
                      <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('identity', e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>

              {/* Card 2: Address Proof */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Address Proof *</h4>
                      <p className="text-[11px] text-slate-500">Aadhaar Card / Utility Bill</p>
                    </div>
                  </div>
                  {uploads.address.uploaded && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors bg-slate-50/50">
                  {uploads.address.uploaded ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-semibold text-slate-800">{uploads.address.filename}</span>
                      </div>
                      <label className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                        Replace
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('address', e.target.files[0])} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-2">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-600">Click to upload document</span>
                      <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('address', e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>

              {/* Card 3: PAN Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">PAN Card *</h4>
                      <p className="text-[11px] text-slate-500">Permanent Account Number Card</p>
                    </div>
                  </div>
                  {uploads.pan.uploaded && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-amber-400 transition-colors bg-slate-50/50">
                  {uploads.pan.uploaded ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-semibold text-slate-800">{uploads.pan.filename}</span>
                      </div>
                      <label className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                        Replace
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('pan', e.target.files[0])} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-2">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-600">Click to upload document</span>
                      <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('pan', e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>

              {/* Card 4: Selfie Photograph */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Selfie Photograph *</h4>
                      <p className="text-[11px] text-slate-500">Live photograph or passport photo</p>
                    </div>
                  </div>
                  {uploads.selfie.uploaded && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-purple-400 transition-colors bg-slate-50/50">
                  {uploads.selfie.uploaded ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-5 h-5 text-purple-600" />
                        <span className="text-xs font-semibold text-slate-800">{uploads.selfie.filename}</span>
                      </div>
                      <label className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                        Replace
                        <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('selfie', e.target.files[0])} />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-2">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-600">Click to upload photograph</span>
                      <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload('selfie', e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 text-right">
              <button
                onClick={() => alert('KYC documents submitted for automated AI verification!')}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 text-sm"
              >
                Submit Documents for Review
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
