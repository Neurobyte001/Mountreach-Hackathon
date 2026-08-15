import React from 'react';
import { CareerProvider, useCareer } from './context/CareerContext';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/layout/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { ResumeBuilderView } from './components/resume/ResumeBuilderView';
import { ATSScannerView } from './components/scanner/ATSScannerView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { MockInterviewView } from './components/interview/MockInterviewView';
import { QuestionBankView } from './components/questions/QuestionBankView';
import { CommunityView } from './components/community/CommunityView';

const MainContent: React.FC = () => {
  const { activeTab } = useCareer();

  return (
    <main className="flex-1">
      {activeTab === 'landing' && <LandingPage />}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'resume-builder' && <ResumeBuilderView />}
      {activeTab === 'ats-scanner' && <ATSScannerView />}
      {activeTab === 'roadmap' && <RoadmapView />}
      {activeTab === 'mock-interview' && <MockInterviewView />}
      {activeTab === 'question-bank' && <QuestionBankView />}
      {activeTab === 'community' && <CommunityView />}
    </main>
  );
};

export function App() {
  return (
    <CareerProvider>
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <Navbar />
        <MainContent />
        <ToastContainer />
      </div>
    </CareerProvider>
  );
}

export default App;
