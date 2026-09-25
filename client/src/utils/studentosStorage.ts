import { 
  StudentStats, 
  ExpenseItem, 
  SavingsGoal, 
  BrandName, 
  ThemeMode, 
  UserProfile,
  SubjectGrade,
  ExamDeadline,
  TimetableSlot,
  SubjectAttendance,
  StudentResume
} from '../types/studentos';

const STORAGE_KEYS = {
  STATS: 'studently_stats',
  EXPENSES: 'studently_expenses',
  SAVINGS: 'studently_savings',
  BRAND: 'studently_brand',
  THEME: 'studently_theme',
  COMPLETED_NODES: 'studently_completed_nodes',
  USER_PROFILE: 'studently_user_profile',
  GRADES: 'studently_grades',
  DEADLINES: 'studently_deadlines',
  TIMETABLE: 'studently_timetable',
  ATTENDANCE: 'studently_attendance',
  RESUME: 'studently_resume',
};

const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Nashwan PP',
  email: 'nashwan@student.edu',
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

const DEFAULT_GRADES: SubjectGrade[] = [
  { id: 'g1', code: 'BCA101', name: 'Programming in C & C++', credits: 4, gradePoint: 10, gradeLetter: 'O' },
  { id: 'g2', code: 'BCA102', name: 'Data Structures & Algorithms', credits: 4, gradePoint: 9, gradeLetter: 'A+' },
  { id: 'g3', code: 'BCA103', name: 'Database Management (SQL)', credits: 3, gradePoint: 9, gradeLetter: 'A+' },
  { id: 'g4', code: 'BCA104', name: 'Web Technology (HTML/CSS/JS)', credits: 3, gradePoint: 10, gradeLetter: 'O' },
  { id: 'g5', code: 'BCA105', name: 'Discrete Mathematics', credits: 3, gradePoint: 8, gradeLetter: 'A' },
];

const DEFAULT_DEADLINES: ExamDeadline[] = [
  { id: 'd1', title: 'End Semester Theory Exam: Data Structures', subject: 'DSA', dueDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 16), priority: 'High', category: 'Exam' },
  { id: 'd2', title: 'Studently Web App Final Submission', subject: 'Web Dev Lab', dueDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 16), priority: 'High', category: 'Project Assignment' },
  { id: 'd3', title: 'SQL & Database Design Viva', subject: 'DBMS', dueDate: new Date(Date.now() + 8 * 86400000).toISOString().slice(0, 16), priority: 'Medium', category: 'Lab Viva' },
];

const DEFAULT_TIMETABLE: TimetableSlot[] = [
  { id: 't1', day: 'Monday', timeSlot: '09:30 AM - 10:30 AM', subject: 'Data Structures', room: 'Lab 2', teacher: 'Prof. Rafeeq' },
  { id: 't2', day: 'Monday', timeSlot: '10:30 AM - 11:30 AM', subject: 'DBMS (SQL)', room: 'Room 304', teacher: 'Dr. Shahina' },
  { id: 't3', day: 'Tuesday', timeSlot: '09:30 AM - 10:30 AM', subject: 'Web Technologies', room: 'Lab 1', teacher: 'Prof. Siraj' },
  { id: 't4', day: 'Wednesday', timeSlot: '11:30 AM - 12:30 PM', subject: 'Python Programming', room: 'Lab 3', teacher: 'Prof. Anupama' },
  { id: 't5', day: 'Thursday', timeSlot: '02:00 PM - 03:30 PM', subject: 'Computer Networks', room: 'Room 201', teacher: 'Dr. Usman' },
];

const DEFAULT_ATTENDANCE: SubjectAttendance[] = [
  { subject: 'Data Structures', attended: 28, totalClasses: 32 },
  { subject: 'DBMS (SQL)', attended: 25, totalClasses: 28 },
  { subject: 'Web Technologies', attended: 30, totalClasses: 30 },
  { subject: 'Python Programming', attended: 22, totalClasses: 25 },
];

const DEFAULT_RESUME: StudentResume = {
  fullName: 'Nashwan PP',
  email: 'nashwan@student.edu',
  phone: '+91 98765 43210',
  github: 'github.com/naswn',
  linkedin: 'linkedin.com/in/naswn',
  summary: 'Passionate 1st year BCA Student & Web Developer experienced in building full-stack React, TypeScript, and Node.js applications. Creator of Studently All-in-One Student Ecosystem.',
  degree: 'Bachelor of Computer Applications (BCA)',
  college: 'Sirajul Huda Campus',
  graduationYear: '2027',
  cgpa: '9.2 / 10',
  skills: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Python', 'Git/GitHub', 'SQL'],
  projects: [
    { title: 'Studently — All-in-One Student AI Toolbox', description: 'Built full-featured web app with 12 student mini-tools including GPA calculator, notes summarizer, passport photo maker, and expense tracker.', tech: 'React 18, TypeScript, Tailwind CSS, Recharts' },
    { title: 'College Attendance & Leave Management Portal', description: 'Developed student attendance tracking system with monthly report exports and risk alerts.', tech: 'Node.js, Express, Prisma DB, SQLite' }
  ],
  certifications: ['Responsive Web Design (freeCodeCamp)', 'Python for Data Science (Coursera)']
};

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

// NEW TOOL STORAGES

export const getStoredGrades = (): SubjectGrade[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.GRADES);
  if (saved) {
    try { return JSON.parse(saved); } catch { return DEFAULT_GRADES; }
  }
  return DEFAULT_GRADES;
};

export const saveStoredGrades = (grades: SubjectGrade[]) => {
  localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
};

export const getStoredDeadlines = (): ExamDeadline[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.DEADLINES);
  if (saved) {
    try { return JSON.parse(saved); } catch { return DEFAULT_DEADLINES; }
  }
  return DEFAULT_DEADLINES;
};

export const saveStoredDeadlines = (deadlines: ExamDeadline[]) => {
  localStorage.setItem(STORAGE_KEYS.DEADLINES, JSON.stringify(deadlines));
};

export const getStoredTimetable = (): TimetableSlot[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
  if (saved) {
    try { return JSON.parse(saved); } catch { return DEFAULT_TIMETABLE; }
  }
  return DEFAULT_TIMETABLE;
};

export const saveStoredTimetable = (timetable: TimetableSlot[]) => {
  localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
};

export const getStoredAttendance = (): SubjectAttendance[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  if (saved) {
    try { return JSON.parse(saved); } catch { return DEFAULT_ATTENDANCE; }
  }
  return DEFAULT_ATTENDANCE;
};

export const saveStoredAttendance = (attendance: SubjectAttendance[]) => {
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
};

export const getStoredResume = (): StudentResume => {
  const saved = localStorage.getItem(STORAGE_KEYS.RESUME);
  if (saved) {
    try { return JSON.parse(saved); } catch { return DEFAULT_RESUME; }
  }
  return DEFAULT_RESUME;
};

export const saveStoredResume = (resume: StudentResume) => {
  localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resume));
};
