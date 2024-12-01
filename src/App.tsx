import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from './lib/web3';
import { AIProvider } from './lib/ai/AIContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TokenBuilder from './pages/TokenBuilder';
import SmartContractAuditor from './pages/SmartContractAuditor';
import ProjectManager from './pages/ProjectManager';
import Launch from './pages/Launch';
import Community from './pages/Community';
import ProtectedRoute from './components/ProtectedRoute';
import ApplyForm from './components/ApplyForm';
import WalletApproval from './components/WalletApproval';
import ProjectContext from './components/ProjectContext';
import AIAssistant from './components/ai/AIAssistant';

function App() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <AIProvider>
          <Router>
            <main className="min-h-screen bg-black text-white">
              <WalletApproval />
              <ProjectContext />
              <Navbar onAIAssistantToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)} />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/apply" element={<ApplyForm />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/token-builder" element={
                  <ProtectedRoute>
                    <TokenBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/smart-contract-auditor" element={
                  <ProtectedRoute>
                    <SmartContractAuditor />
                  </ProtectedRoute>
                } />
                <Route path="/project-manager" element={
                  <ProtectedRoute>
                    <ProjectManager />
                  </ProtectedRoute>
                } />
                <Route path="/launch" element={
                  <ProtectedRoute>
                    <Launch />
                  </ProtectedRoute>
                } />
                <Route path="/community" element={<Community />} />
              </Routes>
              <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
            </main>
          </Router>
        </AIProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;