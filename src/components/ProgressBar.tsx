
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const { t } = useLanguage();

  const getStepName = (step: number) => {
    switch (step) {
      case 1:
        return t('step1');
      case 2:
        return t('step2');
      case 3:
        return t('step3');
      default:
        return `${t('step')} ${step}`;
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    isCompleted ? "bg-ngo-green text-white" : 
                    isActive ? "bg-ngo-dark text-white" : 
                    "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </div>
                <span className="mt-2 text-xs font-medium text-center">
                  {getStepName(stepNumber)}
                </span>
              </div>
              
              {/* Connector line between circles */}
              {stepNumber < totalSteps && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={cn(
                      "h-full",
                      stepNumber < currentStep ? "bg-ngo-green" : "bg-gray-200"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
