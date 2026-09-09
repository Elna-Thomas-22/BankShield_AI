import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  isCompleted
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 text-white" /> : stepNum}
              </div>
              <span
                className={`mt-2 text-xs font-semibold ${
                  isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
