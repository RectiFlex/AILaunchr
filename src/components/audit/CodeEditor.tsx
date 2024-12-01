import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 placeholder-gray-500 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
      />
      <div className="absolute top-2 right-2 text-xs text-gray-500">
        Solidity
      </div>
    </div>
  );
};

export default CodeEditor;