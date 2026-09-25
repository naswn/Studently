import React, { useState } from 'react';
import { 
  Target, 
  BookCheck, 
  PiggyBank, 
  Award, 
  Flame, 
  Edit3, 
  Check, 
  ArrowRight,
  Sparkles,
  BookOpen,
  DollarSign,
  GraduationCap,
  FileText,
  Compass,
  Bot,
  PenTool,
  Calculator,
  Timer,
  Calendar,
  Plus,
  Minus
} from 'lucide-react';
import { StudentStats, ThemeMode, UserProfile, BrandName } from '../../types/studentos';

interface DashboardHeaderProps {
  stats: StudentStats;
  onUpdateStats: (newStats: Partial<StudentStats>) => void;
  theme: ThemeMode;
  onSelectTab: (tabId: string) => void;
  userProfile: UserProfile;
  brandName: BrandName;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  stats,
  onUpdateStats,
  theme,
  onSelectTab,
  userProfile,
  brandName
}) => {
  const isDark = theme === 'dark';
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(stats.careerGoal);

  const handleSaveGoal = () => {
    if (goalInput.trim()) {
      onUpdateStats({ careerGoal: goalInput.trim() });
    }
    setIsEditingGoal(false);
  };

  const handleAdjustStreak = (delta: number) => {
    const newStreak = Math.max(0, stats.studyStreak + delta);
    onUpdateStats({ studyStreak: newStreak });
  };

  const skillsPercentage = Math.round((stats.skillsCompleted / stats.totalSkills) * 100);

  const miniToolsList = [
    {
      id: 'gpa-calc',
      title: 'GPA / CGPA Calculator',
      desc: 'Calculate semester grades, credit points & convert CGPA to percentage',
      icon: Calculator,
      gradient: 'from-emerald-500 to-cyan-600',
      badge: 'Academics'
    },
    {
      id: 'exam-countdown',
      title: 'Exam Countdown',
      desc: 'Real-time countdown timer for upcoming exams & project submission deadlines',
      icon: Timer,
      gradient: 'from-amber-500 to-rose-600',
      badge: 'Deadlines'
    },
    {
      id: 'class-timetable',
      title: 'Class Timetable',
      desc: 'Weekly class schedule grid & subject-wise 75%+ attendance logger',
      icon: Calendar,
      gradient: 'from-cyan-500 to-blue-600',
      badge: 'Schedule'
    },
    {
      id: 'resume-builder',
      title: 'Resume CV Builder',
      desc: 'ATS-friendly student resume builder with live A4 preview & PDF download',
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      badge: 'Career'
    },
    {
      id: 'course-finder',
      title: 'Course Finder',
      desc: 'Discover suitable degree programs & colleges by percentage & budget',
      icon: GraduationCap,
      gradient: 'from-indigo-500 to-purple-600',
      badge: 'College'
    },
    {
      id: 'money-tracker',
      title: 'Money Tracker',
      desc: 'Log expenses, track monthly budgets & hit your savings goals',
      icon: DollarSign,
      gradient: 'from-teal-500 to-emerald-600',
      badge: 'Finance'
    },
    {
      id: 'study-assistant',
      title: 'Study Assistant',
      desc: 'Summarize notes, generate instant quizzes & practice flashcards',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-600',
      badge: 'AI Powered'
    },
    {
      id: 'scholarship-finder',
      title: 'Scholarship Finder',
      desc: 'Match government & private scholarships for your stream',
      icon: Award,
      gradient: 'from-amber-500 to-orange-600',
      badge: 'Grants'
    },
    {
      id: 'doc-tools',
      title: 'Document Tools',
      desc: 'Passport photo creator, image to PDF & A4 format previewer',
      icon: FileText,
      gradient: 'from-cyan-500 to-teal-600',
      badge: 'Utilities'
    },
    {
      id: 'career-roadmap',
      title: 'Career Roadmap',
      desc: 'Interactive step-by-step career skill tree from BCA/CS to Developer',
      icon: Compass,
      gradient: 'from-violet-500 to-purple-600',
      badge: 'Roadmap'
    },
    {
      id: 'ai-chat',
      title: 'AI Chat Assistant',
      desc: 'Personalized AI assistant for homework, code & student queries',
      icon: Bot,
      gradient: 'from-rose-500 to-pink-600',
      badge: 'Smart AI'
    },
    {
      id: 'caption-gen',
      title: 'Caption Generator',
      desc: 'Create catchy social media captions for study & campus moments',
      icon: PenTool,
      gradient: 'from-fuchsia-500 to-rose-600',
      badge: 'Social'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome & Personal Dashboard Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-br from-white via-emerald-50/40 to-slate-50 border-slate-200'
      }`}>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {brandName} — All-in-One Student Command Center
              </div>
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {userProfile.isLoggedIn ? (
                  <>Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{userProfile.name}! 👋</span></>
                ) : (
                  <>Your student life, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">organized.</span></>
                )}
              </h1>
              <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Manage your GPA, study goals, timetable, resume, money, documents, and career roadmaps in one seamless ecosystem.
              </p>
            </div>

            {/* Editable Career Goal Badge */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center justify-between gap-2">
                <span>🎯 Target Career Goal</span>
                {!isEditingGoal && (
                  <button 
                    onClick={() => setIsEditingGoal(true)}
                    className="text-emerald-400 hover:text-emerald-300 p-1"
                    title="Edit Career Goal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {isEditingGoal ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className={`px-3 py-1 text-sm rounded-lg border outline-none font-bold ${
                      isDark ? 'bg-slate-900 border-emerald-500 text-white' : 'bg-slate-50 border-emerald-500 text-slate-900'
                    }`}
                    autoFocus
                  />
                  <button 
                    onClick={handleSaveGoal}
                    className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-base font-extrabold text-emerald-400 mt-1">
                  {stats.careerGoal}
                </div>
              )}
            </div>
          </div>

          {/* Progress Dashboard Grid - 5 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            
            {/* Card 1: Career Goal */}
            <div className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-blue-400 mb-2">
                <Target className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-400">
                  Target
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-400">Career Goal</div>
              <div className="text-sm font-bold text-slate-200 truncate mt-0.5">{stats.careerGoal}</div>
            </div>

            {/* Card 2: Skills Completed */}
            <div className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <BookCheck className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full text-emerald-400">
                  {skillsPercentage}%
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-400">Skills Completed</div>
              <div className="text-lg font-extrabold text-slate-100 mt-0.5">
                {stats.skillsCompleted} <span className="text-xs font-normal text-slate-400">/ {stats.totalSkills}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${skillsPercentage}%` }}
                />
              </div>
            </div>

            {/* Card 3: Savings */}
            <div className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-teal-400 mb-2">
                <PiggyBank className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded-full text-teal-400">
                  Saved
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-400">Savings</div>
              <div className="text-lg font-extrabold text-slate-100 mt-0.5">
                ₹{stats.savings.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Card 4: Scholarships Found */}
            <div className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full text-amber-400">
                  Eligible
                </span>
              </div>
              <div className="text-[11px] font-medium text-slate-400">Scholarships Found</div>
              <div className="text-lg font-extrabold text-slate-100 mt-0.5">
                {stats.scholarshipsFound} <span className="text-xs font-normal text-slate-400">Matches</span>
              </div>
            </div>

            {/* Card 5: Dynamic Study Streak Counter */}
            <div className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-orange-400 mb-2">
                <Flame className="w-5 h-5 animate-pulse" />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAdjustStreak(-1)}
                    className="p-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
                    title="Decrease streak"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleAdjustStreak(1)}
                    className="p-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
                    title="Increase streak"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-[11px] font-medium text-slate-400">Study Streak</div>
              <div className="text-lg font-extrabold text-slate-100 mt-0.5">
                {stats.studyStreak} <span className="text-xs font-normal text-slate-400">Days 🔥</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mini-Tools Quick Launch Section (12 Tools) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🛠️ {brandName} All-in-One Toolbox (12 Mini-Tools)
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select any mini-tool below to start managing study, GPA, money, documents, or career opportunities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {miniToolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTab(tool.id)}
                className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/10' 
                    : 'bg-white border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.gradient} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {tool.badge}
                  </span>
                </div>
                <h3 className={`text-base font-bold group-hover:text-emerald-400 transition-colors ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {tool.title}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {tool.desc}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
                  Open Tool <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
