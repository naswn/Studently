import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  LogOut, 
  CheckCircle2,
  UserPlus,
  LogIn
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../../types/studentos';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  theme: ThemeMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  theme
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'profile'>(
    userProfile.isLoggedIn ? 'profile' : 'signin'
  );

  // Sign In Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpCollege, setSignUpCollege] = useState('');
  const [signUpCourse, setSignUpCourse] = useState('BCA (Computer Applications)');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      name: signInEmail ? signInEmail.split('@')[0] : 'Student User',
      email: signInEmail || 'student@college.edu',
      college: 'Sirajul Huda Campus',
      course: 'BCA (Computer Applications)',
      isLoggedIn: true,
    };
    onUpdateProfile(updated);
    setNotification('Successfully signed in to Studently!');
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1200);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim()) return;

    const updated: UserProfile = {
      name: signUpName.trim(),
      email: signUpEmail.trim(),
      college: signUpCollege.trim() || 'Sirajul Huda Campus',
      course: signUpCourse,
      isLoggedIn: true,
    };
    onUpdateProfile(updated);
    setNotification('Welcome to Studently! Your account has been created.');
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1200);
  };

  const handleLogout = () => {
    onUpdateProfile({
      name: 'Guest Student',
      email: '',
      college: '',
      course: '',
      isLoggedIn: false,
    });
    setActiveTab('signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Studently Account
            </h2>
            <p className="text-xs text-slate-400">
              {userProfile.isLoggedIn ? 'Manage your student profile' : 'Sign in or create a student account'}
            </p>
          </div>
        </div>

        {/* Alert notification */}
        {notification && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {notification}
          </div>
        )}

        {/* User Profile View (When Logged In) */}
        {userProfile.isLoggedIn && activeTab === 'profile' ? (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{userProfile.name}</h3>
                  <p className="text-xs text-slate-400">{userProfile.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/40 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>College: <strong>{userProfile.college}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Course: <strong>{userProfile.course}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shadow-md"
              >
                Continue to Studently
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Forms */
          <div className="space-y-6">
            {/* Tab Switches */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-950/60 border border-slate-800">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signin'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="student@college.edu"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
                >
                  Sign In to Studently
                </button>
              </form>
            )}

            {/* TAB 2: SIGN UP */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Nashwan PP"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                      className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border outline-none font-medium ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="nashwan@student.edu"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border outline-none font-medium ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sirajul Huda Campus"
                    value={signUpCollege}
                    onChange={(e) => setSignUpCollege(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Course / Stream
                  </label>
                  <select
                    value={signUpCourse}
                    onChange={(e) => setSignUpCourse(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="BCA (Computer Applications)">BCA (Computer Applications)</option>
                    <option value="B.Tech CS / AI">B.Tech Computer Science / AI</option>
                    <option value="B.Sc Cyber Security / Data Science">B.Sc Cyber Security / Data Science</option>
                    <option value="B.Com / BBA Management">B.Com / BBA Management</option>
                    <option value="Plus Two / Higher Secondary">Plus Two / Higher Secondary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password..."
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
                >
                  Create Account & Start
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
