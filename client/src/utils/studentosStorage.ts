import { StudentStats, ExpenseItem, SavingsGoal, BrandName, ThemeMode, UserProfile } from '../types/studentos';

const STORAGE_KEYS = {
  STATS: 'studently_stats',
  EXPENSES: 'studently_expenses',
  SAVINGS: 'studently_savings',
  BRAND: 'studently_brand',
  THEME: 'studently_theme',
  COMPLETED_NODES: 'studently_completed_nodes',
  USER_PROFILE: 'studently_user_profile',
};

const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Student',
  email: 'alex@student.edu',
  college: 'Sirajul Huda Campus',
  course: 'BCA (Computer Applications)',
  isLoggedIn: true,
};

const DEFAULT_STATS: StudentStats = {
  careerGoal: 'Software Developer',
  skillsCompleted: 4,
  totalSkills: 10,
  savings: 3500,
  scholarshipsFound: 7,
  studyStreak: 12,
  lastStreakDate: new Date().toISOString().split('T')[0],
};

const DEFAULT_SAVINGS: SavingsGoal = {
  targetAmount: 10000,
  currentSaved: 3500,
  monthlyBudget: 5000,
};

const DEFAULT_EXPENSES: ExpenseItem[] = [
  { id: '1', title: 'College Textbooks', amount: 1200, category: 'Books & Supplies', date: new Date().toISOString().split('T')[0] },
  { id: '2', title: 'Canteen & Coffee', amount: 350, category: 'Food', date: new Date().toISOString().split('T')[0] },
  { id: '3', title: 'Bus Monthly Pass', amount: 600, category: 'Transport', date: new Date().toISOString().split('T')[0] },
  { id: '4', title: 'Spotify Student', amount: 59, category: 'Subscriptions', date: new Date().toISOString().split('T')[0] },
  { id: '5', title: 'Weekend Movie & Snack', amount: 450, category: 'Outings', date: new Date().toISOString().split('T')[0] },
];

export const getStoredTheme = (): ThemeMode => {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  return (saved as ThemeMode) || 'dark';
};

export const setStoredTheme = (theme: ThemeMode) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const getStoredBrand = (): BrandName => {
  const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
  return (saved as BrandName) || 'Studently';
};

export const setStoredBrand = (brand: BrandName) => {
  localStorage.setItem(STORAGE_KEYS.BRAND, brand);
};

export const getStoredUserProfile = (): UserProfile => {
  const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  }
  return DEFAULT_USER_PROFILE;
};

export const saveStoredUserProfile = (profile: UserProfile) => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

export const getStoredStats = (): StudentStats => {
  const saved = localStorage.getItem(STORAGE_KEYS.STATS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_STATS;
    }
  }
  return DEFAULT_STATS;
};

export const saveStoredStats = (stats: StudentStats) => {
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};

export const getStoredExpenses = (): ExpenseItem[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_EXPENSES;
    }
  }
  return DEFAULT_EXPENSES;
};

export const saveStoredExpenses = (expenses: ExpenseItem[]) => {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
};

export const getStoredSavings = (): SavingsGoal => {
  const saved = localStorage.getItem(STORAGE_KEYS.SAVINGS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_SAVINGS;
    }
  }
  return DEFAULT_SAVINGS;
};

export const saveStoredSavings = (savings: SavingsGoal) => {
  localStorage.setItem(STORAGE_KEYS.SAVINGS, JSON.stringify(savings));
};

export const getCompletedRoadmapNodes = (): string[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_NODES);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return ['bca-html-css', 'bca-js', 'bca-git', 'bca-python'];
    }
  }
  return ['bca-html-css', 'bca-js', 'bca-git', 'bca-python'];
};

export const saveCompletedRoadmapNodes = (nodes: string[]) => {
  localStorage.setItem(STORAGE_KEYS.COMPLETED_NODES, JSON.stringify(nodes));
};
