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

// --- NEW TOOLS INTERFACES ---

// 1. GPA Calculator
export interface SubjectGrade {
  id: string;
  code: string;
  name: string;
  credits: number;
  gradePoint: number; // e.g., 10 for O, 9 for A+, 8 for A, 7 for B+, 6 for B, 5 for C, 0 for F
  gradeLetter: string;
}

export interface SemesterGPA {
  semester: number;
  subjects: SubjectGrade[];
}

// 2. Exam Countdown
export interface ExamDeadline {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // ISO date string YYYY-MM-DDTHH:mm
  priority: 'High' | 'Medium' | 'Low';
  category: 'Exam' | 'Project Assignment' | 'Lab Viva' | 'Quiz';
}

// 3. Class Timetable & Attendance Log
export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeSlot: string; // e.g., "09:00 AM - 10:00 AM"
  subject: string;
  room: string;
  teacher: string;
}

export interface SubjectAttendance {
  subject: string;
  attended: number;
  totalClasses: number;
}

// 4. Student Resume Builder
export interface StudentResume {
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  degree: string;
  college: string;
  graduationYear: string;
  cgpa: string;
  skills: string[];
  projects: { title: string; description: string; tech: string }[];
  certifications: string[];
}
