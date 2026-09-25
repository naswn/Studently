export type ThemeMode = 'dark' | 'light';

export type BrandName = 
  | 'Studently'
  | 'StudentOS' 
  | 'StudyNest' 
  | 'EduHub' 
  | 'CampusKit' 
  | 'StudyMate';

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  course: string;
  isLoggedIn: boolean;
}

export interface StudentStats {
  careerGoal: string;
  skillsCompleted: number;
  totalSkills: number;
  savings: number;
  scholarshipsFound: number;
  studyStreak: number;
  lastStreakDate: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'Food' | 'Books & Supplies' | 'Transport' | 'Outings' | 'Subscriptions' | 'Other';
  date: string;
}

export interface SavingsGoal {
  targetAmount: number;
  currentSaved: number;
  monthlyBudget: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseMatch {
  id: string;
  courseName: string;
  stream: string;
  degree: string;
  colleges: string[];
  avgFeesPerYear: number;
  minPercentage: number;
  durationYears: number;
  careerProspects: string[];
  location: string;
  badge?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  offeredBy: string;
  amount: string;
  eligibility: string;
  stream: string;
  maxIncome: string;
  deadline: string;
  link: string;
  category: string;
  featured?: boolean;
}

export interface CareerNode {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  skills: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  stream: string;
  description: string;
  nodes: CareerNode[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
