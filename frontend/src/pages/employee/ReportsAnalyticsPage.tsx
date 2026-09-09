import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { MetricCard } from '../../components/MetricCard';
import { 
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { TrendingUp, ShieldCheck, Target, Zap } from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  const { data: analytics } = useQuery({
    queryKey: ['analyticsOverview'],
    queryFn: async () => {
      const res = await apiClient.get('/analytics/overview');
      return res.data;
    }
  });

  const monthlyTrend = analytics?.monthly_trend || [
    { month: 'Jan', total_transactions: 1420, fraud_detected: 18, prevented_loss: 125000 },
    { month: 'Feb', total_transactions: 1680, fraud_detected: 24, prevented_loss: 198000 },
    { month: 'Mar', total_transactions: 1890, fraud_detected: 15, prevented_loss: 110000 },
    { month: 'Apr', total_transactions: 2100, fraud_detected: 31, prevented_loss: 285000 },
    { month: 'May', total_transactions: 2450, fraud_detected: 28, prevented_loss: 240000 },
    { month: 'Jun', total_transactions: 2780, fraud_detected: 39, prevented_loss: 365000 },
  ];

  const riskDistribution = analytics?.risk_distribution || [
    { name: 'Low Risk', value: 72, color: '#10B981' },
    { name: 'Medium Risk', value: 18, color: '#F59E0B' },
    { name: 'High Risk', value: 7, color: '#EF4444' },
    { name: 'Critical Risk', value: 3, color: '#7C3AED' }
  ];

  const fraudByType = analytics?.fraud_by_type || [
    { type: 'Online Transfer', count: 42, fraud_rate: '4.2%' },
    { type: 'ATM Withdrawal', count: 28, fraud_rate: '2.8%' },
    { type: 'International POS', count: 35, fraud_rate: '7.5%' },
    { type: 'Crypto Purchase', count: 19, fraud_rate: '11.2%' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="employee" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Reports & AI Analytics" subtitle="Executive Insights, Detection Performance & Loss Prevention Metrics" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Executive Performance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Detection Accuracy"
              value={analytics?.detection_accuracy || "96.4%"}
              subtext="AI Model Accuracy"
              icon={ShieldCheck}
              iconBgColor="bg-emerald-100"
              iconColor="text-emerald-600"
            />
            <MetricCard
              title="False Positive Rate"
              value={analytics?.false_positive_rate || "1.8%"}
              subtext="Low friction"
              icon={Target}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <MetricCard
              title="Avg Inference Time"
              value={analytics?.avg_response_time || "4.2 ms"}
              subtext="Real-time latency"
              icon={Zap}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <MetricCard
              title="Prevented Loss YTD"
              value="₹ 13.23 Lakhs"
              subtext="Saved by BankShield AI"
              icon={TrendingUp}
              iconBgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
          </div>

          {/* Charts Row 1: Fraud Trend + Risk Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monthly Trend Chart (8 Cols) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Fraud Detection & Prevented Losses Over Time</h4>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="prevented_loss" name="Prevented Loss (₹)" stroke="#2563EB" fillOpacity={1} fill="url(#colorFraud)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Breakdown Pie Chart (4 Cols) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Account Risk Distribution</h4>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Fraud by Transaction Type Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base">Fraud Breakdown by Transaction Type</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-y">
                  <tr>
                    <th className="px-6 py-3">Transaction Channel</th>
                    <th className="px-6 py-3">Detected Incident Count</th>
                    <th className="px-6 py-3">Channel Fraud Rate %</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {fraudByType.map((item: any) => (
                    <tr key={item.type} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-slate-900">{item.type}</td>
                      <td className="px-6 py-3 font-bold text-slate-800">{item.count}</td>
                      <td className="px-6 py-3 font-mono font-bold text-blue-600">{item.fraud_rate}</td>
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
