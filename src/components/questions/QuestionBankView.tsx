import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { QuestionBankItem } from '../../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Code,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
} from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { questionBank, showToast } = useCareer();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'AI & GenAI', 'Full-Stack Web', 'Backend Systems', 'System Design', 'Algorithms'];

  const filteredQuestions = questionBank.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyConcepts.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      q.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 4));

    const matchesDifficulty =
      selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = !prev[id];
      showToast(next ? 'Saved question to your prep list' : 'Removed from saved list', 'info');
      return { ...prev, [id]: next };
    });
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      allRevealed[q.id] = true;
    });
    setRevealedAnswers(allRevealed);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Staff Interview Knowledge Base
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Curated & Verified
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Technical Question Bank & Pitfalls
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Deep-dive technical questions with model architecture answers, code samples, and common candidate anti-patterns.
            </p>
          </div>

          {/* Quick Reveal / Hide All Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={revealAll}
              className="px-3 py-1.5 text-xs font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Reveal All
            </button>
            <button
              onClick={hideAll}
              className="px-3 py-1.5 text-xs font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5" /> Hide All
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, topic, or concept (e.g. 'RAG', 'PostgreSQL', 'Hydration')..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <span className="text-xs font-semibold text-zinc-500">Difficulty:</span>
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedAnswers[q.id];
            const isBookmarked = bookmarkedIds[q.id];

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4 transition-all"
              >
                {/* Top Question Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40">
                        {q.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        {q.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                          : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600'
                      }`}
                      title={isBookmarked ? 'Saved in prep' : 'Save question'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hide Solution
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Reveal Solution
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Key Concepts Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-zinc-400 mr-1">Key Concepts:</span>
                  {q.keyConcepts.map((concept, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-mono"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Collapsible Answer & Pitfalls Pane */}
                {isRevealed && (
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4 animate-in fade-in duration-200 text-xs">
                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                      <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Comprehensive Staff-Level Answer
                      </span>
                      <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
                        {q.detailedAnswer}
                      </p>
                    </div>

                    {/* Code Snippet */}
                    {q.codeSnippet && (
                      <div className="rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-900 text-zinc-100 font-mono text-[11.5px]">
                        <div className="px-3.5 py-1.5 bg-zinc-800/80 text-zinc-400 text-[10px] flex items-center gap-1.5 border-b border-zinc-700">
                          <Code className="w-3 h-3 text-indigo-400" /> Implementation Blueprint
                        </div>
                        <pre className="p-4 overflow-x-auto leading-relaxed">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Common Pitfalls Callout */}
                    {q.commonPitfalls.length > 0 && (
                      <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
                        <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-500" /> ⚠️ Common Interview Pitfalls & Anti-Patterns:
                        </span>
                        <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
                          {q.commonPitfalls.map((pitfall, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{pitfall}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-12 rounded-2xl text-center space-y-2">
              <Search className="w-10 h-10 mx-auto text-zinc-400 opacity-50" />
              <h3 className="font-bold text-zinc-900 dark:text-white">No questions found</h3>
              <p className="text-xs text-zinc-500">Try adjusting your keyword filter or difficulty selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
