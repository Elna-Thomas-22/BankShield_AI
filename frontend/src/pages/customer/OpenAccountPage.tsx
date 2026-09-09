import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { Stepper } from '../../components/Stepper';
import { PiggyBank, Wallet, Landmark, Users, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { apiClient } from '../../api/client';

export const OpenAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAccountType, setSelectedAccountType] = useState('Savings Account');
  const [loading, setLoading] = useState(false);
  const [successAppRef, setSuccessAppRef] = useState<string | null>(null);

  // Form step data
  const [formData, setFormData] = useState({
    fullName: 'Rajesh Kumar',
    email: 'example@gmail.com',
    phone: '+91 98765 43210',
    dob: '1990-08-15',
    pan: 'ABCDE1234F',
    address: '402 Green Meadows, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400050'
  });

  const accountTypes = [
    {
      title: 'Savings Account',
      description: 'Earn interest on your savings with easy access to your money whenever you need it.',
      icon: PiggyBank,
      badge: 'Popular',
      color: 'border-blue-600 bg-blue-50/50',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Current Account',
      description: 'Ideal for businesses & professionals with higher transaction limits and zero restrictions.',
      icon: Wallet,
      badge: 'Business',
      color: 'border-emerald-600 bg-emerald-50/50',
      iconBg: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Fixed Deposit',
      description: 'Grow your savings with high guaranteed fixed returns on your term deposit.',
      icon: Landmark,
      badge: 'High Yield',
      color: 'border-amber-600 bg-amber-50/50',
      iconBg: 'bg-amber-100 text-amber-600'
    },
    {
      title: 'NRI Account',
      description: 'Specialized banking features & foreign exchange benefits for Non-Resident Indians.',
      icon: Users,
      badge: 'Global',
      color: 'border-purple-600 bg-purple-50/50',
      iconBg: 'bg-purple-100 text-purple-600'
    }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post('/customer/applications', {
        account_type: selectedAccountType,
        personal_details: {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          pan: formData.pan
        },
        address_details: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        }
      });
      setSuccessAppRef(res.data.reference_no);
    } catch (err) {
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar portal="customer" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Open New Account" subtitle="Choose your account type and fill in details to get started" />

        <main className="p-8 max-w-4xl mx-auto w-full space-y-8 flex-1 overflow-y-auto">
          {/* Stepper matching Figma node 26-250 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <Stepper
              currentStep={currentStep}
              steps={['Select Account Type', 'Personal Details', 'Address Details', 'Review & Confirm']}
            />
          </div>

          {/* Success Application Dialog */}
          {successAppRef ? (
            <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-lg text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your application for <span className="font-semibold text-slate-900">{selectedAccountType}</span> has been created with reference number:
              </p>
              <div className="bg-slate-100 p-3 rounded-xl font-mono font-bold text-lg text-blue-700 tracking-wider inline-block">
                {successAppRef}
              </div>
              <p className="text-xs text-slate-500">Please proceed to upload your KYC verification documents now.</p>
              
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate('/customer/upload-kyc')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 text-sm flex items-center gap-2"
                >
                  Proceed to Upload KYC &rarr;
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Select Account Type matching Figma node 26-250 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-900">1. Select Account Type</h3>
                    <p className="text-xs text-slate-500">Choose the bank account option that fits your banking requirements.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {accountTypes.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedAccountType === item.title;

                      return (
                        <div
                          key={item.title}
                          onClick={() => setSelectedAccountType(item.title)}
                          className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-100'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <input
                              type="radio"
                              name="accountType"
                              checked={isSelected}
                              onChange={() => setSelectedAccountType(item.title)}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                          </div>

                          <div className="mt-4">
                            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                              {item.title}
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border">
                                {item.badge}
                              </span>
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {currentStep === 2 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">2. Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Mobile Phone *</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">PAN Card Number *</label>
                      <input
                        type="text"
                        value={formData.pan}
                        onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm uppercase font-mono tracking-wider focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Address Details */}
              {currentStep === 3 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">3. Address Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Street Address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">City *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">State *</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Pincode *</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {currentStep === 4 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">4. Review Application Summary</h3>
                  <div className="space-y-4 text-sm divide-y">
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500 font-medium">Selected Account Type</span>
                      <span className="font-bold text-blue-600">{selectedAccountType}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500 font-medium">Applicant Name</span>
                      <span className="font-semibold text-slate-900">{formData.fullName}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500 font-medium">Contact Email</span>
                      <span className="font-semibold text-slate-900">{formData.email}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500 font-medium">PAN Card</span>
                      <span className="font-mono font-semibold text-slate-900">{formData.pan}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500 font-medium">Address</span>
                      <span className="font-semibold text-slate-900">{formData.address}, {formData.city}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stepper Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 disabled:opacity-40 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
