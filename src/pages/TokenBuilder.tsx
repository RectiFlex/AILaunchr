import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import TokenBuilderForm from '../components/token/TokenBuilderForm';
import TokenomicsBuilder from '../components/token/TokenomicsBuilder';
import WhitePaperGenerator from '../components/token/WhitePaperGenerator';
import VestingSchedule from '../components/token/VestingSchedule';
import SecurityFeatures from '../components/token/SecurityFeatures';
import TokenManagement from '../components/token/TokenManagement';
import ContractTemplates from '../components/token/ContractTemplates';
import StoredContracts from '../components/token/StoredContracts';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';

const steps = [
  { id: 'token', title: 'Token Configuration', component: TokenBuilderForm },
  { id: 'tokenomics', title: 'Tokenomics', component: TokenomicsBuilder },
  { id: 'vesting', title: 'Vesting Schedule', component: VestingSchedule },
  { id: 'security', title: 'Security Features', component: SecurityFeatures },
  { id: 'whitepaper', title: 'White Paper', component: WhitePaperGenerator },
];

const TokenBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { currentProject } = useCurrentProject();
  const completedSteps = currentProject?.completedSteps || [];
  const hasToken = currentProject?.tokenConfig;

  const CurrentStepComponent = steps[currentStep].component;

  if (hasToken) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Token Management</h1>
              <p className="text-gray-400">Manage and monitor your token</p>
            </div>
            <div className="space-y-8">
              <TokenManagement />
              <StoredContracts />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Token Builder</h1>
            <p className="text-gray-400">Create your token with AI-powered smart contract generation</p>
          </div>

          {/* Contract Templates */}
          <div className="mb-8">
            <ContractTemplates />
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`relative z-10 flex flex-col items-center ${
                      index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      completedSteps.includes(step.id)
                        ? 'bg-purple-600 border-purple-600'
                        : index === currentStep
                        ? 'border-purple-600 bg-black'
                        : 'border-gray-600 bg-black'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white">{index + 1}</span>
                      )}
                    </div>
                    <span className="absolute top-12 text-sm text-gray-400 whitespace-nowrap">
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${
                      index < currentStep ? 'bg-purple-600' : 'bg-gray-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600/10 transition-colors ${
                currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1}
              className={`px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center ${
                currentStep === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TokenBuilder;