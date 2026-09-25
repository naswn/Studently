import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  GraduationCap, 
  Code, 
  Briefcase, 
  Award,
  Plus,
  Trash2
} from 'lucide-react';
import { StudentResume, ThemeMode } from '../../types/studentos';

interface ResumeBuilderProps {
  resume: StudentResume;
  onUpdateResume: (resume: StudentResume) => void;
  theme: ThemeMode;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onUpdateResume,
  theme
}) => {
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [newSkill, setNewSkill] = useState('');

  const handleChangeField = (field: keyof StudentResume, value: any) => {
    onUpdateResume({ ...resume, [field]: value });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    onUpdateResume({
      ...resume,
      skills: [...resume.skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    const updated = resume.skills.filter((_, i) => i !== index);
    onUpdateResume({ ...resume, skills: updated });
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                📄 Student CV & Resume Builder
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Fill out your details to generate a professional, ATS-friendly A4 resume ready to print or save as PDF.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
              className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 font-bold text-xs hover:bg-blue-500/30"
            >
              {activeTab === 'editor' ? '👁️ View A4 Live Preview' : '✏️ Edit Resume Fields'}
            </button>

            <button
              onClick={handlePrintResume}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95"
            >
              <Printer className="w-4 h-4" /> Download PDF / Print
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR TAB */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Section 1: Contact & Summary */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <User className="w-4 h-4 text-blue-400" /> Personal Information & Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => handleChangeField('fullName', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => handleChangeField('email', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => handleChangeField('phone', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={resume.github}
                  onChange={(e) => handleChangeField('github', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => handleChangeField('summary', e.target.value)}
                className={`w-full p-3 text-xs rounded-xl border outline-none font-medium resize-none ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Section 2: Education & Skills */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <GraduationCap className="w-4 h-4 text-emerald-400" /> Education & Technical Skills
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Degree Title</label>
                <input
                  type="text"
                  value={resume.degree}
                  onChange={(e) => handleChangeField('degree', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">College / Campus</label>
                <input
                  type="text"
                  value={resume.college}
                  onChange={(e) => handleChangeField('college', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Skills Badges Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Technical Skills</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. React, Python)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold"
                >
                  + Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill(idx)} className="hover:text-rose-400 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PREVIEW TAB (Clean Styled A4 Document) */}
      <div className="max-w-4xl mx-auto p-8 bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-300 print:p-0 print:shadow-none print:border-none print:max-w-none">
        {/* CV Header */}
        <div className="border-b border-slate-300 pb-4 mb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{resume.fullName}</h1>
            <p className="text-sm font-semibold text-emerald-700">{resume.degree}</p>
          </div>
          <div className="text-xs text-slate-600 space-y-0.5">
            <div>📧 {resume.email} • 📞 {resume.phone}</div>
            <div>🔗 {resume.github} • {resume.linkedin}</div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1 mb-1">
            Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{resume.summary}</p>
        </div>

        {/* Education */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1 mb-1">
            Education
          </h2>
          <div className="flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900">{resume.degree}</strong> — {resume.college}
            </div>
            <span className="text-slate-500 font-medium">Class of {resume.graduationYear} | CGPA: {resume.cgpa}</span>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1 mb-1">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1 text-xs">
            {resume.skills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-slate-800">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-1 mb-1">
            Key Projects
          </h2>
          <div className="space-y-2">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="text-xs">
                <div className="font-bold text-slate-900">{proj.title} <span className="font-normal text-slate-500">({proj.tech})</span></div>
                <p className="text-slate-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
