import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { requestAnalyzeResume, requestMatchJobDescription } from '../../services/api';
import {
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck,
  Briefcase,
  Layers,
  FileText,
  RotateCw,
  Loader2,
  Compass,
} from 'lucide-react';

export const ATSScannerView: React.FC = () => {
  const {
    resumeData,
    atsAnalysis,
    setAtsAnalysis,
    jdMatchResult,
    setJdMatchResult,
    createRemediationRoadmapFromJD,
    showToast,
  } = useCareer();

  const [scanMode, setScanMode] = useState<'ats-scan' | 'jd-match'>('ats-scan');
  const [resumeInputText, setResumeInputText] = useState(() => {
    // Generate text representation of active resume
    return `Candidate: ${resumeData.personalInfo.fullName}
Role: ${resumeData.personalInfo.headline}
Email: ${resumeData.personalInfo.email} | Location: ${resumeData.personalInfo.location}

Summary:
${resumeData.personalInfo.summary}

Skills:
${resumeData.skills.map((s) => `${s.category}: ${s.skills.join(', ')}`).join('\n')}

Experience:
${resumeData.experience
  .map(
    (e) =>
      `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\nTech: ${e.techStack.join(', ')}\n${e.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}

Projects:
${resumeData.projects
  .map(
    (p) =>
      `${p.title} (${p.techStack.join(', ')})\n${p.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}

Education:
${resumeData.education.map((edu) => `${edu.degree} in ${edu.fieldOfStudy}, ${edu.institution}`).join('\n')}`;
  });

  const [jobDescriptionText, setJobDescriptionText] = useState(
    `Position: Senior AI / Full-Stack Platform Engineer
Location: San Francisco, CA / Remote

About The Role:
We are seeking an experienced Senior AI Full-Stack Engineer to architect our enterprise LLM applications, streaming interfaces, and high-concurrency event-driven microservices.

Requirements:
- 4+ years of professional experience building web platforms in TypeScript, React, and Node.js or Python.
- Proven experience architecting production RAG pipelines, Vector Search indexes, and LLM integrations with prompt optimization.
- Strong knowledge of PostgreSQL, Redis caching, and Docker containerization.
- Experience with Distributed Event Streaming (Apache Kafka / Redis Streams) and Cloud Observability (OpenTelemetry / Prometheus).
- Familiarity with GraphQL schema design and automated CI/CD deployment pipelines.`
  );

  const [isScanning, setIsScanning] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const handleSyncFromBuilder = () => {
    const formatted = `Candidate: ${resumeData.personalInfo.fullName}
Role: ${resumeData.personalInfo.headline}
Email: ${resumeData.personalInfo.email} | Location: ${resumeData.personalInfo.location}

Summary:
${resumeData.personalInfo.summary}

Skills:
${resumeData.skills.map((s) => `${s.category}: ${s.skills.join(', ')}`).join('\n')}

Experience:
${resumeData.experience
  .map(
    (e) =>
      `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\nTech: ${e.techStack.join(', ')}\n${e.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}

Projects:
${resumeData.projects
  .map(
    (p) =>
      `${p.title} (${p.techStack.join(', ')})\n${p.bullets.map((b) => `• ${b}`).join('\n')}`
  )
  .join('\n\n')}

Education:
${resumeData.education.map((edu) => `${edu.degree} in ${edu.fieldOfStudy}, ${edu.institution}`).join('\n')}`;

    setResumeInputText(formatted);
    showToast('Synced latest content from Resume Builder', 'success');
  };

  const handleRunATSScan = async () => {
    if (!resumeInputText.trim()) {
      showToast('Please provide resume text to scan', 'warning');
      return;
    }
    setIsScanning(true);
    showToast('AI ATS Scanner analyzing resume parseability & metrics...', 'info');
    try {
      const result = await requestAnalyzeResume(resumeInputText);
      setAtsAnalysis(result);
      showToast(`ATS Scan completed! Score: ${result.aggregateScore}/100`, 'success');
    } catch (err) {
      console.error('Scan error:', err);
      showToast('Failed to complete ATS scan', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const handleRunJDMatch = async () => {
    if (!resumeInputText.trim() || !jobDescriptionText.trim()) {
      showToast('Please provide both resume text and target Job Description', 'warning');
      return;
    }
    setIsMatching(true);
    showToast('Comparing resume against Job Description...', 'info');
    try {
      const result = await requestMatchJobDescription(resumeInputText, jobDescriptionText);
      setJdMatchResult({ ...result, jobDescriptionText });
      showToast(`JD Match calculated: ${result.matchPercentage}% match!`, 'success');
    } catch (err) {
      console.error('JD Match error:', err);
      showToast('Failed to match JD', 'error');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <Scan className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              AI Resume Scanner & Job Description Matcher
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Audit your resume against modern ATS screeners and perform deep Skill Gap Analysis against target job postings.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
            <button
              onClick={() => setScanMode('ats-scan')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                scanMode === 'ats-scan'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <FileCheck className="w-4 h-4" /> ATS Health Audit
            </button>
            <button
              onClick={() => setScanMode('jd-match')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                scanMode === 'jd-match'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Target className="w-4 h-4" /> JD Match & Skill Gap
            </button>
          </div>
        </div>

        {/* MODE 1: ATS AUDIT */}
        {scanMode === 'ats-scan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Input Pane (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" /> Resume Content
                </h3>
                <button
                  onClick={handleSyncFromBuilder}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCw className="w-3 h-3" /> Sync from Builder
                </button>
              </div>

              <textarea
                rows={18}
                value={resumeInputText}
                onChange={(e) => setResumeInputText(e.target.value)}
                placeholder="Paste your raw resume text or markdown here..."
                className="w-full p-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-xs font-mono text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />

              <button
                onClick={handleRunATSScan}
                disabled={isScanning}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Scanning with Gemini ATS Model...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Run Deep ATS Scan
                  </>
                )}
              </button>
            </div>

            {/* Right Report Pane (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {atsAnalysis ? (
                <>
                  {/* Aggregate Score & Category Meters */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-5">
                        {/* Circular Score Gauge */}
                        <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-4 border-indigo-600 shadow-md">
                          <div className="text-center">
                            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                              {atsAnalysis.aggregateScore}
                            </span>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block -mt-1 font-semibold">
                              / 100
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                              Overall ATS Health Score
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              {atsAnalysis.aggregateScore >= 85 ? 'Top Tier' : 'Needs Optimization'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                            {atsAnalysis.executiveSummary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category Breakdown Bars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>Skills Match</span>
                          <span className="text-indigo-600 dark:text-indigo-400">{atsAnalysis.categoryScores.skills}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                          <div
                            style={{ width: `${atsAnalysis.categoryScores.skills}%` }}
                            className="h-full bg-indigo-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>Experience</span>
                          <span className="text-purple-600 dark:text-purple-400">{atsAnalysis.categoryScores.experience}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                          <div
                            style={{ width: `${atsAnalysis.categoryScores.experience}%` }}
                            className="h-full bg-purple-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>Formatting</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{atsAnalysis.categoryScores.formatting}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                          <div
                            style={{ width: `${atsAnalysis.categoryScores.formatting}%` }}
                            className="h-full bg-emerald-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>Keywords</span>
                          <span className="text-amber-600 dark:text-amber-400">{atsAnalysis.categoryScores.keywords}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                          <div
                            style={{ width: `${atsAnalysis.categoryScores.keywords}%` }}
                            className="h-full bg-amber-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Key Strengths (Keep)
                      </div>
                      <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                        {atsAnalysis.strengths.map((str, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critical Fixes */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        <AlertTriangle className="w-4 h-4" /> Critical Fixes Required
                      </div>
                      <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                        {atsAnalysis.criticalFixes.map((fix, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Missing Metrics & Keyword Tags */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4" /> Missing High-Impact Metrics
                      </h4>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {atsAnalysis.missingMetrics.map((met, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">→</span>
                            <span>{met}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                        High-Priority ATS Keywords
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[11px] text-zinc-500 font-medium block mb-1">Keywords Found:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {atsAnalysis.keywordsFound.map((kw, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono"
                              >
                                ✓ {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] text-zinc-500 font-medium block mb-1">Keywords Missing:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {atsAnalysis.keywordsMissing.map((kw, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[11px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-mono"
                              >
                                ✗ {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-12 rounded-2xl text-center space-y-3">
                  <Scan className="w-12 h-12 text-indigo-500 mx-auto opacity-50" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">Ready for ATS Audit</h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Click "Run Deep ATS Scan" to simulate an ATS parser and receive personalized scoring and high-impact metrics recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: JD MATCHER & SKILL GAP */}
        {scanMode === 'jd-match' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs (2 Columns Side by Side on large, 5 cols total) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-500" /> Candidate Resume
                  </label>
                  <button
                    onClick={handleSyncFromBuilder}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Sync latest
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={resumeInputText}
                  onChange={(e) => setResumeInputText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-xs font-mono text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
                <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-500" /> Target Job Description (Paste Here)
                </label>
                <textarea
                  rows={8}
                  value={jobDescriptionText}
                  onChange={(e) => setJobDescriptionText(e.target.value)}
                  placeholder="Paste target job posting description here..."
                  className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-xs font-mono text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleRunJDMatch}
                disabled={isMatching}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Performing Skill Gap Analysis...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" /> Analyze JD Match & Skill Gap
                  </>
                )}
              </button>
            </div>

            {/* Right Report Pane (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {jdMatchResult ? (
                <>
                  {/* Match Percentage Card */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                          Target Role Alignment
                        </span>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                          {jdMatchResult.targetRole}
                        </h3>
                        <p className="text-xs text-zinc-500">{jdMatchResult.company}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                            {jdMatchResult.matchPercentage}%
                          </span>
                          <span className="text-[10px] text-zinc-400 block font-semibold">Skill Alignment</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        style={{ width: `${jdMatchResult.matchPercentage}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                      />
                    </div>

                    {/* Skills Matrix */}
                    <div className="space-y-4 pt-2">
                      {/* Matched Skills */}
                      <div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({jdMatchResult.matchedSkills.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {jdMatchResult.matchedSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Required Skills */}
                      <div>
                        <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Missing Required Skills ({jdMatchResult.missingRequiredSkills.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {jdMatchResult.missingRequiredSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-medium"
                            >
                              ✗ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Preferred Skills */}
                      {jdMatchResult.missingPreferredSkills?.length > 0 && (
                        <div>
                          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5" /> Missing Preferred Skills ({jdMatchResult.missingPreferredSkills.length})
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {jdMatchResult.missingPreferredSkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium"
                              >
                                ⚡ {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" /> Targeted Resume Tailoring Advice
                    </h4>
                    <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                      {jdMatchResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Remediation Roadmap CTA Box */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white">
                        <Compass className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base">Close Your Skill Gap</h4>
                        <p className="text-xs text-indigo-100">
                          Auto-generate a custom learning track containing curated free resources & milestone projects for missing skills.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => createRemediationRoadmapFromJD(jdMatchResult)}
                      className="w-full py-3 px-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Generate Remediation Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-12 rounded-2xl text-center space-y-3">
                  <Target className="w-12 h-12 text-indigo-500 mx-auto opacity-50" />
                  <h3 className="font-bold text-zinc-900 dark:text-white">Ready for JD Gap Analysis</h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Paste a job description on the left and click "Analyze JD Match" to instantly identify matched skills and missing critical competencies.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
