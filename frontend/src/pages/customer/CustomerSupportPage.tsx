import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { Phone, Mail, Send, ShieldCheck, HelpCircle, Bot, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface QuickQuestion {
  label: string;
  question: string;
  response: string;
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    label: '🚨 Report Suspicious Charge',
    question: 'I noticed an unrecognized transaction on my account. How do I report it?',
    response: 'If you see an unauthorized transaction, please use our 24/7 Fraud Hotline immediately at 1800-800-BANK-SHIELD or click "Instant Account Freeze". We have logged incident ticket #FRD-9910 for analyst review.'
  },
  {
    label: '📄 KYC Verification Time',
    question: 'How long does KYC document verification take for new account applications?',
    response: 'Our automated AI KYC verification engine processes documents in under 24 hours. You can inspect the step-by-step progress on the "Track Applications" page.'
  },
  {
    label: '❄️ Emergency Account Freeze',
    question: 'How can I temporarily block my account or card?',
    response: 'You can trigger an emergency hold directly from your customer portal under Account Settings, or call our priority security desk at 1800-800-BANK-SHIELD. Account freeze takes effect within 3 seconds.'
  },
  {
    label: '📋 Acceptable KYC Documents',
    question: 'Which documents are valid for identity and address proof?',
    response: 'We accept Aadhaar Card, Passport, Voter ID, or Driving License for identity and address proof. PAN card is compulsory for tax registration.'
  },
  {
    label: '🔐 Account Security Tips',
    question: 'How does BankShield AI safeguard my account against fraud?',
    response: 'BankShield AI monitors 24/7 transaction velocity, device fingerprints, and geolocation anomalies using real-time machine learning inference to block unauthorized access.'
  }
];

export const CustomerSupportPage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'support'; text: string }>>([
    { sender: 'support', text: 'Hello! Welcome to BankShield AI Support. How can we assist you with your account security or application today?' }
  ]);
  const [input, setInput] = useState('');

  const sendQuestion = (userText: string, predefinedResponse?: string) => {
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      let botResponse = predefinedResponse;

      if (!botResponse) {
        const query = userText.toLowerCase();
        if (query.includes('freeze') || query.includes('block') || query.includes('lost')) {
          botResponse = 'For instant emergency account freeze, please dial 1800-800-BANK-SHIELD or verify your identity in the security settings panel.';
        } else if (query.includes('kyc') || query.includes('document') || query.includes('status')) {
          botResponse = 'You can track your submitted KYC applications in real-time under the "Track Applications" menu in your customer dashboard.';
        } else if (query.includes('fraud') || query.includes('unauthorized') || query.includes('suspicious')) {
          botResponse = 'An urgent risk ticket #FRD-' + Math.floor(Math.random() * 9000 + 1000) + ' has been created. Our 24/7 Fraud Monitoring team will call your registered phone within 15 minutes.';
        } else {
          botResponse = `Thank you for reaching out regarding "${userText}". An AI security specialist has logged support ticket #TK-${Math.floor(Math.random() * 9000 + 1000)} for review.`;
        }
      }

      setMessages(prev => [...prev, { sender: 'support', text: botResponse }]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
    setInput('');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Support & Help Center" subtitle="24/7 Security support, FAQs, and AI fraud assistance" />

        <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-5xl mx-auto w-full">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">24/7 Fraud Hotline</h4>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">1800-800-BANK-SHIELD</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Email Security Desk</h4>
                <p className="text-xs text-teal-600 font-semibold mt-0.5">security@bankshield.com</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Report Suspicious Activity</h4>
                <p className="text-xs text-rose-600 font-semibold mt-0.5">Instant Account Lock</p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Help Topics */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Suggested Support Questions</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendQuestion(q.question, q.response)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Support Chat Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">BankShield AI Assistant</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 inline" /> Online • Automated Security Help
                  </p>
                </div>
              </div>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/80">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none leading-relaxed'
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
                placeholder="Type your security question or report an issue..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-md"
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

