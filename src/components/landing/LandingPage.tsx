import React from 'react';
import { useCareer } from '../../context/CareerContext';
import {
  Sparkles,
  FileText,
  Scan,
  Compass,
  Mic,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  ShieldCheck,
  Award,
  Layers,
  Terminal,
  Cpu,
  Star,
  Github,
  Target,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useCareer();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-zinc-200 dark:border-zinc-800">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Open-Source AI Career & Resume Operating System</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Architect Your Career with{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Intelligent Feedback Loops
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              CareerForge AI replaces fragmented tools with a unified flywheel: ATS Resume Studio with Google XYZ formulas, deep JD Skill Gap Analysis, personalized milestone roadmaps, and real-time AI mock interviews.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('resume-builder')}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Launch Resume Studio
            </button>
            <button
              onClick={() => setActiveTab('ats-scanner')}
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-200 dark:border-zinc-800 shadow-xs transition-all flex items-center gap-2"
            >
              <Scan className="w-4 h-4 text-indigo-500" /> Scan Resume & JD Match
            </button>
            <button
              onClick={() => setActiveTab('mock-interview')}
              className="px-6 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-purple-500" /> AI Mock Interview
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="p-3">
              <div className="text-2xl font-black text-zinc-900 dark:text-white">12,400+</div>
              <div className="text-xs text-zinc-500 font-medium">Engineers Prepped</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">94.2%</div>
              <div className="text-xs text-zinc-500 font-medium">ATS Screen Pass Rate</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">3.4x</div>
              <div className="text-xs text-zinc-500 font-medium">More Interview Invites</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-xs text-zinc-500 font-medium">Free & Open-Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Flywheel Diagram */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            End-To-End Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            The Career Intelligence Flywheel
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
            Traditional tools stop at resume generation. CareerForge connects resume diagnostics directly to skill remediation and mock interviews.
          </p>
        </div>

        {/* 6 Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => setActiveTab('resume-builder')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              1. Resume Studio (XYZ Formula)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Transform generic job bullets into Google-style quantifiable accomplishments: Accomplished [X], measured by [Y], by doing [Z].
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setActiveTab('ats-scanner')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Scan className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              2. ATS Audit & Formatting
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Real-time multi-dimensional ATS health score across parsing structure, high-impact metrics density, and key competencies.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActiveTab('ats-scanner')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              3. JD Match & Skill Gap
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Paste target job postings to uncover matching keywords, missing required skills, and tailored tailoring advice.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => setActiveTab('roadmap')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              4. Adaptive Remediation Track
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Auto-generate custom milestone learning tracks with curated free resources and capstone project ideas to bridge skill gaps.
            </p>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => setActiveTab('mock-interview')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              5. AI Mock Simulator
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Practice turn-by-turn interviews with voice dictation, multi-criteria scoring rubrics, and staff-level model answer benchmarks.
            </p>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => setActiveTab('community')}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs hover:border-indigo-500 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              6. Open-Source Collab Hub
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Team up with fellow developers on ambitious portfolio projects to build verifiable open-source proof of work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 text-white border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Your Career Trajectory?
          </h2>
          <p className="text-sm text-indigo-200 max-w-lg mx-auto">
            Experience the complete CareerForge AI platform. Everything runs client-side with persistent storage and server-side Gemini intelligence.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-8 py-3.5 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm shadow-xl transition-all"
            >
              Open Interactive Dashboard →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
