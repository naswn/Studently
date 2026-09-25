import React, { useState } from 'react';
import { 
  Calculator, 
  PlusCircle, 
  Trash2, 
  Award, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2,
  Percent
} from 'lucide-react';
import { SubjectGrade, ThemeMode } from '../../types/studentos';

interface GPACalculatorProps {
  grades: SubjectGrade[];
  onAddGrade: (grade: Omit<SubjectGrade, 'id'>) => void;
  onDeleteGrade: (id: string) => void;
  theme: ThemeMode;
}

const GRADE_LETTER_POINTS: Record<string, number> = {
  'O (Outstanding)': 10,
  'A+ (Excellent)': 9,
  'A (Very Good)': 8,
  'B+ (Good)': 7,
  'B (Above Average)': 6,
  'C (Average)': 5,
  'F (Fail)': 0
};

export const GPACalculator: React.FC<GPACalculatorProps> = ({
  grades,
  onAddGrade,
  onDeleteGrade,
  theme
}) => {
  const isDark = theme === 'dark';

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('4');
  const [gradeLetter, setGradeLetter] = useState('O (Outstanding)');
  const [formulaMultiplier, setFormulaMultiplier] = useState<number>(9.5);

  // Calculations
  const totalCredits = grades.reduce((acc, curr) => acc + curr.credits, 0);
  const totalPoints = grades.reduce((acc, curr) => acc + (curr.credits * curr.gradePoint), 0);
  const calculatedCGPA = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  const percentage = Math.min(100, Math.round(calculatedCGPA * formulaMultiplier * 10) / 10);

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const point = GRADE_LETTER_POINTS[gradeLetter] ?? 8;
    const shortLetter = gradeLetter.split(' ')[0];

    onAddGrade({
      code: code.trim().toUpperCase() || 'SUB101',
      name: name.trim(),
      credits: Number(credits),
      gradePoint: point,
      gradeLetter: shortLetter
    });

    setCode('');
    setName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-600 text-white shadow-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              📊 GPA & CGPA Percentage Calculator
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Add course subjects, credits, and grades to calculate your exact SGPA, CGPA, and equivalent Percentage.
            </p>
          </div>
        </div>

        {/* 3 Metric Score Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          
          {/* Card 1: Calculated CGPA */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Overall CGPA / SGPA</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {calculatedCGPA.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 10.0</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Total Credits: <strong>{totalCredits}</strong>
            </div>
          </div>

          {/* Card 2: Equivalent Percentage */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Equivalent Percentage</span>
              <Percent className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400">
              {percentage}%
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-400">Formula:</span>
              <button
                onClick={() => setFormulaMultiplier(formulaMultiplier === 9.5 ? 10 : 9.5)}
                className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30"
              >
                CGPA × {formulaMultiplier}
              </button>
            </div>
          </div>

          {/* Card 3: Academic Status */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Academic Distinction</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-extrabold text-slate-100">
              {calculatedCGPA >= 9 ? '🏆 First Class Distinction' : calculatedCGPA >= 7.5 ? '⭐ First Class Honors' : calculatedCGPA >= 6 ? '👍 Second Class' : 'Pass'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Based on standard university evaluation
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Add Subject Form + Grades List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Subject Form */}
        <div className={`p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            Add Subject Grade
          </h3>

          <form onSubmit={handleCreateGrade} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Subject Code
              </label>
              <input
                type="text"
                placeholder="e.g. BCA101"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium uppercase ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Subject Name
              </label>
              <input
                type="text"
                placeholder="e.g. Programming in C++"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Course Credits
              </label>
              <select
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="1">1 Credit (Lab / Seminar)</option>
                <option value="2">2 Credits (Elective)</option>
                <option value="3">3 Credits (Core Theory)</option>
                <option value="4">4 Credits (Major Theory & Lab)</option>
                <option value="5">5 Credits (Main Project / Internship)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Letter Grade Achieved
              </label>
              <select
                value={gradeLetter}
                onChange={(e) => setGradeLetter(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {Object.keys(GRADE_LETTER_POINTS).map((g) => (
                  <option key={g} value={g}>{g} — {GRADE_LETTER_POINTS[g]} Points</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity"
            >
              Add Subject Grade
            </button>
          </form>
        </div>

        {/* Grades Table */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            📚 Enrolled Subjects & Grade Breakdown
          </h3>

          {grades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Subject Title</th>
                    <th className="py-2.5 px-3">Credits</th>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3">Points</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {grades.map((sub) => (
                    <tr key={sub.id} className={isDark ? 'hover:bg-slate-950/50' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{sub.code}</td>
                      <td className="py-3 px-3 font-semibold text-slate-200">{sub.name}</td>
                      <td className="py-3 px-3 text-slate-300 font-bold">{sub.credits}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full font-extrabold text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {sub.gradeLetter}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-cyan-400">
                        {sub.gradePoint} / 10
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onDeleteGrade(sub.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Delete subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              No subjects added yet. Fill out the form to compute your SGPA & CGPA!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
