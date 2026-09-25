# 🚀 Studently — All-in-One Student AI Ecosystem & Productivity Suite

![Studently Banner](https://img.shields.io/badge/Studently-Student%20AI%20Ecosystem-0d9488?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?style=for-the-badge&logo=tailwindcss)
![Multi-Language](https://img.shields.io/badge/Languages-EN%20|%20ML%20|%20AR%20|%20HI%20|%20UR-purple?style=for-the-badge)

**Studently** is an all-in-one web application and student productivity toolkit designed to help students track grades, manage exam deadlines, build professional ATS resumes, organize timetables, track expenses, generate study notes, and get instant 24/7 AI academic assistance.

---

## ✨ Features Included

### 📄 1. Professional ATS Resume Builder
- **3 Executive Templates**: *Executive Modern*, *Classic Corporate*, and *Minimal Tech*.
- **PDF-Only Download**: Scoped `@media print` CSS ensures clicking *Download PDF* exports ONLY the clean A4 resume sheet without any website headers or buttons.
- **Complete Sections**: Header details, Professional Summary, Education & CGPA, Work Experience & Internships, Key Projects with links, Skills, and Certifications.

### 📊 2. GPA & CGPA Percentage Calculator
- Calculate semester SGPA based on subject credits and grade points.
- Instant conversion between CGPA and Percentage.

### ⏰ 3. Exam & Project Deadline Countdown Timer
- Real-time live countdown clocks for upcoming exams, lab vivas, and project submissions.
- Categorized by priority (*High*, *Medium*, *Low*).

### 📅 4. Class Timetable & Attendance Logger
- Weekly schedule grid for Monday–Friday classes.
- Subject-wise attendance tracker enforcing a **75%+ attendance threshold** alert.

### 🤖 5. Student AI Assistant
- Multi-domain intelligent assistant for coding (Python, JS, React, C++, SQL), DSA concepts, exam revision strategies, resume tips, and academic queries.

### 📚 6. AI Study Assistant & Notes Toolkit
- **Notes Summarizer**: Paste lecture notes to generate bullet-point key takeaways.
- **MCQ Quiz Generator**: Automated practice quiz questions with instant feedback and explanations.
- **Interactive Flashcards**: Flip-card deck for fast active recall memory testing.
- **Pomodoro Study Timer**: 25-min focus sessions + 5-min break timers with session counters.

### 💰 7. Student Money & Budget Tracker
- Categorized expense logging (*Food*, *Books*, *Transport*, *Subscriptions*).
- Savings goals tracker and monthly budget management.

### 🎓 8. Course & Scholarship Finder
- Discover degree programs and eligible government/private scholarships filtered by stream and budget.

### 🗺️ 9. Interactive Career Skill Tree Roadmap
- Step-by-step technical roadmap for students (*HTML/CSS $\rightarrow$ JS $\rightarrow$ React $\rightarrow$ Full-Stack Developer*).

### 🌍 10. Multi-Language & RTL Layout Support
- Supported languages: **English (EN)**, **Malayalam (ML)**, **Arabic (AR)**, **Hindi (HI)**, and **Urdu (UR)**.
- Automatic **Right-to-Left (RTL)** layout for Arabic and Urdu.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend API**: Node.js, Express, Prisma ORM, MySQL
- **Tooling**: Vite, TypeScript, Robocopy, Git

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/naswn/Studently.git
   cd Studently
   ```

2. **Setup Frontend (`client/`)**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Setup Backend (`server/`)**:
   ```bash
   cd ../server
   npm install
   npx prisma db push
   npm run dev
   ```

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
