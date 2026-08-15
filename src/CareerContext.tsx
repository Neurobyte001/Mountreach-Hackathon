import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  TabType,
  TemplateType,
  ResumeData,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  ATSAnalysisResult,
  JDMatchResult,
  RoadmapTrack,
  MilestoneStatus,
  InterviewField,
  InterviewLevel,
  InterviewType,
  MockInterviewSession,
  QuestionBankItem,
  CommunityPost,
  CollabProject,
  UserProfile,
} from '../types';
import {
  initialResumeData,
  defaultATSAnalysis,
  defaultJDMatch,
  defaultRoadmapTracks,
  defaultQuestionBank,
  defaultCommunityPosts,
  defaultCollabProjects,
  initialUserProfile,
} from '../data/mockData';
import {
  requestNextInterviewQuestion,
  requestEvaluateInterviewAnswer,
} from '../services/api';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CareerContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;

  // Resume State
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  activeTemplate: TemplateType;
  setActiveTemplate: (template: TemplateType) => void;
  updatePersonalInfo: (field: keyof ResumeData['personalInfo'], value: string) => void;
  updateSkillCategory: (catIdx: number, skills: string[]) => void;
  addSkillCategory: (categoryName: string) => void;
  removeSkillCategory: (catIdx: number) => void;
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addProject: (item: ProjectItem) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addEducation: (item: EducationItem) => void;
  updateEducation: (id: string, updated: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  loadResumePreset: (preset: 'alex-aiml' | 'fullstack-senior' | 'blank') => void;

  // ATS & JD Matching
  atsAnalysis: ATSAnalysisResult | null;
  setAtsAnalysis: React.Dispatch<React.SetStateAction<ATSAnalysisResult | null>>;
  jdMatchResult: JDMatchResult | null;
  setJdMatchResult: React.Dispatch<React.SetStateAction<JDMatchResult | null>>;
  createRemediationRoadmapFromJD: (result: JDMatchResult) => void;

  // Roadmaps
  roadmaps: RoadmapTrack[];
  setRoadmaps: React.Dispatch<React.SetStateAction<RoadmapTrack[]>>;
  activeRoadmapId: string;
  setActiveRoadmapId: (id: string) => void;
  toggleMilestoneStatus: (trackId: string, milestoneId: string) => void;

  // Mock Interviews
  mockSessions: MockInterviewSession[];
  activeSession: MockInterviewSession | null;
  isEvaluatingInterviewAnswer: boolean;
  startMockInterview: (field: InterviewField, level: InterviewLevel, type: InterviewType) => Promise<void>;
  submitInterviewAnswer: (answer: string) => Promise<void>;
  finishMockInterview: () => void;
  resetInterviewSession: () => void;

  // Question Bank
  questionBank: QuestionBankItem[];
  toggleBookmarkQuestion: (id: string) => void;

  // Community & Collab
  communityPosts: CommunityPost[];
  upvotePost: (id: string) => void;
  addCommunityPost: (title: string, content: string, category: CommunityPost['category'], tags: string[]) => void;
  addCommentToPost: (postId: string, text: string) => void;
  collabProjects: CollabProject[];
  addCollabProject: (project: Omit<CollabProject, 'id' | 'createdAt'>) => void;
  joinCollabProject: (projectId: string, role: string) => void;

  // User Profile
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  triggerCelebration: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('careerforge_theme');
    return saved ? saved === 'dark' : true;
  });

  // Resume State
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('careerforge_resume');
    return saved ? JSON.parse(saved) : initialResumeData;
  });
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>(() => {
    const saved = localStorage.getItem('careerforge_template');
    return (saved as TemplateType) || 'professional-polish';
  });

  useEffect(() => {
    localStorage.setItem('careerforge_template', activeTemplate);
  }, [activeTemplate]);

  // ATS & JD Match
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysisResult | null>(() => {
    const saved = localStorage.getItem('careerforge_ats');
    return saved ? JSON.parse(saved) : defaultATSAnalysis;
  });
  const [jdMatchResult, setJdMatchResult] = useState<JDMatchResult | null>(() => {
    const saved = localStorage.getItem('careerforge_jd_match');
    return saved ? JSON.parse(saved) : defaultJDMatch;
  });

  // Roadmaps
  const [roadmaps, setRoadmaps] = useState<RoadmapTrack[]>(() => {
    const saved = localStorage.getItem('careerforge_roadmaps');
    return saved ? JSON.parse(saved) : defaultRoadmapTracks;
  });
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>('ai-ml-engineer');

  // Mock Interviews
  const [mockSessions, setMockSessions] = useState<MockInterviewSession[]>(() => {
    const saved = localStorage.getItem('careerforge_interviews');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeSession, setActiveSession] = useState<MockInterviewSession | null>(null);
  const [isEvaluatingInterviewAnswer, setIsEvaluatingInterviewAnswer] = useState<boolean>(false);

  // Question Bank
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(() => {
    const saved = localStorage.getItem('careerforge_questions');
    return saved ? JSON.parse(saved) : defaultQuestionBank;
  });

  // Community
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('careerforge_posts');
    return saved ? JSON.parse(saved) : defaultCommunityPosts;
  });
  const [collabProjects, setCollabProjects] = useState<CollabProject[]>(() => {
    const saved = localStorage.getItem('careerforge_collabs');
    return saved ? JSON.parse(saved) : defaultCollabProjects;
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('careerforge_user');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  // Toast Alerts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('careerforge_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('careerforge_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (atsAnalysis) localStorage.setItem('careerforge_ats', JSON.stringify(atsAnalysis));
  }, [atsAnalysis]);

  useEffect(() => {
    if (jdMatchResult) localStorage.setItem('careerforge_jd_match', JSON.stringify(jdMatchResult));
  }, [jdMatchResult]);

  useEffect(() => {
    localStorage.setItem('careerforge_roadmaps', JSON.stringify(roadmaps));
  }, [roadmaps]);

  useEffect(() => {
    localStorage.setItem('careerforge_interviews', JSON.stringify(mockSessions));
  }, [mockSessions]);

  useEffect(() => {
    localStorage.setItem('careerforge_questions', JSON.stringify(questionBank));
  }, [questionBank]);

  useEffect(() => {
    localStorage.setItem('careerforge_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('careerforge_collabs', JSON.stringify(collabProjects));
  }, [collabProjects]);

  useEffect(() => {
    localStorage.setItem('careerforge_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Helper Functions
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  // Resume modifications
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateSkillCategory = (catIdx: number, skills: string[]) => {
    setResumeData((prev) => {
      const copy = [...prev.skills];
      if (copy[catIdx]) {
        copy[catIdx] = { ...copy[catIdx], skills };
      }
      return { ...prev, skills: copy };
    });
  };

  const addSkillCategory = (categoryName: string) => {
    if (!categoryName.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: categoryName.trim(), skills: [] }],
    }));
    showToast(`Added skill category "${categoryName}"`, 'success');
  };

  const removeSkillCategory = (catIdx: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== catIdx),
    }));
  };

  const addExperience = (item: ExperienceItem) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [item, ...prev.experience],
    }));
    showToast(`Added experience at ${item.company}`, 'success');
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...updated } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
    showToast('Experience entry removed', 'info');
  };

  const addProject = (item: ProjectItem) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [item, ...prev.projects],
    }));
    showToast(`Added project "${item.title}"`, 'success');
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, ...updated } : proj)),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
    showToast('Project removed', 'info');
  };

  const addEducation = (item: EducationItem) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));
    showToast(`Added education at ${item.institution}`, 'success');
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...updated } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const loadResumePreset = (preset: 'alex-aiml' | 'fullstack-senior' | 'blank') => {
    if (preset === 'alex-aiml') {
      setResumeData(initialResumeData);
      showToast('Loaded AI Systems Engineer preset', 'success');
    } else if (preset === 'fullstack-senior') {
      setResumeData({
        ...initialResumeData,
        personalInfo: {
          ...initialResumeData.personalInfo,
          fullName: 'Jordan Sterling',
          headline: 'Principal Full-Stack Architect | Distributed Cloud & High-Concurrence UI',
          summary: 'Accomplished Full-Stack Engineer with 7+ years of experience spearheading web platforms, micro-frontends, and distributed systems. Built multi-region cloud services processing 50M+ daily transactions with 99.99% availability.',
        },
      });
      showToast('Loaded Senior Full-Stack Architect preset', 'success');
    } else {
      setResumeData({
        personalInfo: {
          fullName: 'Your Name',
          headline: 'Full-Stack Software Engineer',
          email: 'youremail@example.com',
          phone: '+1 (555) 019-2834',
          location: 'San Francisco, CA',
          website: 'https://yourwebsite.dev',
          github: 'https://github.com/yourhandle',
          linkedin: 'https://linkedin.com/in/yourhandle',
          summary: 'Results-driven software engineer with proven track record in architecting scalable web applications, optimizing databases, and collaborating in agile product teams.',
        },
        skills: [
          { category: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
          { category: 'Frameworks', skills: ['React', 'Node.js', 'Express', 'Tailwind CSS'] },
          { category: 'Tools & Cloud', skills: ['Git', 'Docker', 'PostgreSQL', 'AWS'] },
        ],
        experience: [
          {
            id: 'exp-blank-1',
            company: 'Acme Software Corp',
            role: 'Software Engineer',
            location: 'Remote',
            startDate: '2022-01',
            endDate: 'Present',
            isCurrent: true,
            techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
            bullets: [
              'Designed and launched customer dashboard features that increased user retention by 22%.',
              'Refactored API caching layer, cutting median page response time by 40%.',
            ],
          },
        ],
        projects: [
          {
            id: 'proj-blank-1',
            title: 'CloudFlow Task Manager',
            subtitle: 'Collaborative productivity tool',
            role: 'Lead Developer',
            liveUrl: 'https://cloudflow.example.com',
            githubUrl: 'https://github.com/example/cloudflow',
            techStack: ['React', 'Node.js', 'PostgreSQL'],
            bullets: [
              'Implemented real-time synchronization using WebSockets, supporting 1,000+ concurrent workspaces.',
            ],
          },
        ],
        education: [
          {
            id: 'edu-blank-1',
            institution: 'State University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2018',
            endDate: '2022',
            location: 'Austin, TX',
          },
        ],
        certifications: [],
      });
      showToast('Loaded blank template ready for your details', 'info');
    }
  };

  // Milestone toggling
  const toggleMilestoneStatus = (trackId: string, milestoneId: string) => {
    setRoadmaps((prev) => {
      return prev.map((track) => {
        if (track.id !== trackId) return track;
        const updatedMilestones = track.milestones.map((m) => {
          if (m.id !== milestoneId) return m;
          const nextStatus: MilestoneStatus =
            m.status === 'not-started'
              ? 'in-progress'
              : m.status === 'in-progress'
              ? 'mastered'
              : 'not-started';

          if (nextStatus === 'mastered') {
            triggerCelebration();
            showToast(`🎉 Mastered: ${m.title}!`, 'success');
          }
          return { ...m, status: nextStatus };
        });

        return { ...track, milestones: updatedMilestones };
      });
    });

    // Update readiness score
    setUserProfile((prev) => {
      const completed = roadmaps.reduce(
        (acc, t) => acc + t.milestones.filter((m) => m.status === 'mastered').length,
        0
      );
      return {
        ...prev,
        completedMilestonesCount: completed + 1,
        readinessScore: Math.min(98, prev.readinessScore + 1),
      };
    });
  };

  // Create remediation roadmap from JD match
  const createRemediationRoadmapFromJD = (result: JDMatchResult) => {
    const newTrackId = 'custom-jd-' + Date.now();
    const newTrack: RoadmapTrack = {
      id: newTrackId,
      title: `Remediation for ${result.targetRole || 'Target Role'}`,
      category: 'Targeted Remediation',
      iconName: 'Target',
      description: `Targeted roadmap designed to bridge missing skills (${result.missingRequiredSkills.slice(0, 3).join(', ')}) from ${result.company || 'the job listing'}.`,
      level: 'Mid-Level',
      estimatedWeeks: Math.max(4, result.remediationRoadmapTopics.length * 2),
      isCustom: true,
      milestones: result.remediationRoadmapTopics.map((topic, idx) => ({
        id: `custom-milestone-${idx + 1}`,
        title: topic,
        description: `Comprehensive mastery of ${topic} aligned with interview requirements for ${result.targetRole}.`,
        whyLearn: `Directly bridges critical skill gap highlighted in the Job Description evaluation.`,
        difficulty: (idx === 0 ? 'Beginner' : idx === 1 ? 'Intermediate' : 'Advanced') as any,
        estimatedHours: 15 + idx * 5,
        status: 'not-started',
        resources: [
          { title: `${topic} Official Engineering Documentation`, url: 'https://github.com', type: 'doc', isFree: true },
          { title: `Deep Dive Masterclass: ${topic}`, url: 'https://youtube.com', type: 'video', isFree: true },
        ],
        projectIdea: {
          title: `${topic.split(' ')[0]} Micro-Service Demo`,
          description: `Build and document a production-ready demonstration applying ${topic} with tests and benchmarks.`,
          skillsApplied: [topic.split(' ')[0], 'TypeScript', 'Docker'],
        },
      })),
    };

    setRoadmaps((prev) => [newTrack, ...prev.filter((t) => t.id !== newTrackId)]);
    setActiveRoadmapId(newTrackId);
    setActiveTab('roadmap');
    triggerCelebration();
    showToast('Custom Remediation Roadmap generated and loaded!', 'success');
  };

  // Mock Interview Flow
  const startMockInterview = async (
    field: InterviewField,
    level: InterviewLevel,
    type: InterviewType
  ) => {
    showToast(`Initializing AI Interview for ${field} (${level})...`, 'info');
    try {
      const qRes = await requestNextInterviewQuestion(field, level, type, []);
      const newSession: MockInterviewSession = {
        id: 'session-' + Date.now(),
        field,
        level,
        type,
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        currentQuestionIndex: 0,
        totalQuestions: 4,
        questions: [
          {
            id: 'q-1',
            question: qRes.question,
            category: qRes.category,
            hint: qRes.hint,
          },
        ],
      };
      setActiveSession(newSession);
    } catch (err) {
      console.error('Failed to start interview:', err);
      showToast('Failed to start interview session, please try again.', 'error');
    }
  };

  const submitInterviewAnswer = async (userAnswer: string) => {
    if (!activeSession) return;
    const currentQIndex = activeSession.currentQuestionIndex;
    const currentQ = activeSession.questions[currentQIndex];
    if (!currentQ) return;

    setIsEvaluatingInterviewAnswer(true);
    showToast('AI is grading your technical answer...', 'info');

    try {
      const evalRes = await requestEvaluateInterviewAnswer(
        currentQ.question,
        userAnswer,
        activeSession.field,
        activeSession.level
      );

      const evaluatedQuestion = {
        ...currentQ,
        userAnswer,
        score: {
          technical: evalRes.technicalScore,
          clarity: evalRes.clarityScore,
          depth: evalRes.depthScore,
          overall: evalRes.overallScore,
        },
        feedback: evalRes.feedback,
        strengths: evalRes.strengths,
        improvements: evalRes.improvements,
        modelAnswer: evalRes.modelAnswer,
        evaluatedAt: new Date().toISOString(),
      };

      const updatedQuestions = [...activeSession.questions];
      updatedQuestions[currentQIndex] = evaluatedQuestion;

      const isLastQuestion = currentQIndex + 1 >= activeSession.totalQuestions;

      if (isLastQuestion) {
        const scores = updatedQuestions.map((q) => q.score?.overall || 8);
        const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const completedSession: MockInterviewSession = {
          ...activeSession,
          questions: updatedQuestions,
          status: 'completed',
          overallScore: avgScore,
          summaryFeedback: `Candidate completed a ${activeSession.level} interview in ${activeSession.field}. Average performance score was ${avgScore}/10 with strong conceptual clarity and systematic reasoning.`,
        };
        setActiveSession(completedSession);
        setMockSessions((prev) => [completedSession, ...prev]);
        setUserProfile((prev) => ({
          ...prev,
          mockInterviewsCount: prev.mockInterviewsCount + 1,
          readinessScore: Math.min(99, prev.readinessScore + 2),
        }));
        triggerCelebration();
        showToast('Interview session completed! Review your performance radar.', 'success');
      } else {
        // Fetch next question
        const prevQuestions = updatedQuestions.map((q) => q.question);
        const nextQRes = await requestNextInterviewQuestion(
          activeSession.field,
          activeSession.level,
          activeSession.type,
          prevQuestions
        );

        const nextQuestionItem = {
          id: `q-${currentQIndex + 2}`,
          question: nextQRes.question,
          category: nextQRes.category,
          hint: nextQRes.hint,
        };

        setActiveSession({
          ...activeSession,
          questions: [...updatedQuestions, nextQuestionItem],
          currentQuestionIndex: currentQIndex + 1,
        });
        showToast('Answer recorded! Question evaluated.', 'success');
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
      showToast('Error evaluating answer.', 'error');
    } finally {
      setIsEvaluatingInterviewAnswer(false);
    }
  };

  const finishMockInterview = () => {
    if (activeSession && activeSession.status === 'in-progress') {
      const completedSession: MockInterviewSession = {
        ...activeSession,
        status: 'completed',
        overallScore: 8,
      };
      setActiveSession(completedSession);
      setMockSessions((prev) => [completedSession, ...prev]);
      showToast('Interview concluded.', 'info');
    }
  };

  const resetInterviewSession = () => {
    setActiveSession(null);
  };

  // Question Bank
  const toggleBookmarkQuestion = (id: string) => {
    setQuestionBank((prev) =>
      prev.map((q) => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q))
    );
  };

  // Community
  const upvotePost = (id: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const alreadyUpvoted = p.userUpvoted;
        return {
          ...p,
          upvotes: alreadyUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          userUpvoted: !alreadyUpvoted,
        };
      })
    );
  };

  const addCommunityPost = (
    title: string,
    content: string,
    category: CommunityPost['category'],
    tags: string[]
  ) => {
    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      author: {
        name: userProfile.name,
        handle: `@${userProfile.name.toLowerCase().replace(/\s+/g, '')}`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: userProfile.title,
        badge: 'Verified Builder',
      },
      title,
      content,
      category,
      tags,
      upvotes: 1,
      userUpvoted: true,
      comments: [],
      createdAt: 'Just now',
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
    showToast('Post published to Community Feed!', 'success');
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'comment-' + Date.now(),
      author: {
        name: userProfile.name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: userProfile.title,
      },
      text: text.trim(),
      createdAt: 'Just now',
    };

    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      })
    );
    showToast('Comment added!', 'success');
  };

  const addCollabProject = (project: Omit<CollabProject, 'id' | 'createdAt'>) => {
    const newProject: CollabProject = {
      ...project,
      id: 'collab-' + Date.now(),
      createdAt: 'Just now',
    };
    setCollabProjects((prev) => [newProject, ...prev]);
    showToast('Project collaboration request posted!', 'success');
  };

  const joinCollabProject = (projectId: string, role: string) => {
    setCollabProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          openRoles: Math.max(0, proj.openRoles - 1),
        };
      })
    );
    triggerCelebration();
    showToast(`Application sent for "${role}" position! The project lead will reach out.`, 'success');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  return (
    <CareerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
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
        atsAnalysis,
        setAtsAnalysis,
        jdMatchResult,
        setJdMatchResult,
        createRemediationRoadmapFromJD,
        roadmaps,
        setRoadmaps,
        activeRoadmapId,
        setActiveRoadmapId,
        toggleMilestoneStatus,
        mockSessions,
        activeSession,
        isEvaluatingInterviewAnswer,
        startMockInterview,
        submitInterviewAnswer,
        finishMockInterview,
        resetInterviewSession,
        questionBank,
        toggleBookmarkQuestion,
        communityPosts,
        upvotePost,
        addCommunityPost,
        addCommentToPost,
        collabProjects,
        addCollabProject,
        joinCollabProject,
        userProfile,
        setUserProfile,
        updateUserProfile,
        toasts,
        showToast,
        removeToast,
        triggerCelebration,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
