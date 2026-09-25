import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/studentos/Navbar';
import { DashboardHeader } from '../components/studentos/DashboardHeader';
import { CourseFinder } from '../components/studentos/CourseFinder';
import { MoneyTracker } from '../components/studentos/MoneyTracker';
import { StudyAssistant } from '../components/studentos/StudyAssistant';
import { ScholarshipFinder } from '../components/studentos/ScholarshipFinder';
import { DocumentTools } from '../components/studentos/DocumentTools';
import { CareerRoadmap } from '../components/studentos/CareerRoadmap';
import { AIChatAssistant } from '../components/studentos/AIChatAssistant';
import { CaptionGenerator } from '../components/studentos/CaptionGenerator';
import { AuthModal } from '../components/studentos/AuthModal';
import { OnboardingTutorialModal } from '../components/studentos/OnboardingTutorialModal';

import { GPACalculator } from '../components/studentos/GPACalculator';
import { ExamCountdown } from '../components/studentos/ExamCountdown';
import { ClassTimetable } from '../components/studentos/ClassTimetable';
import { ResumeBuilder } from '../components/studentos/ResumeBuilder';

import { 
  BrandName, 
  ThemeMode, 
  StudentStats, 
  ExpenseItem, 
  SavingsGoal,
  UserProfile,
  SubjectGrade,
  ExamDeadline,
  TimetableSlot,
  SubjectAttendance,
  StudentResume,
  LanguageCode
} from '../types/studentos';

import {
  getStoredTheme,
  setStoredTheme,
  getStoredLanguage,
  setStoredLanguage,
  getStoredBrand,
  setStoredBrand,
  getStoredStats,
  saveStoredStats,
  getStoredExpenses,
  saveStoredExpenses,
  getStoredSavings,
  saveStoredSavings,
  getCompletedRoadmapNodes,
  saveCompletedRoadmapNodes,
  getStoredUserProfile,
  saveStoredUserProfile,
  getStoredGrades,
  saveStoredGrades,
  getStoredDeadlines,
  saveStoredDeadlines,
  getStoredTimetable,
  saveStoredTimetable,
  getStoredAttendance,
  saveStoredAttendance,
  getStoredResume,
  saveStoredResume,
  resetAllUserData
} from '../utils/studentosStorage';

export const StudentOSPage: React.FC = () => {
  // Theme & Branding & Language
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [lang, setLang] = useState<LanguageCode>(getStoredLanguage);
  const [brandName, setBrandName] = useState<BrandName>('Studently');

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // User Profile & Modals
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Auto prompt Auth modal and App Tutorial Guide modal on starting page open
  useEffect(() => {
    if (!userProfile.isLoggedIn) {
      setIsAuthModalOpen(true);
      setIsTutorialOpen(true);
    }
  }, []);

  // Student State
  const [stats, setStats] = useState<StudentStats>(getStoredStats);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(getStoredExpenses);
  const [savings, setSavings] = useState<SavingsGoal>(getStoredSavings);
  const [completedRoadmapNodes, setCompletedRoadmapNodes] = useState<string[]>(getCompletedRoadmapNodes);

  // Tools State
  const [grades, setGrades] = useState<SubjectGrade[]>(getStoredGrades);
  const [deadlines, setDeadlines] = useState<ExamDeadline[]>(getStoredDeadlines);
  const [timetable, setTimetable] = useState<TimetableSlot[]>(getStoredTimetable);
  const [attendance, setAttendance] = useState<SubjectAttendance[]>(getStoredAttendance);
  const [resume, setResume] = useState<StudentResume>(getStoredResume);

  useEffect(() => {
    setStoredTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectLanguage = (newLang: LanguageCode) => {
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  const handleSelectBrand = (newBrand: BrandName) => {
    setBrandName(newBrand);
    setStoredBrand(newBrand);
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveStoredUserProfile(newProfile);
  };

  const handleResetAllData = () => {
    resetAllUserData();
    window.location.reload();
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = stats.lastStreakDate === todayStr;

  const handleCheckInStreak = () => {
    if (!hasCheckedInToday) {
      const updated: StudentStats = {
        ...stats,
        studyStreak: stats.studyStreak + 1,
        lastStreakDate: todayStr
      };
      setStats(updated);
      saveStoredStats(updated);
    }
  };

  const handleUpdateStats = (newStats: Partial<StudentStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    saveStoredStats(updated);
  };

  const handleAddExpense = (item: Omit<ExpenseItem, 'id'>) => {
    const newExpense: ExpenseItem = { ...item, id: Date.now().toString() };
    const updatedList = [newExpense, ...expenses];
    setExpenses(updatedList);
    saveStoredExpenses(updatedList);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedList = expenses.filter(e => e.id !== id);
    setExpenses(updatedList);
    saveStoredExpenses(updatedList);
  };

  const handleUpdateSavings = (newSavings: Partial<SavingsGoal>) => {
    const updated = { ...savings, ...newSavings };
    setSavings(updated);
    saveStoredSavings(updated);
    if (newSavings.currentSaved !== undefined) {
      handleUpdateStats({ savings: newSavings.currentSaved });
    }
  };

  const handleToggleRoadmapNode = (nodeId: string) => {
    let updatedNodes: string[];
    if (completedRoadmapNodes.includes(nodeId)) {
      updatedNodes = completedRoadmapNodes.filter(id => id !== nodeId);
    } else {
      updatedNodes = [...completedRoadmapNodes, nodeId];
    }
    setCompletedRoadmapNodes(updatedNodes);
    saveCompletedRoadmapNodes(updatedNodes);
    handleUpdateStats({ skillsCompleted: updatedNodes.length });
  };

  const handleAddGrade = (grade: Omit<SubjectGrade, 'id'>) => {
    const newGrade: SubjectGrade = { ...grade, id: Date.now().toString() };
    const updated = [...grades, newGrade];
    setGrades(updated);
    saveStoredGrades(updated);
  };

  const handleDeleteGrade = (id: string) => {
    const updated = grades.filter(g => g.id !== id);
    setGrades(updated);
    saveStoredGrades(updated);
  };

  const handleAddDeadline = (deadline: Omit<ExamDeadline, 'id'>) => {
    const newDL: ExamDeadline = { ...deadline, id: Date.now().toString() };
    const updated = [newDL, ...deadlines];
    setDeadlines(updated);
    saveStoredDeadlines(updated);
  };

  const handleDeleteDeadline = (id: string) => {
    const updated = deadlines.filter(d => d.id !== id);
    setDeadlines(updated);
    saveStoredDeadlines(updated);
  };

  const handleAddTimetableSlot = (slot: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = { ...slot, id: Date.now().toString() };
    const updated = [...timetable, newSlot];
    setTimetable(updated);
    saveStoredTimetable(updated);
  };

  const handleDeleteTimetableSlot = (id: string) => {
    const updated = timetable.filter(t => t.id !== id);
    setTimetable(updated);
    saveStoredTimetable(updated);
  };

  const handleUpdateAttendance = (subjectName: string, deltaAttended: number, deltaTotal: number) => {
    const updated = attendance.map(att => {
      if (att.subject === subjectName) {
        return {
          ...att,
          attended: att.attended + deltaAttended,
          totalClasses: att.totalClasses + deltaTotal
        };
      }
      return att;
    });
    setAttendance(updated);
    saveStoredAttendance(updated);
  };

  const handleUpdateResume = (newResume: StudentResume) => {
    setResume(newResume);
    saveStoredResume(newResume);
  };

  const isDark = theme === 'dark';
  const isRtl = lang === 'ar' || lang === 'ur';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        brandName={brandName}
        onSelectBrand={handleSelectBrand}
        studyStreak={stats.studyStreak}
        onCheckInStreak={handleCheckInStreak}
        hasCheckedInToday={hasCheckedInToday}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        lang={lang}
        onSelectLanguage={handleSelectLanguage}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Button Bar (Visible on all tool pages) */}
        {activeTab !== 'dashboard' && (
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/30 animate-in fade-in">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800 hover:border-emerald-500/50 hover:text-emerald-300' 
                  : 'bg-white border-slate-200 text-emerald-700 hover:bg-slate-50 hover:border-emerald-500/50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Home / All Tools</span>
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-800/40 px-3 py-1 rounded-full border border-slate-700/30">
              {activeTab.replace('-', ' ')}
            </span>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <DashboardHeader
            stats={stats}
            onUpdateStats={handleUpdateStats}
            theme={theme}
            onSelectTab={setActiveTab}
            userProfile={userProfile}
            brandName={brandName}
            lang={lang}
            onResetAllData={handleResetAllData}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {activeTab === 'gpa-calc' && (
          <GPACalculator
            grades={grades}
            onAddGrade={handleAddGrade}
            onDeleteGrade={handleDeleteGrade}
            theme={theme}
            onBackToHome={() => setActiveTab('dashboard')}
            lang={lang}
          />
        )}

        {activeTab === 'exam-countdown' && (
          <ExamCountdown
            deadlines={deadlines}
            onAddDeadline={handleAddDeadline}
            onDeleteDeadline={handleDeleteDeadline}
            theme={theme}
          />
        )}

        {activeTab === 'class-timetable' && (
          <ClassTimetable
            timetable={timetable}
            attendance={attendance}
            onAddSlot={handleAddTimetableSlot}
            onDeleteSlot={handleDeleteTimetableSlot}
            onUpdateAttendance={handleUpdateAttendance}
            theme={theme}
          />
        )}

        {activeTab === 'resume-builder' && (
          <ResumeBuilder
            resume={resume}
            onUpdateResume={handleUpdateResume}
            theme={theme}
          />
        )}

        {activeTab === 'course-finder' && (
          <CourseFinder theme={theme} />
        )}

        {activeTab === 'money-tracker' && (
          <MoneyTracker
            expenses={expenses}
            savings={savings}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onUpdateSavings={handleUpdateSavings}
            theme={theme}
          />
        )}

        {activeTab === 'study-assistant' && (
          <StudyAssistant theme={theme} />
        )}

        {activeTab === 'scholarship-finder' && (
          <ScholarshipFinder theme={theme} />
        )}

        {activeTab === 'doc-tools' && (
          <DocumentTools theme={theme} />
        )}

        {activeTab === 'career-roadmap' && (
          <CareerRoadmap
            completedNodeIds={completedRoadmapNodes}
            onToggleNodeCompletion={handleToggleRoadmapNode}
            theme={theme}
          />
        )}

        {activeTab === 'ai-chat' && (
          <AIChatAssistant theme={theme} />
        )}

        {activeTab === 'caption-gen' && (
          <CaptionGenerator theme={theme} />
        )}

      </main>

      {/* Auth Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        theme={theme}
      />

      {/* Onboarding Guide Tutorial Modal */}
      <OnboardingTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        theme={theme}
        lang={lang}
      />

      {/* Footer */}
      <footer className={`py-6 border-t mt-12 text-center text-xs ${
        isDark ? 'border-slate-800 text-slate-500 bg-slate-950' : 'border-slate-200 text-slate-600 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🚀 <strong>{brandName}</strong> — All-in-One Student Ecosystem
          </div>
          <div>
            Built with React, TypeScript & Tailwind CSS • Multi-Language Support
          </div>
        </div>
      </footer>
    </div>
  );
};
