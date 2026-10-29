import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { Phone, Mail, Send, ShieldCheck } from 'lucide-react';

export const CustomerSupportPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'support', text: 'Hello! Welcome to BankShield AI Support. How can we assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const userMsg = input;
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'support',
          text: `Thank you for reaching out regarding "${userMsg}". An AI security specialist has logged ticket #TK-${Math.floor(Math.random() * 9000 + 1000)}.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Support & Help Center" subtitle="24/7 Security support and fraud assistance" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">24/7 Fraud Hotline</h4>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">1800-800-BANK-SHIELD</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Email Security</h4>
                <p className="text-xs text-teal-600 font-semibold mt-0.5">security@bankshield.com</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Report Suspicious Activity</h4>
                <p className="text-xs text-purple-600 font-semibold mt-0.5">Instant Account Freeze</p>
              </div>
            </div>
          </div>

          {/* Live Support Chat Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[480px]">
            <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>
                <div>
                  <h4 className="font-bold text-sm">BankShield Assistant</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold">Online • 24/7 AI Assistance</p>
                </div>
              </div>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl text-sm ${m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your security inquiry or report an issue..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
