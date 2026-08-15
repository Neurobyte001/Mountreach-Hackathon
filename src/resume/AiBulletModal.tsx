import React, { useState, useEffect } from 'react';
import { requestEnhanceBullet, EnhanceBulletResponse } from '../../services/api';
import { Sparkles, Check, Copy, ArrowRight, Loader2, X, RefreshCw, Layers } from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

interface AiBulletModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalBullet: string;
  role?: string;
  techStack?: string[];
  onApply: (enhancedText: string) => void;
}

export const AiBulletModal: React.FC<AiBulletModalProps> = ({
  isOpen,
  onClose,
  originalBullet,
  role,
  techStack,
  onApply,
}) => {
  const { showToast } = useCareer();
  const [loading, setLoading] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhanceBulletResponse | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchEnhancement = async () => {
    if (!originalBullet.trim()) return;
    setLoading(true);
    try {
      const res = await requestEnhanceBullet(originalBullet, role, techStack);
      setEnhancedResult(res);
      setSelectedText(res.enhancedBullet);
    } catch (err) {
      console.error('Bullet enhancement error:', err);
      showToast('Could not enhance bullet with AI', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && originalBullet) {
      fetchEnhancement();
    }
  }, [isOpen, originalBullet]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    showToast('Copied enhanced bullet to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApply(selectedText);
    showToast('Enhanced bullet applied to resume!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                AI Bullet Enhancer
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  XYZ Impact Formula
                </span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Transform weak job descriptions into quantifiable metrics-driven achievements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Original Text Box */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Original Input</div>
            <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-sm text-zinc-700 dark:text-zinc-300">
              {originalBullet || '(Empty bullet)'}
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Synthesizing impact metrics & XYZ formula structure...
              </p>
            </div>
          ) : enhancedResult ? (
            <>
              {/* Formula Breakdown Breakdown */}
              <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase tracking-wide">
                  <Layers className="w-3.5 h-3.5" /> Formula Architecture: Accomplished [X] by [Y], doing [Z]
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">[X] Action Verb:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {enhancedResult.xyzFormulaBreakdown.action || 'Architected and optimized'}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">[Y] Quantified Metric:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {enhancedResult.xyzFormulaBreakdown.metric || 'Reduced latency by 35%'}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">[Z] Context / Tech:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {enhancedResult.xyzFormulaBreakdown.context || 'Applied asynchronous worker pipelines'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Active Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                    Active High-Impact Bullet (Editable)
                  </span>
                  <button
                    onClick={fetchEnhancement}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-indigo-300 dark:border-indigo-700/80 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Alternative Variations */}
              {enhancedResult.alternativeVariations.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Alternative Variations (Click to select)
                  </div>
                  <div className="space-y-2">
                    {enhancedResult.alternativeVariations.map((alt, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedText(alt)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          selectedText === alt
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-medium'
                            : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
                        }`}
                      >
                        <span>{alt}</span>
                        {selectedText === alt && (
                          <span className="p-1 rounded-full bg-indigo-600 text-white shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!selectedText}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedText}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              Apply to Resume <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
