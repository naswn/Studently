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
  Trash2,
  MapPin,
  ExternalLink,
  Eye,
  Edit3,
  CheckCircle2,
  Globe,
  Layout
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

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');
  const [template, setTemplate] = useState<'modern' | 'classic' | 'minimal'>(
    resume.template || 'modern'
  );

  // Form input states for adding items
  const [newSkill, setNewSkill] = useState('');
  
  // New Project Form
  const [projTitle, setProjTitle] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projLink, setProjLink] = useState('');
  const [projDesc, setProjDesc] = useState('');

  // New Experience Form
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expDuration, setExpDuration] = useState('');
  const [expDesc, setExpDesc] = useState('');

  // New Certification Form
  const [certTitle, setCertTitle] = useState('');

  const handleChangeField = (field: keyof StudentResume, value: any) => {
    onUpdateResume({ ...resume, [field]: value });
  };

  const handleSelectTemplate = (t: 'modern' | 'classic' | 'minimal') => {
    setTemplate(t);
    onUpdateResume({ ...resume, template: t });
  };

  // Skill actions
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

  // Project actions
  const handleAddProject = () => {
    if (!projTitle.trim() || !projDesc.trim()) return;
    const newProj = {
      title: projTitle.trim(),
      tech: projTech.trim() || 'React, TypeScript',
      link: projLink.trim(),
      description: projDesc.trim()
    };
    onUpdateResume({
      ...resume,
      projects: [newProj, ...resume.projects]
    });
    setProjTitle('');
    setProjTech('');
    setProjLink('');
    setProjDesc('');
  };

  const handleRemoveProject = (index: number) => {
    const updated = resume.projects.filter((_, i) => i !== index);
    onUpdateResume({ ...resume, projects: updated });
  };

  // Experience actions
  const handleAddExperience = () => {
    if (!expRole.trim() || !expCompany.trim()) return;
    const newExp = {
      role: expRole.trim(),
      company: expCompany.trim(),
      duration: expDuration.trim() || '2025',
      description: expDesc.trim()
    };
    const currentExp = resume.experience || [];
    onUpdateResume({
      ...resume,
      experience: [newExp, ...currentExp]
    });
    setExpRole('');
    setExpCompany('');
    setExpDuration('');
    setExpDesc('');
  };

  const handleRemoveExperience = (index: number) => {
    const currentExp = resume.experience || [];
    const updated = currentExp.filter((_, i) => i !== index);
    onUpdateResume({ ...resume, experience: updated });
  };

  // Certification actions
  const handleAddCert = () => {
    if (!certTitle.trim()) return;
    onUpdateResume({
      ...resume,
      certifications: [...resume.certifications, certTitle.trim()]
    });
    setCertTitle('');
  };

  const handleRemoveCert = (index: number) => {
    const updated = resume.certifications.filter((_, i) => i !== index);
    onUpdateResume({ ...resume, certifications: updated });
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Scope Print Styles: ONLY print the resume container, hide everything else */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm 15mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide all UI elements outside resume sheet */
          body > *, #root > *, main > *, div:not(#resume-document-paper):not(#resume-document-paper *) {
            visibility: hidden !important;
          }
          header, nav, footer, button, .no-print {
            display: none !important;
          }
          /* Show target resume element exclusively */
          #resume-document-paper,
          #resume-document-paper * {
            visibility: visible !important;
          }
          #resume-document-paper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 12mm 15mm !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #1e293b !important;
            font-size: 10pt !important;
            line-height: 1.4 !important;
            border-radius: 0 !important;
            display: block !important;
          }
        }
      `}</style>

      {/* Header & Controls */}
      <div className={`p-6 rounded-3xl border shadow-xl ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">
                  ATS Professional Resume Builder
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  A4 Print Ready
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Craft executive student resumes optimized for job applications & campus recruitment.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Tab Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'editor'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Details
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Live A4 Preview
              </button>
            </div>

            {/* Template Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
              <button
                onClick={() => handleSelectTemplate('modern')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  template === 'modern' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Modern Executive Accent Style"
              >
                Executive
              </button>
              <button
                onClick={() => handleSelectTemplate('classic')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  template === 'classic' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Classic Corporate Serif Format"
              >
                Classic
              </button>
              <button
                onClick={() => handleSelectTemplate('minimal')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  template === 'minimal' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Minimal High-Density Tech Format"
              >
                Minimal Tech
              </button>
            </div>

            {/* Download PDF Button */}
            <button
              onClick={handlePrintResume}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR TAB */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Section 1: Contact & Personal Info */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <User className="w-4 h-4 text-blue-400" /> 1. Personal Contact Information
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
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Degree / Role Title</label>
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
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location / City, Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Calicut, India"
                    value={resume.location || ''}
                    onChange={(e) => handleChangeField('location', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={resume.github}
                    onChange={(e) => handleChangeField('github', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={resume.linkedin}
                    onChange={(e) => handleChangeField('linkedin', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Professional Summary Statement</label>
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

            {/* Section 2: Education & Technical Skills */}
            <div className={`p-6 rounded-3xl border space-y-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <GraduationCap className="w-4 h-4 text-emerald-400" /> 2. Education & Skills
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">College / Institution Name</label>
                  <input
                    type="text"
                    value={resume.college}
                    onChange={(e) => handleChangeField('college', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={resume.graduationYear}
                    onChange={(e) => handleChangeField('graduationYear', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={resume.cgpa}
                    onChange={(e) => handleChangeField('cgpa', e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Skills Manager */}
              <div className="pt-2 border-t border-slate-800/40">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Technical Skills & Tools</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add skill (e.g. React.js, Python, SQL)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className={`flex-1 px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
                  >
                    + Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-mono"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(idx)} className="hover:text-rose-400 font-bold ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Work Experience & Internships */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Briefcase className="w-4 h-4 text-cyan-400" /> 3. Work Experience & Internships
            </h3>

            {/* Add Experience Form */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Role / Position (e.g. Web Intern)"
                    value={expRole}
                    onChange={(e) => setExpRole(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company / Organization"
                    value={expCompany}
                    onChange={(e) => setExpCompany(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Duration (e.g. Jun 2025 - Aug 2025)"
                    value={expDuration}
                    onChange={(e) => setExpDuration(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Key Responsibilities & Achievements (Bullet points)..."
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded-xl border outline-none font-medium resize-none ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                onClick={handleAddExperience}
                className="px-4 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience Entry
              </button>
            </div>

            {/* List Existing Experience */}
            <div className="space-y-2">
              {(resume.experience || []).map((exp, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex items-start justify-between gap-3 ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">
                      {exp.role} — <span className="text-cyan-400">{exp.company}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">{exp.duration}</p>
                    <p className="text-xs text-slate-300 mt-1">{exp.description}</p>
                  </div>
                  <button onClick={() => handleRemoveExperience(idx)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Projects */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Code className="w-4 h-4 text-purple-400" /> 4. Key Academic & Personal Projects
            </h3>

            {/* Add Project Form */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Project Name / Title"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Technologies (e.g. React, Python)"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="GitHub / Live Link (Optional)"
                    value={projLink}
                    onChange={(e) => setProjLink(e.target.value)}
                    className={`w-full px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Project Summary & Impact Description..."
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className={`w-full p-2.5 text-xs rounded-xl border outline-none font-medium resize-none ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                onClick={handleAddProject}
                className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project Entry
              </button>
            </div>

            {/* List Existing Projects */}
            <div className="space-y-2">
              {resume.projects.map((proj, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex items-start justify-between gap-3 ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">
                      {proj.title} <span className="text-xs font-normal text-purple-400">({proj.tech})</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">{proj.description}</p>
                  </div>
                  <button onClick={() => handleRemoveProject(idx)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Certifications */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Award className="w-4 h-4 text-amber-400" /> 5. Certifications & Achievements
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add certification (e.g. AWS Certified Cloud Practitioner)..."
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCert())}
                className={`flex-1 px-3 py-1.5 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                onClick={handleAddCert}
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors"
              >
                + Add
              </button>
            </div>

            <div className="space-y-1.5">
              {resume.certifications.map((cert, idx) => (
                <div key={idx} className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-2 text-xs font-medium ${
                  isDark ? 'bg-slate-950/40 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <span>🏆 {cert}</span>
                  <button onClick={() => handleRemoveCert(idx)} className="text-slate-500 hover:text-rose-400 font-bold">×</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* A4 PRINT & LIVE PREVIEW DOCUMENT SHEET (Clean Professional ATS Paper) */}
      <div className={`transition-all duration-300 ${activeTab === 'editor' ? 'hidden print:block' : 'block'}`}>
        
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-3 no-print">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Standard A4 Page Ratio (210mm x 297mm) • ATS-Optimized
          </span>
          <button
            onClick={handlePrintResume}
            className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" /> Download / Print PDF Now
          </button>
        </div>

        {/* Paper Document Canvas */}
        <div 
          id="resume-document-paper" 
          className={`max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 print:shadow-none print:border-none print:p-0 font-sans ${
            template === 'classic' ? 'font-serif' : 'font-sans'
          }`}
        >
          {/* TEMPLATE 1: MODERN EXECUTIVE */}
          {template === 'modern' && (
            <div className="space-y-5">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                      {resume.fullName}
                    </h1>
                    <p className="text-sm font-bold text-blue-700 tracking-wide mt-0.5">
                      {resume.degree}
                    </p>
                  </div>
                  {resume.location && (
                    <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500 inline" /> {resume.location}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 mt-3 font-medium">
                  <span>📧 {resume.email}</span>
                  <span>•</span>
                  <span>📞 {resume.phone}</span>
                  {resume.linkedin && (
                    <>
                      <span>•</span>
                      <span>🔗 {resume.linkedin}</span>
                    </>
                  )}
                  {resume.github && (
                    <>
                      <span>•</span>
                      <span>💻 {resume.github}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* Education */}
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 font-bold text-sm">{resume.degree}</strong>
                    <div className="text-slate-700 font-medium">{resume.college}</div>
                  </div>
                  <div className="text-right sm:text-right text-slate-600 font-semibold mt-1 sm:mt-0">
                    <div>Class of {resume.graduationYear}</div>
                    <div className="text-blue-700 font-bold">CGPA: {resume.cgpa}</div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              {resume.experience && resume.experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Work Experience & Internships
                  </h2>
                  <div className="space-y-3">
                    {resume.experience.map((exp, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{exp.role} — <span className="text-blue-700">{exp.company}</span></span>
                          <span className="text-slate-500 font-medium">{exp.duration}</span>
                        </div>
                        <p className="text-slate-700 mt-1 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Key Projects & Portfolio
                  </h2>
                  <div className="space-y-3">
                    {resume.projects.map((proj, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>
                            {proj.title} <span className="text-slate-500 font-normal">({proj.tech})</span>
                          </span>
                          {proj.link && <span className="text-blue-600 font-mono text-[11px]">{proj.link}</span>}
                        </div>
                        <p className="text-slate-700 mt-1 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {resume.skills && resume.skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Technical Skills & Tools
                  </h2>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {resume.skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-medium text-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Certifications & Achievements
                  </h2>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                    {resume.certifications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE 2: CLASSIC CORPORATE (Serif Formal) */}
          {template === 'classic' && (
            <div className="space-y-5 font-serif text-slate-900">
              {/* Header Centered */}
              <div className="text-center border-b-2 border-slate-800 pb-3">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider">{resume.fullName}</h1>
                <p className="text-sm font-semibold italic text-slate-700 mt-0.5">{resume.degree}</p>
                <div className="text-xs text-slate-600 mt-2 space-x-2">
                  <span>{resume.email}</span> • <span>{resume.phone}</span>
                  {resume.location && <span> • {resume.location}</span>}
                  {resume.linkedin && <span> • {resume.linkedin}</span>}
                  {resume.github && <span> • {resume.github}</span>}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5 text-slate-900">
                    Summary
                  </h2>
                  <p className="text-xs text-slate-800 leading-relaxed font-sans">{resume.summary}</p>
                </div>
              )}

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5 text-slate-900">
                  Education
                </h2>
                <div className="flex justify-between text-xs">
                  <div>
                    <strong>{resume.college}</strong> — <span className="italic">{resume.degree}</span>
                  </div>
                  <div>Year: {resume.graduationYear} | CGPA: {resume.cgpa}</div>
                </div>
              </div>

              {/* Experience */}
              {resume.experience && resume.experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5 text-slate-900">
                    Experience
                  </h2>
                  <div className="space-y-2">
                    {resume.experience.map((exp, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex justify-between font-bold">
                          <span>{exp.role} at {exp.company}</span>
                          <span className="font-normal italic text-slate-600">{exp.duration}</span>
                        </div>
                        <p className="text-slate-800 font-sans mt-0.5">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5 text-slate-900">
                    Key Projects
                  </h2>
                  <div className="space-y-2">
                    {resume.projects.map((p, i) => (
                      <div key={i} className="text-xs">
                        <div className="font-bold">{p.title} <span className="font-normal text-slate-600 font-sans">({p.tech})</span></div>
                        <p className="text-slate-800 font-sans mt-0.5">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resume.skills && resume.skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5 text-slate-900">
                    Skills
                  </h2>
                  <p className="text-xs font-sans text-slate-800">{resume.skills.join(' • ')}</p>
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE 3: MINIMAL TECH (High Density) */}
          {template === 'minimal' && (
            <div className="space-y-4 font-mono text-slate-900">
              <div className="border-b-2 border-emerald-600 pb-3">
                <h1 className="text-2xl font-black uppercase text-slate-900">{resume.fullName}</h1>
                <p className="text-xs font-bold text-emerald-700">{resume.degree} • {resume.college}</p>
                <div className="text-[11px] text-slate-600 mt-1">
                  [{resume.email}] [{resume.phone}] [{resume.location || 'India'}] [{resume.github}]
                </div>
              </div>

              {resume.summary && (
                <div>
                  <div className="text-xs font-bold text-emerald-800 border-b border-slate-200 pb-0.5 mb-1">
                    // SUMMARY
                  </div>
                  <p className="text-xs font-sans text-slate-700">{resume.summary}</p>
                </div>
              )}

              <div>
                <div className="text-xs font-bold text-emerald-800 border-b border-slate-200 pb-0.5 mb-1">
                  // EDUCATION
                </div>
                <div className="text-xs font-sans flex justify-between">
                  <span><strong>{resume.degree}</strong> @ {resume.college}</span>
                  <span>{resume.graduationYear} (CGPA: {resume.cgpa})</span>
                </div>
              </div>

              {resume.projects && resume.projects.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-emerald-800 border-b border-slate-200 pb-0.5 mb-1">
                    // PROJECTS
                  </div>
                  <div className="space-y-2 font-sans">
                    {resume.projects.map((p, i) => (
                      <div key={i} className="text-xs">
                        <div className="font-bold text-slate-900">{p.title} <span className="font-mono text-xs text-emerald-700">[{p.tech}]</span></div>
                        <p className="text-slate-700">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.skills && resume.skills.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-emerald-800 border-b border-slate-200 pb-0.5 mb-1">
                    // TECH SKILLS
                  </div>
                  <div className="flex flex-wrap gap-1 font-mono text-xs">
                    {resume.skills.map((s, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
