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
  LogIn,
  Globe,
  BookMarked
} from 'lucide-react';
import { BrandName, ThemeMode, UserProfile, LanguageCode } from '../../types/studentos';
import { TRANSLATIONS } from '../../utils/i18n';

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
  lang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenTutorial: () => void;
}

const BRAND_OPTIONS: BrandName[] = [
  'Studently',
  'StudentOS',
  'StudyNest',
  'EduHub',
  'CampusKit',
  'StudyMate'
];

const LANG_OPTIONS: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' }
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
  onOpenAuthModal,
  lang,
  onSelectLanguage,
  onOpenTutorial
}) => {
  const [showBrandMenu, setShowBrandMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const currentLangObj = LANG_OPTIONS.find(l => l.code === lang) || LANG_OPTIONS[0];

  const tabs = [
    { id: 'dashboard', label: t.home, icon: Home },
    { id: 'gpa-calc', label: t.gpaCalc, icon: Calculator },
    { id: 'exam-countdown', label: t.deadlines, icon: Timer },
    { id: 'class-timetable', label: t.timetable, icon: Calendar },
    { id: 'resume-builder', label: t.resumeCv, icon: FileText },
    { id: 'course-finder', label: t.courseFinder, icon: GraduationCap },
    { id: 'money-tracker', label: t.moneyTracker, icon: DollarSign },
    { id: 'study-assistant', label: t.studyAssistant, icon: BookOpen },
    { id: 'scholarship-finder', label: t.scholarships, icon: Search },
    { id: 'doc-tools', label: t.docTools, icon: FileText },
    { id: 'career-roadmap', label: t.careerRoadmap, icon: Compass },
    { id: 'ai-chat', label: t.aiAssistant, icon: Bot },
    { id: 'caption-gen', label: t.captionGen, icon: PenTool },
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
          
          {/* Fixed Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 font-bold text-lg tracking-tight ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 text-white' 
                  : 'bg-slate-50 border-slate-200 hover:border-emerald-500/50 text-slate-900'
              }`}
              title="Studently Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Studently
              </span>
            </button>

            {/* App Guide Tutorial Button */}
            <button
              onClick={onOpenTutorial}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-purple-400 hover:border-purple-500/50' 
                  : 'bg-purple-50 border-purple-200 text-purple-700'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>{t.guideTutorial}</span>
            </button>
          </div>

          {/* Quick Actions: Language, Streak, Sign In / Profile, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentLangObj.flag} {currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className={`absolute right-0 mt-2 w-40 rounded-2xl shadow-2xl border p-2 z-50 animate-in fade-in zoom-in-95 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="text-[10px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    {t.selectLanguage}
                  </div>
                  {LANG_OPTIONS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onSelectLanguage(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        lang === l.code 
                          ? 'bg-cyan-500/10 text-cyan-400 font-bold' 
                          : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      <span>{l.flag} {l.label}</span>
                      {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Streak Counter */}
            <button
              onClick={onCheckInStreak}
              disabled={hasCheckedInToday}
              title={hasCheckedInToday ? 'Already checked in today!' : 'Click to log today\'s study streak!'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                hasCheckedInToday
                  ? isDark 
                    ? 'bg-orange-950/40 border-orange-800/60 text-orange-400'
                    : 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Flame className={`w-4 h-4 ${hasCheckedInToday ? 'text-orange-500' : 'text-yellow-200 animate-bounce'}`} />
              <span>{studyStreak} {t.streak}</span>
              {!hasCheckedInToday && (
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded">
                  {t.checkIn}
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
                  <span className="hidden sm:inline max-w-[90px] truncate">{userProfile.name}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.signInSignUp}</span>
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
