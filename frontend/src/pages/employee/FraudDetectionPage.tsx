import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { StatusBadge } from '../../components/StatusBadge';
import { Cpu, UploadCloud, Play, FileSpreadsheet } from 'lucide-react';
import { apiClient } from '../../api/client';
import type { FraudPrediction } from '../../types';

export const FraudDetectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  
  // Single transaction form fields
  const [txnData, setTxnData] = useState({
    amount: 185000,
    transaction_type: 'Wire Transfer',
    location: 'Lagos, NG',
    device_info: 'Android / Unknown IP',
    velocity_count_24h: 8,
    is_foreign_transaction: true
  });

  const [prediction, setPrediction] = useState<FraudPrediction | null>({
    transaction_id: 'TXN-90002',
    fraud_probability: 96.2,
    risk_score: 96,
    risk_level: 'CRITICAL',
    prediction: 'FRAUD',
    timestamp: new Date().toISOString(),
    feature_contributions: {
      amount_risk: 'High',
      velocity_flag: 'High',
      foreign_ip: 'Yes'
    }
  });

  const [loading, setLoading] = useState(false);

  // Batch CSV dataset states
  const [batchResult, setBatchResult] = useState<any | null>(null);

  const handleSinglePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiClient.post('/fraud/predict', txnData);
      setPrediction(res.data);
    } catch (err) {
      alert('Failed to run AI prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await apiClient.post('/fraud/dataset/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBatchResult(res.data);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'CSV parse failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="AI Fraud Detection Engine" subtitle="Real-time transaction risk scoring & batch dataset analysis" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Tab Switcher */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'single'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border'
              }`}
            >
              <Cpu className="w-4 h-4" /> Single Transaction Risk Scan
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === 'batch'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> Batch CSV Dataset Upload
            </button>
          </div>

          {activeTab === 'single' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Transaction Input Form (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Transaction Feature Parameters</h3>
                    <p className="text-xs text-slate-500">Inputs will pass to the Fraud Prediction Service</p>
                  </div>
                </div>

                <form onSubmit={handleSinglePredict} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Amount (₹) *</label>
                      <input
                        type="number"
                        value={txnData.amount}
                        onChange={(e) => setTxnData({ ...txnData, amount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Transaction Type *</label>
                      <select
                        value={txnData.transaction_type}
                        onChange={(e) => setTxnData({ ...txnData, transaction_type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 outline-none bg-white"
                      >
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Online Purchase">Online Purchase</option>
                        <option value="ATM Withdrawal">ATM Withdrawal</option>
                        <option value="Crypto Purchase">Crypto Purchase</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Location / City</label>
                      <input
                        type="text"
                        value={txnData.location}
                        onChange={(e) => setTxnData({ ...txnData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Device Info</label>
                      <input
                        type="text"
                        value={txnData.device_info}
                        onChange={(e) => setTxnData({ ...txnData, device_info: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">24h Velocity Count</label>
                      <input
                        type="number"
                        value={txnData.velocity_count_24h}
                        onChange={(e) => setTxnData({ ...txnData, velocity_count_24h: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                        <input
                          type="checkbox"
                          checked={txnData.is_foreign_transaction}
                          onChange={(e) => setTxnData({ ...txnData, is_foreign_transaction: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span>Foreign IP / International Transaction</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 text-sm flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      {loading ? 'Evaluating Model...' : 'Execute AI Prediction Model'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Prediction Results Display Panel (5 Cols) matching Figma Section 18 */}
              <div className="lg:col-span-5 space-y-6">
                {prediction ? (
                  <div className={`bg-white rounded-2xl p-6 border-2 shadow-lg space-y-6 ${
                    prediction.prediction === 'FRAUD' ? 'border-rose-500 ring-4 ring-rose-100' : 'border-emerald-500 ring-4 ring-emerald-100'
                  }`}>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Inference Output</span>
                        <h4 className="font-extrabold text-xl text-slate-900 mt-0.5">{prediction.prediction}</h4>
                      </div>
                      <StatusBadge status={prediction.risk_level} />
                    </div>

                    {/* Risk Score Circle */}
                    <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs text-slate-500 font-semibold block">Risk Score (0 - 100)</span>
                      <span className={`text-5xl font-black ${
                        prediction.risk_score >= 80 ? 'text-rose-600' : 'text-emerald-600'
                      }`}>
                        {prediction.risk_score}
                      </span>
                      <p className="text-xs font-bold text-slate-600 mt-1">
                        Fraud Probability: <span className="text-slate-900">{prediction.fraud_probability}%</span>
                      </p>
                    </div>

                    <div className="space-y-2 text-xs divide-y">
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-500">Transaction Ref</span>
                        <span className="font-mono font-bold text-slate-900">{prediction.transaction_id}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-500">Amount Risk</span>
                        <span className="font-semibold text-slate-900">{prediction.feature_contributions?.amount_risk}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-slate-500">Velocity Flag</span>
                        <span className="font-semibold text-slate-900">{prediction.feature_contributions?.velocity_flag}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-400 text-xs">
                    Fill in transaction parameters and click Execute to see AI model prediction results.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CSV Upload tab */
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Upload Transaction CSV Dataset</h3>
                <p className="text-xs text-slate-500">Parse bulk transaction files for automated batch fraud probability calculation.</p>
              </div>

              <div className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center bg-teal-50/30 hover:bg-teal-50/60 transition-colors">
                <label className="cursor-pointer">
                  <span className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md inline-block">
                    Select CSV File
                  </span>
                  <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                </label>
                <p className="text-[11px] text-slate-400 mt-2">Required column: 'amount'</p>
              </div>

              {batchResult && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-slate-900 text-sm">Batch Analysis Summary for {batchResult.filename}</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border">
                      <span className="text-xs text-slate-500 font-semibold block">Total Analyzed</span>
                      <span className="text-lg font-bold text-slate-900">{batchResult.analyzed_sample_count}</span>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                      <span className="text-xs text-rose-700 font-semibold block">Detected Fraud</span>
                      <span className="text-lg font-bold text-rose-700">{batchResult.detected_fraud_count}</span>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <span className="text-xs text-amber-700 font-semibold block">High Risk Count</span>
                      <span className="text-lg font-bold text-amber-700">{batchResult.high_risk_count}</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <span className="text-xs text-blue-700 font-semibold block">Fraud Rate %</span>
                      <span className="text-lg font-bold text-blue-700">{batchResult.fraud_rate_percentage}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
