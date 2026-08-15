import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { MilestoneItem, MilestoneStatus, RoadmapTrack } from '../../types';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  FolderGit2,
  ExternalLink,
  ChevronRight,
  Award,
  Layers,
  Flame,
  Plus,
  Play,
  Check,
  Search,
  Zap,
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { roadmaps, activeRoadmapId, setActiveRoadmapId, toggleMilestoneStatus, userProfile, triggerCelebration, showToast } = useCareer();
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'mastered' | 'not-started'>('all');

  const currentTrack: RoadmapTrack =
    roadmaps.find((r) => r.id === activeRoadmapId) || roadmaps[0];

  const totalMilestones = currentTrack.milestones.length;
  const masteredCount = currentTrack.milestones.filter((m) => m.status === 'mastered').length;
  const inProgressCount = currentTrack.milestones.filter((m) => m.status === 'in-progress').length;
  const progressPercent = totalMilestones > 0 ? Math.round((masteredCount / totalMilestones) * 100) : 0;

  const filteredMilestones = currentTrack.milestones.filter((m) => {
    if (statusFilter === 'all') return true;
    return m.status === statusFilter;
  });

  const getDifficultyBadge = (difficulty: MilestoneItem['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Play className="w-3 h-3 fill-current" /> In Progress
          </span>
        );
      case 'not-started':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Career Progression Tree
              </span>
              {currentTrack.isCustom && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Target JD Remediation
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              {currentTrack.title}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {currentTrack.description}
            </p>
          </div>

          {/* Track Progress Metric Widget */}
          <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-3 border-indigo-600">
              <span className="text-lg font-extrabold text-zinc-900 dark:text-white">{progressPercent}%</span>
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">
                {masteredCount} of {totalMilestones} Mastered
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">
                {inProgressCount} currently in progress
              </div>
              <div className="w-28 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 mt-1.5 overflow-hidden">
                <div style={{ width: `${progressPercent}%` }} className="h-full bg-indigo-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Selector Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {roadmaps.map((track) => {
            const isSelected = track.id === currentTrack.id;
            const completed = track.milestones.filter((m) => m.status === 'mastered').length;
            const pct = Math.round((completed / track.milestones.length) * 100);

            return (
              <button
                key={track.id}
                onClick={() => {
                  setActiveRoadmapId(track.id);
                  setSelectedMilestone(null);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold">{track.title}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-zinc-400'}`}>
                    {pct}% completed • {track.estimatedWeeks} weeks
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filters and List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Milestone Timeline List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">
                Milestones ({filteredMilestones.length})
              </span>
              <div className="flex items-center gap-1.5">
                {(['all', 'in-progress', 'mastered', 'not-started'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setStatusFilter(filterKey)}
                    className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                      statusFilter === filterKey
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {filterKey.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Progression Tree Nodes */}
            <div className="space-y-4 relative">
              {filteredMilestones.map((milestone, idx) => {
                const isSelected = selectedMilestone?.id === milestone.id;

                return (
                  <div
                    key={milestone.id}
                    onClick={() => setSelectedMilestone(milestone)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMilestoneStatus(currentTrack.id, milestone.id);
                          }}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110 ${
                            milestone.status === 'mastered'
                              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                              : milestone.status === 'in-progress'
                              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-300 dark:border-zinc-700'
                          }`}
                          title="Click to toggle status (Not Started -> In Progress -> Mastered)"
                        >
                          {milestone.status === 'mastered' ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{idx + 1}</span>
                          )}
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white">
                              {milestone.title}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getDifficultyBadge(milestone.difficulty)}`}>
                              {milestone.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {getStatusBadge(milestone.status)}
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>

                    {/* Footer tags */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-500" /> ~{milestone.estimatedHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-purple-500" /> {milestone.resources.length} Free Resources
                      </span>
                      <span className="flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3 text-emerald-500" /> 1 Milestone Project
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Deep-Dive Drawer (5 cols) */}
          <div className="lg:col-span-5">
            {selectedMilestone ? (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-5 sticky top-20 animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getDifficultyBadge(selectedMilestone.difficulty)}`}>
                      {selectedMilestone.difficulty} Level
                    </span>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-white mt-1.5">
                      {selectedMilestone.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleMilestoneStatus(currentTrack.id, selectedMilestone.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedMilestone.status === 'mastered'
                        ? 'bg-emerald-600 text-white'
                        : selectedMilestone.status === 'in-progress'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {selectedMilestone.status === 'mastered'
                      ? 'Mastered'
                      : selectedMilestone.status === 'in-progress'
                      ? 'In Progress'
                      : 'Mark Active'}
                  </button>
                </div>

                {/* Why Learn It */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                    💡 Why Learn This?
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedMilestone.whyLearn}
                  </p>
                </div>

                {/* Curated Free Resources */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Curated Free Resources
                  </h4>
                  <div className="space-y-2">
                    {selectedMilestone.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 bg-zinc-50 dark:bg-zinc-800/40 text-xs group transition-all"
                      >
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {res.title}
                          </div>
                          <span className="text-[10px] text-zinc-400 uppercase font-mono">{res.type} • 100% Free</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-500" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Milestone Project Idea */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                    <FolderGit2 className="w-4 h-4 text-emerald-500" />
                    <span>Capstone Project: {selectedMilestone.projectIdea.title}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {selectedMilestone.projectIdea.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-zinc-400 block mb-1">Skills Applied:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedMilestone.projectIdea.skillsApplied.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-12 rounded-2xl text-center space-y-3 sticky top-20">
                <Compass className="w-12 h-12 text-indigo-500 mx-auto opacity-50" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Select a Milestone Node</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Click on any milestone from the timeline on the left to inspect learning rationale, free resources, and capstone project ideas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
