import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Flame, 
  ChevronDown, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Search, 
  Compass, 
  Bot, 
  PenTool, 
  Home,
  Calculator,
  Timer,
  Calendar,
  LogIn
} from 'lucide-react';
import { BrandName, ThemeMode, UserProfile } from '../../types/studentos';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  brandName: BrandName;
  onSelectBrand: (brand: BrandName) => void;
  studyStreak: number;
  onCheckInStreak: () => void;
  hasCheckedInToday: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userProfile: UserProfile;
  onOpenAuthModal: () => void;
}

const BRAND_OPTIONS: BrandName[] = [
  'Studently',
  'StudentOS',
  'StudyNest',
  'EduHub',
  'CampusKit',
  'StudyMate'
];

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  brandName,
  onSelectBrand,
  studyStreak,
  onCheckInStreak,
  hasCheckedInToday,
  activeTab,
  onSelectTab,
  userProfile,
  onOpenAuthModal
}) => {
  const [showBrandMenu, setShowBrandMenu] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'gpa-calc', label: 'GPA Calc', icon: Calculator },
    { id: 'exam-countdown', label: 'Deadlines', icon: Timer },
    { id: 'class-timetable', label: 'Timetable', icon: Calendar },
    { id: 'resume-builder', label: 'Resume CV', icon: FileText },
    { id: 'course-finder', label: 'Course Finder', icon: GraduationCap },
    { id: 'money-tracker', label: 'Money Tracker', icon: DollarSign },
    { id: 'study-assistant', label: 'Study Assistant', icon: BookOpen },
    { id: 'scholarship-finder', label: 'Scholarships', icon: Search },
    { id: 'doc-tools', label: 'Doc Tools', icon: FileText },
    { id: 'career-roadmap', label: 'Career Roadmap', icon: Compass },
    { id: 'ai-chat', label: 'AI Assistant', icon: Bot },
    { id: 'caption-gen', label: 'Caption Gen', icon: PenTool },
  ];

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950/80 border-slate-800 text-slate-100' 
        : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Name Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button 
                onClick={() => setShowBrandMenu(!showBrandMenu)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 font-bold text-lg tracking-tight ${
                  isDark 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 text-white' 
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-500/50 text-slate-900'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {brandName}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>

              {showBrandMenu && (
                <div className={`absolute left-0 mt-2 w-48 rounded-2xl shadow-2xl border p-2 z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="text-xs font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Select App Branding
                  </div>
                  {BRAND_OPTIONS.map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        onSelectBrand(name);
                        setShowBrandMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                        brandName === name 
                          ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                          : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      {name}
                      {brandName === name && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className={`hidden sm:inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
              isDark ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              v3.5 All-in-One
            </span>
          </div>

          {/* Quick Actions: Streak, Sign In / Profile, Theme Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Dynamic Streak Counter */}
            <button
              onClick={onCheckInStreak}
              disabled={hasCheckedInToday}
              title={hasCheckedInToday ? 'Already checked in today!' : 'Click to log today\'s study streak!'}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-extrabold transition-all duration-300 ${
                hasCheckedInToday
                  ? isDark 
                    ? 'bg-orange-950/40 border-orange-800/60 text-orange-400'
                    : 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Flame className={`w-4 h-4 ${hasCheckedInToday ? 'text-orange-500' : 'text-yellow-200 animate-bounce'}`} />
              <span>{studyStreak} Days Streak</span>
              {!hasCheckedInToday && (
                <span className="text-[10px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                  +1 Check-in
                </span>
              )}
            </button>

            {/* Auth Profile / Sign In Button */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                userProfile.isLoggedIn
                  ? isDark 
                    ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-emerald-500/50' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:opacity-95'
              }`}
            >
              {userProfile.isLoggedIn ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Sign Up</span>
                </>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-400/50' 
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:border-indigo-400'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation Scrollable Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
