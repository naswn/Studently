import React, { useState, useEffect } from 'react';
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

import { 
  BrandName, 
  ThemeMode, 
  StudentStats, 
  ExpenseItem, 
  SavingsGoal,
  UserProfile
} from '../types/studentos';

import {
  getStoredTheme,
  setStoredTheme,
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
  saveStoredUserProfile
} from '../utils/studentosStorage';

export const StudentOSPage: React.FC = () => {
  // Theme & Branding (Default: Studently)
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [brandName, setBrandName] = useState<BrandName>(getStoredBrand);

  // Active Tab Navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // User Profile & Auth Modal
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Student State
  const [stats, setStats] = useState<StudentStats>(getStoredStats);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(getStoredExpenses);
  const [savings, setSavings] = useState<SavingsGoal>(getStoredSavings);
  const [completedRoadmapNodes, setCompletedRoadmapNodes] = useState<string[]>(getCompletedRoadmapNodes);

  // Sync theme class to document body root
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

  const handleSelectBrand = (newBrand: BrandName) => {
    setBrandName(newBrand);
    setStoredBrand(newBrand);
  };

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveStoredUserProfile(newProfile);
  };

  // Streak check-in logic (Increments dynamic study streak counter)
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

  // Stats updates
  const handleUpdateStats = (newStats: Partial<StudentStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    saveStoredStats(updated);
  };

  // Expense handlers
  const handleAddExpense = (item: Omit<ExpenseItem, 'id'>) => {
    const newExpense: ExpenseItem = {
      ...item,
      id: Date.now().toString()
    };
    const updatedList = [newExpense, ...expenses];
    setExpenses(updatedList);
    saveStoredExpenses(updatedList);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedList = expenses.filter(e => e.id !== id);
    setExpenses(updatedList);
    saveStoredExpenses(updatedList);
  };

  // Savings updates
  const handleUpdateSavings = (newSavings: Partial<SavingsGoal>) => {
    const updated = { ...savings, ...newSavings };
    setSavings(updated);
    saveStoredSavings(updated);

    // Sync savings display on main dashboard stats
    if (newSavings.currentSaved !== undefined) {
      handleUpdateStats({ savings: newSavings.currentSaved });
    }
  };

  // Career Roadmap node toggle handler
  const handleToggleRoadmapNode = (nodeId: string) => {
    let updatedNodes: string[];
    if (completedRoadmapNodes.includes(nodeId)) {
      updatedNodes = completedRoadmapNodes.filter(id => id !== nodeId);
    } else {
      updatedNodes = [...completedRoadmapNodes, nodeId];
    }
    setCompletedRoadmapNodes(updatedNodes);
    saveCompletedRoadmapNodes(updatedNodes);

    // Sync skillsCompleted metric on main dashboard
    handleUpdateStats({ skillsCompleted: updatedNodes.length });
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
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
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Render Tab Components */}
        {activeTab === 'dashboard' && (
          <DashboardHeader
            stats={stats}
            onUpdateStats={handleUpdateStats}
            theme={theme}
            onSelectTab={setActiveTab}
            userProfile={userProfile}
            brandName={brandName}
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

      {/* Footer */}
      <footer className={`py-6 border-t mt-12 text-center text-xs ${
        isDark ? 'border-slate-800 text-slate-500 bg-slate-950' : 'border-slate-200 text-slate-600 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🚀 <strong>{brandName}</strong> — All-in-One Student Ecosystem
          </div>
          <div>
            Built with React, TypeScript & Tailwind CSS • Made for Students
          </div>
        </div>
      </footer>
    </div>
  );
};
