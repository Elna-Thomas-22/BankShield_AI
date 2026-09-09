import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PortalSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col justify-between font-sans">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-navy-900/80 backdrop-blur px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              BankShield <span className="text-blue-400 text-xs px-2 py-0.5 rounded bg-blue-500/20 font-semibold border border-blue-400/30">AI</span>
            </h1>
            <p className="text-xs text-slate-400">Intelligent Bank Account Fraud Detection & Management Platform</p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          v1.0 Production Ready
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center items-center">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Choose Your Portal
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Select your destination portal below to manage your banking experience or conduct intelligent AI fraud assessments.
          </p>
        </div>

        {/* Dual Portal Selection Matrix matching Figma node 25-52 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Customer Portal Card */}
          <div
            onClick={() => navigate('/customer/login')}
            className="group relative bg-slate-900/90 rounded-2xl p-8 border border-slate-800 hover:border-blue-500/60 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Customer Portal
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Apply for accounts, submit documents, track applications and manage your bank portfolio securely.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Open a new bank account',
                  'Track application status',
                  'Upload KYC verification documents',
                  'View account balances & portfolio'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
              <span>Continue as Customer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Employee Portal Card */}
          <div
            onClick={() => navigate('/employee/login')}
            className="group relative bg-slate-900/90 rounded-2xl p-8 border border-slate-800 hover:border-teal-500/60 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-600/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                Employee Portal
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Review new applications, perform AI risk assessment, manage fraud alerts and generate executive reports.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Review new account applications',
                  'Run AI Fraud Risk Assessment',
                  'Manage suspicious alerts & cases',
                  'View real-time analytics & reports'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-sm font-semibold text-teal-400 group-hover:text-teal-300">
              <span>Continue as Employee</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        BankShield AI &copy; 2026. Bank Account Fraud Detection and Management Platform.
      </footer>
    </div>
  );
};
