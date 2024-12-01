import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    label: string;
    content: React.ReactNode;
    links?: { label: string; url: string }[];
  };
}

const ResourceModal = ({ isOpen, onClose, resource }: ResourceModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 rounded-2xl p-6 w-full max-w-2xl border border-purple-900/20 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{resource.label}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="prose prose-invert max-w-none mb-6">
              {resource.content}
            </div>

            {resource.links && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Related Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resource.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-purple-900/20 transition-colors group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResourceModal;