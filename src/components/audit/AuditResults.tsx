import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface Vulnerability {
  severity: 'high' | 'medium' | 'low';
  description: string;
  location?: string;
  recommendation: string;
}

interface Optimization {
  type: string;
  description: string;
  impact: string;
  recommendation: string;
}

interface AuditResultsProps {
  results: {
    vulnerabilities: Vulnerability[];
    optimizations: Optimization[];
    score: number;
  };
}

const AuditResults: React.FC<AuditResultsProps> = ({ results }) => {
  if (!results) return null;

  const { vulnerabilities = [], optimizations = [], score = 0 } = results;

  return (
    <>
      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Security Score</h3>
          <div className="text-4xl font-bold text-purple-500 mb-2">{score}%</div>
          <div className={`text-sm ${
            score >= 90 ? 'text-green-500' :
            score >= 70 ? 'text-yellow-500' :
            'text-red-500'
          }`}>
            {score >= 90 ? 'Excellent' :
             score >= 70 ? 'Good' :
             'Needs Improvement'}
          </div>
        </div>
      </motion.div>

      {/* Vulnerabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
          Vulnerabilities
        </h2>
        <div className="space-y-4">
          {vulnerabilities.length === 0 ? (
            <div className="text-center py-4 text-gray-400">
              No vulnerabilities detected
            </div>
          ) : (
            vulnerabilities.map((issue, index) => (
              <div
                key={index}
                className={`p-4 bg-black/30 rounded-lg border ${
                  issue.severity === 'high' ? 'border-red-500/20' :
                  issue.severity === 'medium' ? 'border-yellow-500/20' :
                  'border-blue-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${
                    issue.severity === 'high' ? 'text-red-500' :
                    issue.severity === 'medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`}>{issue.description}</span>
                  <span className="text-sm text-gray-400 capitalize">{issue.severity} Risk</span>
                </div>
                {issue.location && (
                  <div className="text-sm text-gray-400 mb-2">
                    Location: {issue.location}
                  </div>
                )}
                <div className="text-sm text-gray-300">
                  {issue.recommendation}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Optimizations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
      >
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-green-500" />
          Optimization Suggestions
        </h2>
        <div className="space-y-4">
          {optimizations.length === 0 ? (
            <div className="text-center py-4 text-gray-400">
              No optimization suggestions found
            </div>
          ) : (
            optimizations.map((opt, index) => (
              <div
                key={index}
                className="p-4 bg-black/30 rounded-lg border border-green-500/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-green-500">{opt.type}</span>
                  <span className="text-sm text-gray-400">Impact: {opt.impact}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{opt.description}</p>
                <p className="text-sm text-gray-400">{opt.recommendation}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AuditResults;