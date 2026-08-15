export type TabType = 
  | 'landing' 
  | 'dashboard' 
  | 'resume-builder' 
  | 'ats-scanner' 
  | 'roadmap' 
  | 'mock-interview' 
  | 'question-bank' 
  | 'community';

export type TemplateType = 'ats-clean' | 'modern-tech' | 'minimal-executive' | 'professional-polish';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
  achievements?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  techStack: string[];
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    github?: string;
    linkedin?: string;
    summary: string;
  };
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
  }>;
}

export interface ATSAnalysisResult {
  aggregateScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    formatting: number;
    keywords: number;
  };
  strengths: string[];
  criticalFixes: string[];
  missingMetrics: string[];
  keywordsFound: string[];
  keywordsMissing: string[];
  executiveSummary: string;
  analyzedAt?: string;
}

export interface JDMatchResult {
  matchPercentage: number;
  targetRole: string;
  company: string;
  matchedSkills: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  recommendations: string[];
  remediationRoadmapTopics: string[];
  jobDescriptionText?: string;
}

export type MilestoneStatus = 'not-started' | 'in-progress' | 'mastered';

export interface MilestoneResource {
  title: string;
  url: string;
  type: 'doc' | 'video' | 'course' | 'repo';
  isFree: boolean;
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  whyLearn: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  resources: MilestoneResource[];
  projectIdea: {
    title: string;
    description: string;
    skillsApplied: string[];
  };
  status: MilestoneStatus;
}

export interface RoadmapTrack {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  level: 'Foundational' | 'Mid-Level' | 'Advanced / Specialist';
  estimatedWeeks: number;
  isCustom?: boolean;
  milestones: MilestoneItem[];
}

export type InterviewField = 'ai-ml' | 'fullstack' | 'backend' | 'dsa' | 'devops' | 'system-design';
export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type InterviewType = 'technical' | 'behavioral' | 'mixed';

export interface InterviewQuestionItem {
  id: string;
  question: string;
  category: string;
  hint?: string;
  userAnswer?: string;
  score?: {
    technical: number;
    clarity: number;
    depth: number;
    overall: number;
  };
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
  modelAnswer?: string;
  evaluatedAt?: string;
}

export interface MockInterviewSession {
  id: string;
  field: InterviewField;
  level: InterviewLevel;
  type: InterviewType;
  status: 'idle' | 'in-progress' | 'completed';
  createdAt: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  questions: InterviewQuestionItem[];
  overallScore?: number;
  summaryFeedback?: string;
}

export interface QuestionBankItem {
  id: string;
  field: InterviewField | 'python' | 'javascript' | 'databases';
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  keyConcepts: string[];
  answer: string;
  commonPitfalls: string[];
  sampleCode?: string;
  bookmarked?: boolean;
}

export interface CommunityComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  text: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
    badge?: string;
  };
  title: string;
  content: string;
  category: 'questions' | 'project-showcase' | 'interview-experiences' | 'career-advice';
  tags: string[];
  upvotes: number;
  userUpvoted?: boolean;
  comments: CommunityComment[];
  createdAt: string;
}

export interface CollabProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  lookingFor: string[];
  teamSize: string;
  openRoles: number;
  githubUrl?: string;
  owner: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
}

export interface UserProfile {
  name: string;
  title: string;
  targetRole: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  targetSalary: string;
  experienceYears: string;
  readinessScore: number;
  completedMilestonesCount: number;
  mockInterviewsCount: number;
}
