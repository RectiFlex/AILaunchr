import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, Code2, FileCode2, Upload, Loader } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAIContext } from '../lib/ai/AIContext';
import { useCurrentProject } from '../lib/hooks/useCurrentProject';
import AuditResults from '../components/audit/AuditResults';
import CodeEditor from '../components/audit/CodeEditor';
import ContractSelector from '../components/audit/ContractSelector';

const SmartContractAuditor = () => {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { analyzeCode } = useAIContext();
  const { currentProject, markStepComplete } = useCurrentProject();

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeCode(code);
      setResults(analysis);
      
      if (currentProject) {
        markStepComplete('Smart Contract Audit', 'audit');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze contract. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Smart Contract Auditor</h1>
            <p className="text-gray-400">AI-powered smart contract analysis and security auditing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Input Section */}
            <div className="space-y-8">
              {currentProject && <ContractSelector onSelect={(code) => setCode(code)} />}
              
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-purple-500" />
                  Contract Code
                </h2>
                <div className="space-y-4">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    placeholder="Paste your smart contract code here..."
                  />
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !code.trim()}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Start Audit
                        </>
                      )}
                    </Button>
                    <label className="flex-shrink-0">
                      <input
                        type="file"
                        accept=".sol,.json,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button variant="outline" as="span">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </label>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Analysis Results */}
            <div className="space-y-8">
              {results && <AuditResults results={results} />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartContractAuditor;