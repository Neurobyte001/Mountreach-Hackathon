import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { TemplateType } from '../../types';
import {
  Sparkles,
  Printer,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Check,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Wrench,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
} from 'lucide-react';
import { AtsCleanTemplate } from './templates/AtsCleanTemplate';
import { ModernTechTemplate } from './templates/ModernTechTemplate';
import { MinimalExecutiveTemplate } from './templates/MinimalExecutiveTemplate';
import { ProfessionalPolishTemplate } from './templates/ProfessionalPolishTemplate';
import { AiBulletModal } from './AiBulletModal';

type EditorTab = 'personal' | 'skills' | 'experience' | 'projects' | 'education';

export const ResumeBuilderView: React.FC = () => {
  const {
    resumeData,
    setResumeData,
    activeTemplate,
    setActiveTemplate,
    updatePersonalInfo,
    updateSkillCategory,
    addSkillCategory,
    removeSkillCategory,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addEducation,
    updateEducation,
    removeEducation,
    loadResumePreset,
    showToast,
  } = useCareer();

  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('personal');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({});
  const [newCategoryName, setNewCategoryName] = useState('');

  // AI Bullet modal state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeBulletTarget, setActiveBulletTarget] = useState<{
    section: 'experience' | 'project';
    id: string;
    bulletIndex: number;
    text: string;
    role?: string;
    techStack?: string[];
  } | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${(resumeData.personalInfo.fullName || 'careerforge').toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    showToast('Resume JSON exported successfully', 'success');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && parsed.skills) {
          setResumeData(parsed);
          showToast('Resume data imported successfully!', 'success');
        } else {
          showToast('Invalid resume JSON format', 'error');
        }
      } catch {
        showToast('Error reading JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const openAiEnhancer = (
    section: 'experience' | 'project',
    id: string,
    bulletIndex: number,
    text: string,
    role?: string,
    techStack?: string[]
  ) => {
    setActiveBulletTarget({ section, id, bulletIndex, text, role, techStack });
    setAiModalOpen(true);
  };

  const applyEnhancedBullet = (enhancedText: string) => {
    if (!activeBulletTarget) return;
    const { section, id, bulletIndex } = activeBulletTarget;

    if (section === 'experience') {
      const exp = resumeData.experience.find((e) => e.id === id);
      if (exp) {
        const bullets = [...exp.bullets];
        bullets[bulletIndex] = enhancedText;
        updateExperience(id, { bullets });
      }
    } else if (section === 'project') {
      const proj = resumeData.projects.find((p) => p.id === id);
      if (proj) {
        const bullets = [...proj.bullets];
        bullets[bulletIndex] = enhancedText;
        updateProject(id, { bullets });
      }
    }
  };

  const editorTabs: Array<{ id: EditorTab; label: string; icon: React.ReactNode }> = [
    { id: 'personal', label: 'Personal & Links', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Technical Skills', icon: <Wrench className="w-4 h-4" /> },
    { id: 'experience', label: 'Work Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Featured Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const templates: Array<{ id: TemplateType; label: string; desc: string }> = [
    { id: 'professional-polish', label: 'Professional Polish ✨', desc: 'Sleek executive layout with verified metrics & competencies' },
    { id: 'ats-clean', label: 'ATS Clean', desc: 'Standard single-column, 100% parseable' },
    { id: 'modern-tech', label: 'Modern Tech', desc: 'Indigo accent badges & layout' },
    { id: 'minimal-executive', label: 'Minimal Executive', desc: 'Serif elegance & leadership structure' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Controls Toolbar */}
      <div className="max-w-7xl mx-auto mb-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Interactive Resume Studio
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time preview with built-in Google XYZ Formula AI bullet enhancer
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset selector */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-[11px] font-semibold text-zinc-500 px-2">Presets:</span>
            <button
              onClick={() => loadResumePreset('alex-aiml')}
              className="text-xs px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-all"
            >
              AI/ML
            </button>
            <button
              onClick={() => loadResumePreset('fullstack-senior')}
              className="text-xs px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-all"
            >
              Full-Stack
            </button>
            <button
              onClick={() => loadResumePreset('blank')}
              className="text-xs px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-all"
            >
              Blank
            </button>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Upload className="w-3.5 h-3.5 text-indigo-500" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" /> Export JSON
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-Step Editor Form (5 cols) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col space-y-4">
          {/* Step Navigation Tabs */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-1.5 shadow-xs flex items-center justify-between overflow-x-auto gap-1">
            {editorTabs.map((tab) => {
              const isActive = activeEditorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveEditorTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex-1 min-h-[600px] overflow-y-auto">
            {/* 1. PERSONAL INFO TAB */}
            {activeEditorTab === 'personal' && (
              <div className="space-y-4 animate-in fade-in duration-200 text-sm">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">Personal Information</h3>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Alex Rivera"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Headline / Target Title</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.headline}
                    onChange={(e) => updatePersonalInfo('headline', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Senior Full-Stack & AI Systems Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="alex.rivera@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="+1 (415) 892-4190"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="San Francisco, CA (Open to Remote)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Portfolio / Website</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.website || ''}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="https://alexrivera.dev"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.github || ''}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="https://github.com/alexrivera-ai"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="https://linkedin.com/in/alexrivera-ai"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Professional Summary
                    </label>
                    <span className="text-[10px] text-zinc-400">Aim for 3-4 high impact lines</span>
                  </div>
                  <textarea
                    rows={4}
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Full-Stack Software Engineer with 4+ years of experience..."
                  />
                </div>
              </div>
            )}

            {/* 2. TECHNICAL SKILLS TAB */}
            {activeEditorTab === 'skills' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Technical Skills Taxonomy</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New Category (e.g. Cloud)"
                      className="px-2.5 py-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                    <button
                      onClick={() => {
                        addSkillCategory(newCategoryName);
                        setNewCategoryName('');
                      }}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {resumeData.skills.map((category, catIdx) => (
                    <div key={catIdx} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {category.category}
                        </span>
                        <button
                          onClick={() => removeSkillCategory(catIdx)}
                          className="text-zinc-400 hover:text-rose-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200"
                          >
                            {skill}
                            <button
                              onClick={() => {
                                const newSkills = category.skills.filter((_, i) => i !== sIdx);
                                updateSkillCategory(catIdx, newSkills);
                              }}
                              className="text-zinc-400 hover:text-rose-500 ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add skill pill */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newSkillInputs[catIdx] || ''}
                          onChange={(e) =>
                            setNewSkillInputs({ ...newSkillInputs, [catIdx]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newSkillInputs[catIdx]?.trim()) {
                              e.preventDefault();
                              updateSkillCategory(catIdx, [...category.skills, newSkillInputs[catIdx].trim()]);
                              setNewSkillInputs({ ...newSkillInputs, [catIdx]: '' });
                            }
                          }}
                          placeholder="Type skill & hit enter..."
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                        />
                        <button
                          onClick={() => {
                            if (newSkillInputs[catIdx]?.trim()) {
                              updateSkillCategory(catIdx, [...category.skills, newSkillInputs[catIdx].trim()]);
                              setNewSkillInputs({ ...newSkillInputs, [catIdx]: '' });
                            }
                          }}
                          className="text-xs px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium"
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. WORK EXPERIENCE TAB */}
            {activeEditorTab === 'experience' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Work Experience</h3>
                  <button
                    onClick={() => {
                      addExperience({
                        id: 'exp-' + Date.now(),
                        company: 'New Company Inc.',
                        role: 'Software Engineer',
                        location: 'San Francisco, CA',
                        startDate: '2023-01',
                        endDate: 'Present',
                        isCurrent: true,
                        techStack: ['TypeScript', 'React', 'Node.js'],
                        bullets: ['Spearheaded engineering initiatives improving system performance by 30%.'],
                      });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Experience
                  </button>
                </div>

                <div className="space-y-6">
                  {resumeData.experience.map((exp, expIdx) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Position #{expIdx + 1}
                        </span>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            placeholder="2022-01"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                            placeholder="Present"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                            placeholder="San Francisco, CA"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      </div>

                      {/* Bullets with in-line AI XYZ Enhancer */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Bullet Points (Impact & XYZ Formula)
                          </label>
                          <button
                            onClick={() => {
                              const bullets = [...exp.bullets, 'Engineered high-performance services boosting productivity.'];
                              updateExperience(exp.id, { bullets });
                            }}
                            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Plus className="w-3 h-3" /> Add Bullet
                          </button>
                        </div>

                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => {
                                  const bullets = [...exp.bullets];
                                  bullets[bIdx] = e.target.value;
                                  updateExperience(exp.id, { bullets });
                                }}
                                className="flex-1 p-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                              />
                              <button
                                onClick={() => {
                                  const bullets = exp.bullets.filter((_, i) => i !== bIdx);
                                  updateExperience(exp.id, { bullets });
                                }}
                                className="p-1.5 text-zinc-400 hover:text-rose-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* In-line AI Enhance Trigger */}
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() =>
                                  openAiEnhancer(
                                    'experience',
                                    exp.id,
                                    bIdx,
                                    bullet,
                                    exp.role,
                                    exp.techStack
                                  )
                                }
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                Enhance with AI (XYZ Formula)
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. FEATURED PROJECTS TAB */}
            {activeEditorTab === 'projects' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Featured Projects</h3>
                  <button
                    onClick={() => {
                      addProject({
                        id: 'proj-' + Date.now(),
                        title: 'Modern AI Pipeline',
                        subtitle: 'Semantic search & LLM workflows',
                        role: 'Lead Architect',
                        githubUrl: 'https://github.com/alexrivera-ai/pipeline',
                        techStack: ['TypeScript', 'Gemini API', 'Vector DB'],
                        bullets: ['Engineered scalable document search indexing 50k items in seconds.'],
                      });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {resumeData.projects.map((proj, pIdx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Project #{pIdx + 1}
                        </span>
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Subtitle / Summary</label>
                          <input
                            type="text"
                            value={proj.subtitle || ''}
                            onChange={(e) => updateProject(proj.id, { subtitle: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">GitHub URL</label>
                          <input
                            type="text"
                            value={proj.githubUrl || ''}
                            onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Tech Stack (comma-separated)</label>
                          <input
                            type="text"
                            value={proj.techStack.join(', ')}
                            onChange={(e) =>
                              updateProject(proj.id, {
                                techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono"
                          />
                        </div>
                      </div>

                      {/* Bullets with AI Enhancer */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Project Impact Bullets
                          </label>
                          <button
                            onClick={() => {
                              const bullets = [...proj.bullets, 'Built and launched core architecture handling high traffic.'];
                              updateProject(proj.id, { bullets });
                            }}
                            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                          >
                            <Plus className="w-3 h-3" /> Add Bullet
                          </button>
                        </div>

                        {proj.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => {
                                  const bullets = [...proj.bullets];
                                  bullets[bIdx] = e.target.value;
                                  updateProject(proj.id, { bullets });
                                }}
                                className="flex-1 p-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                              />
                              <button
                                onClick={() => {
                                  const bullets = proj.bullets.filter((_, i) => i !== bIdx);
                                  updateProject(proj.id, { bullets });
                                }}
                                className="p-1.5 text-zinc-400 hover:text-rose-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() =>
                                  openAiEnhancer(
                                    'project',
                                    proj.id,
                                    bIdx,
                                    bullet,
                                    proj.title,
                                    proj.techStack
                                  )
                                }
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                Enhance with AI (XYZ Formula)
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. EDUCATION TAB */}
            {activeEditorTab === 'education' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Education & Certifications</h3>
                  <button
                    onClick={() => {
                      addEducation({
                        id: 'edu-' + Date.now(),
                        institution: 'University of California',
                        degree: 'Bachelor of Science',
                        fieldOfStudy: 'Computer Science',
                        startDate: '2019',
                        endDate: '2023',
                        location: 'Berkeley, CA',
                      });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Education
                  </button>
                </div>

                <div className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-800/30 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Academic Degree</span>
                        <button onClick={() => removeEducation(edu.id)} className="text-rose-500 text-xs flex items-center gap-1">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Degree & Major</label>
                          <input
                            type="text"
                            value={`${edu.degree} in ${edu.fieldOfStudy}`}
                            onChange={(e) => {
                              const parts = e.target.value.split(' in ');
                              updateEducation(edu.id, {
                                degree: parts[0] || edu.degree,
                                fieldOfStudy: parts[1] || edu.fieldOfStudy,
                              });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Years</label>
                          <input
                            type="text"
                            value={`${edu.startDate} - ${edu.endDate}`}
                            onChange={(e) => {
                              const parts = e.target.value.split('-');
                              updateEducation(edu.id, {
                                startDate: parts[0]?.trim() || '',
                                endDate: parts[1]?.trim() || '',
                              });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">GPA (optional)</label>
                          <input
                            type="text"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Location</label>
                          <input
                            type="text"
                            value={edu.location || ''}
                            onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Resume Preview (7 cols) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-4">
          {/* Template Switcher & Design Preview Toolbar */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Design Preview
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {templates.find((t) => t.id === activeTemplate)?.label || 'Professional Polish'}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
                  title="Print / Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" /> PDF
                </button>
                <div className="flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 pl-2 border-l border-zinc-200 dark:border-zinc-700">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-[11px]">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Template selector pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTemplate === tpl.id
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 ring-2 ring-indigo-600/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Page Container */}
          <div className="bg-zinc-200 dark:bg-zinc-950/80 p-4 sm:p-6 rounded-2xl border border-zinc-300 dark:border-zinc-800 overflow-x-auto shadow-inner flex justify-center">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-[850px] transition-transform duration-150 shadow-2xl rounded-sm"
            >
              {activeTemplate === 'professional-polish' && <ProfessionalPolishTemplate data={resumeData} />}
              {activeTemplate === 'ats-clean' && <AtsCleanTemplate data={resumeData} />}
              {activeTemplate === 'modern-tech' && <ModernTechTemplate data={resumeData} />}
              {activeTemplate === 'minimal-executive' && <MinimalExecutiveTemplate data={resumeData} />}
            </div>
          </div>
        </div>
      </div>

      {/* AI Bullet Enhancer Modal */}
      {activeBulletTarget && (
        <AiBulletModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          originalBullet={activeBulletTarget.text}
          role={activeBulletTarget.role}
          techStack={activeBulletTarget.techStack}
          onApply={applyEnhancedBullet}
        />
      )}
    </div>
  );
};
