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
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Play,
  Zap,
  Target,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    resumeData,
    atsAnalysis,
    roadmaps,
    activeRoadmapId,
    mockSessions,
    setActiveTab,
    triggerCelebration,
  } = useCareer();

  const activeRoadmap = roadmaps.find((r) => r.id === activeRoadmapId) || roadmaps[0];
  const completedMilestones = activeRoadmap.milestones.filter((m) => m.status === 'mastered').length;
  const roadmapPct = Math.round((completedMilestones / activeRoadmap.milestones.length) * 100);
  const nextMilestone = activeRoadmap.milestones.find((m) => m.status !== 'mastered') || activeRoadmap.milestones[0];

  const latestMock = mockSessions[mockSessions.length - 1];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome & Career Readiness Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Decorative glow background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Career Operating System Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {userProfile.name.split(' ')[0]}!
              </h1>
              <p className="text-sm text-indigo-100/90 max-w-xl leading-relaxed">
                Targeting <strong className="text-white">{userProfile.targetRole}</strong> at top tier engineering teams. Your profile is ranked in the top 8% of candidates.
              </p>
            </div>

            {/* Readiness Score Big Widget */}
            <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shrink-0">
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white/10 border-4 border-emerald-400 shadow-lg">
                <div className="text-center">
                  <span className="text-2xl font-black text-white">{userProfile.readinessScore}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider block">
                  Readiness Level
                </span>
                <span className="text-base font-bold text-white block">Interview Ready</span>
                <span className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +14% this month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Career Intelligence Loop - Interactive Workflow Banner */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                The Career Intelligence Loop
              </h2>
            </div>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              Integrated end-to-end preparation flywheel
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                step: '1. Resume',
                desc: 'XYZ Formula',
                tab: 'resume-builder',
                icon: <FileText className="w-4 h-4 text-indigo-500" />,
                active: true,
              },
              {
                step: '2. ATS Scan',
                desc: `${atsAnalysis ? atsAnalysis.aggregateScore : 88}% Score`,
                tab: 'ats-scanner',
                icon: <Scan className="w-4 h-4 text-purple-500" />,
                active: true,
              },
              {
                step: '3. Skill Gap',
                desc: 'JD Matcher',
                tab: 'ats-scanner',
                icon: <Target className="w-4 h-4 text-pink-500" />,
                active: true,
              },
              {
                step: '4. Roadmap',
                desc: `${roadmapPct}% Mastered`,
                tab: 'roadmap',
                icon: <Compass className="w-4 h-4 text-emerald-500" />,
                active: true,
              },
              {
                step: '5. Mock AI',
                desc: 'Turn-by-Turn',
                tab: 'mock-interview',
                icon: <Mic className="w-4 h-4 text-amber-500" />,
                active: true,
              },
              {
                step: '6. Collab Hub',
                desc: 'Peer Network',
                tab: 'community',
                icon: <Users className="w-4 h-4 text-blue-500" />,
                active: true,
              },
            ].map((node, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(node.tab as any)}
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 hover:border-indigo-500/60 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  {node.icon}
                  <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-xs text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {node.step}
                </div>
                <div className="text-[11px] text-zinc-500">{node.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Core Pillars 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Resume Builder & ATS Health */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      Resume & ATS Health
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {resumeData.personalInfo.fullName} • {resumeData.experience.length} Positions
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {atsAnalysis ? atsAnalysis.aggregateScore : 88}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">/100 ATS Score</span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Resume is formatted with Google XYZ bullet enhancements. {atsAnalysis?.strengths.length || 3} key strengths detected with high parseability.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60">
                  <span className="text-zinc-500 block text-[10px]">Skills Match</span>
                  <span className="font-bold text-emerald-600">92% High</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60">
                  <span className="text-zinc-500 block text-[10px]">Format Standard</span>
                  <span className="font-bold text-indigo-600">ATS Optimized</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('resume-builder')}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> Edit Resume
              </button>
              <button
                onClick={() => setActiveTab('ats-scanner')}
                className="py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
              >
                <Scan className="w-3.5 h-3.5" /> Scan JD
              </button>
            </div>
          </div>

          {/* Pillar 2: Active Career Roadmap Progress */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      Active Learning Track
                    </h3>
                    <span className="text-xs text-zinc-500">{activeRoadmap.title}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400">
                    {roadmapPct}%
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">Mastered</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  style={{ width: `${roadmapPct}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                />
              </div>

              {/* Next Milestone Callout */}
              {nextMilestone && (
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-0.5">
                    Next Up: {nextMilestone.title}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-1">
                    {nextMilestone.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                {completedMilestones}/{activeRoadmap.milestones.length} milestones complete
              </span>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Continue Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: AI Mock Interview Simulator */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      AI Mock Interview Simulator
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {userProfile.mockInterviewsCount} Sessions Conducted
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Practice technical architectural scenarios, trade-off questions, and behavioral inquiries evaluated by Google Gemini models.
              </p>

              {latestMock && (
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 text-xs">
                  <span className="text-zinc-500 block text-[10px]">Latest Session Score</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {latestMock.overallScore}/10 ({latestMock.field} • {latestMock.level})
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setActiveTab('mock-interview')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Start AI Mock Session
              </button>
            </div>
          </div>

          {/* Pillar 4: Question Bank & Open Source Collabs */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      Staff Prep Bank & Collabs
                    </h3>
                    <span className="text-xs text-zinc-500">Curated questions & team projects</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Review verified solutions to tricky concurrency, caching, and RAG evaluation problems, or join an open-source collaboration team.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  onClick={() => setActiveTab('question-bank')}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 cursor-pointer hover:border-emerald-500/50"
                >
                  <span className="font-bold text-zinc-900 dark:text-white block mb-0.5">
                    Question Bank
                  </span>
                  <span className="text-[11px] text-zinc-500">Review Flashcards →</span>
                </div>
                <div
                  onClick={() => setActiveTab('community')}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 cursor-pointer hover:border-emerald-500/50"
                >
                  <span className="font-bold text-zinc-900 dark:text-white block mb-0.5">
                    Collab Teams
                  </span>
                  <span className="text-[11px] text-zinc-500">Find Projects →</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end">
              <button
                onClick={() => setActiveTab('community')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Explore Community Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
