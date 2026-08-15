import React, { useState, useEffect } from 'react';
import { useCareer } from '../../context/CareerContext';
import { InterviewField, InterviewLevel, InterviewType } from '../../types';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Loader2,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Volume2,
  TrendingUp,
  Brain,
  ShieldCheck,
  Play,
} from 'lucide-react';

export const MockInterviewView: React.FC = () => {
  const {
    activeSession,
    startMockInterview,
    submitInterviewAnswer,
    isEvaluatingInterviewAnswer,
    finishMockInterview,
    resetInterviewSession,
    mockSessions,
    showToast,
  } = useCareer();

  // Setup state
  const [selectedField, setSelectedField] = useState<InterviewField>('ai-ml');
  const [selectedLevel, setSelectedLevel] = useState<InterviewLevel>('senior');
  const [selectedType, setSelectedType] = useState<InterviewType>('technical');
  const [userAnswerText, setUserAnswerText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechRecognitionSupported(true);
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionSupported) {
      showToast('Speech recognition not supported in this browser, please type your answer.', 'warning');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (!isListening) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          showToast('Microphone active — speak clearly...', 'info');
        };

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setUserAnswerText((prev) => prev + ' ' + transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        (window as any).__activeRecognition = recognition;
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      if ((window as any).__activeRecognition) {
        (window as any).__activeRecognition.stop();
      }
      setIsListening(false);
    }
  };

  const handleStart = async () => {
    await startMockInterview(selectedField, selectedLevel, selectedType);
  };

  const handleSubmit = async () => {
    if (!userAnswerText.trim()) {
      showToast('Please type or dictate your answer before submitting', 'warning');
      return;
    }
    const ans = userAnswerText;
    setUserAnswerText('');
    await submitInterviewAnswer(ans);
  };

  const currentQIndex = activeSession?.currentQuestionIndex ?? 0;
  const currentQuestion = activeSession?.questions[currentQIndex];
  const evaluatedQuestions = activeSession?.questions.filter((q) => q.score) || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                AI Interview Coach
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Turn-by-Turn Simulation
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Real-Time AI Mock Interview Simulator
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Practice rigorous technical, system architecture, and behavioral interviews with real-time multi-dimensional scoring and model answer breakdowns.
            </p>
          </div>

          {activeSession && (
            <button
              onClick={resetInterviewSession}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> End & Reset
            </button>
          )}
        </div>

        {/* 1. SETUP VIEW (When no active session) */}
        {!activeSession && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Setup Form (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Configure Your Interview Parameters
              </h3>

              {/* 1. Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Target Domain / Engineering Track
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ai-ml', label: 'AI & GenAI Systems' },
                    { id: 'fullstack', label: 'Full-Stack Web' },
                    { id: 'backend', label: 'Distributed Backend' },
                    { id: 'system-design', label: 'System Architecture' },
                    { id: 'dsa', label: 'Data Structures & Algo' },
                    { id: 'devops', label: 'DevOps & Cloud' },
                  ].map((field) => (
                    <button
                      key={field.id}
                      onClick={() => setSelectedField(field.id as InterviewField)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedField === field.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                      }`}
                    >
                      {field.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Experience Level */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Seniority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'junior', label: 'Junior (0-2 yrs)' },
                    { id: 'mid', label: 'Mid-Level (2-5 yrs)' },
                    { id: 'senior', label: 'Senior / Staff (5+ yrs)' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id as InterviewLevel)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        selectedLevel === lvl.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Interview Type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Interview Style & Rubric
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'technical', label: 'Deep Technical' },
                    { id: 'behavioral', label: 'Behavioral & Leadership' },
                    { id: 'mixed', label: 'Mixed Comprehensive' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t.id as InterviewType)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        selectedType === t.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStart}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 fill-current" /> Launch AI Mock Interview
              </button>
            </div>

            {/* Past Interview Sessions & Stats (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Past Interview Performance
                </h3>

                {mockSessions.length > 0 ? (
                  <div className="space-y-3">
                    {mockSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2 text-xs"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-900 dark:text-white uppercase font-mono">
                            {session.field} • {session.level}
                          </span>
                          <span className="px-2 py-0.5 rounded-md font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            Score: {session.overallScore || 8}/10
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          {session.summaryFeedback || 'Completed turn-by-turn evaluation session.'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-zinc-500 space-y-2">
                    <Mic className="w-8 h-8 mx-auto text-zinc-400 opacity-60" />
                    <p>No past interview sessions yet. Launch your first mock session now!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. ACTIVE INTERVIEW SIMULATOR (In-Progress or Completed) */}
        {activeSession && (
          <div className="space-y-6">
            {/* Progress Bar & Status */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-zinc-900 dark:text-white uppercase font-mono">
                  {activeSession.field} ({activeSession.level})
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">
                  Question {Math.min(currentQIndex + 1, activeSession.totalQuestions)} of {activeSession.totalQuestions}
                </span>
              </div>

              <div className="w-48 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  style={{
                    width: `${((currentQIndex + (activeSession.status === 'completed' ? 1 : 0)) / activeSession.totalQuestions) * 100}%`,
                  }}
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                />
              </div>
            </div>

            {/* Main Turn View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question & Evaluation Panel (Left 7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Active Question Box */}
                {currentQuestion && activeSession.status === 'in-progress' && (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40">
                        {currentQuestion.category || 'Core Question'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                      "{currentQuestion.question}"
                    </h3>

                    {currentQuestion.hint && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
                        <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        <span><strong>Interviewer Hint:</strong> {currentQuestion.hint}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Completed Session Summary Card */}
                {activeSession.status === 'completed' && (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
                        {activeSession.overallScore || 8}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                            Interview Assessment: Completed
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Strong Hire Tier
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          {activeSession.summaryFeedback}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Candidate Response Input Area */}
                {activeSession.status === 'in-progress' && (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Your Technical Answer
                      </label>
                      <button
                        type="button"
                        onClick={toggleSpeechRecognition}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                          isListening
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                        {isListening ? 'Listening (Speak now)...' : 'Dictate with Voice'}
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={userAnswerText}
                      onChange={(e) => setUserAnswerText(e.target.value)}
                      placeholder="Structure your answer systematically: 1) Core Concept, 2) Trade-offs & Performance, 3) Real-world Failure Modes & Edge Cases..."
                      className="w-full p-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
                    />

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-zinc-400">
                        {userAnswerText.length} characters typed
                      </span>

                      <button
                        onClick={handleSubmit}
                        disabled={isEvaluatingInterviewAnswer || !userAnswerText.trim()}
                        className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isEvaluatingInterviewAnswer ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Evaluating with AI Rubric...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Submit Answer & Evaluate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Turn History & Multi-Criteria Grading Breakdown (Right 5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Evaluation History & Feedback
                  </h3>

                  {evaluatedQuestions.length > 0 ? (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                      {evaluatedQuestions.map((q, idx) => (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-3 text-xs"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-zinc-900 dark:text-white">
                              Q{idx + 1}: {q.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                              {q.score?.overall}/10
                            </span>
                          </div>

                          {/* Multi-criteria scores */}
                          <div className="grid grid-cols-3 gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-700/60 text-[10.5px]">
                            <div>
                              <span className="text-zinc-500 block">Technical</span>
                              <span className="font-bold text-indigo-600">{q.score?.technical}/10</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">Clarity</span>
                              <span className="font-bold text-purple-600">{q.score?.clarity}/10</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">Depth</span>
                              <span className="font-bold text-emerald-600">{q.score?.depth}/10</span>
                            </div>
                          </div>

                          {/* Feedback text */}
                          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {q.feedback}
                          </p>

                          {/* Model answer snippet */}
                          {q.modelAnswer && (
                            <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-[11px]">
                              <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                                🌟 Staff Model Answer:
                              </span>
                              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-normal">
                                {q.modelAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      Submit your first question answer to see real-time rubric breakdown.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
