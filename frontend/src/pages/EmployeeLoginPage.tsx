import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Building2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EmployeeLoginPage: React.FC = () => {
  const [email, setEmail] = useState('employee@bankshield.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password, portal: 'employee' });
      navigate('/employee/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid employee credentials. Try employee@bankshield.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tech-pattern flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-slate-100">
        {/* Navy Header with Teal Accent */}
        <div className="bg-navy-900 text-white p-8 text-center relative pt-10 pb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <ShieldCheck className="w-7 h-7 text-teal-400" />
            <h1 className="text-2xl font-bold tracking-tight">BankShield <span className="text-teal-400 text-xs px-2 py-0.5 rounded bg-teal-500/20">AI</span></h1>
          </div>
          <p className="text-xs text-slate-400">Employee & Fraud Analyst Portal</p>

          {/* Floating Building Badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-teal-600 border-4 border-white flex items-center justify-center shadow-lg text-white">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Login Form Body */}
        <div className="p-8 pt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Employee Authentication</h2>
            <p className="text-xs text-slate-500 mt-1">Sign in with employee credentials to access risk tools</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Work Email *
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@bankshield.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Verifying Credentials...' : 'Sign In to Employee Portal'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Customer?{' '}
            <button
              onClick={() => navigate('/customer/login')}
              className="text-blue-600 font-bold hover:underline"
            >
              Customer Portal Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
