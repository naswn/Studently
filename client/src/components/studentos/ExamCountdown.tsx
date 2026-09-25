import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  PlusCircle, 
  Trash2, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Flame,
  BookOpen
} from 'lucide-react';
import { ExamDeadline, ThemeMode } from '../../types/studentos';

interface ExamCountdownProps {
  deadlines: ExamDeadline[];
  onAddDeadline: (deadline: Omit<ExamDeadline, 'id'>) => void;
  onDeleteDeadline: (id: string) => void;
  theme: ThemeMode;
  onBackToHome?: () => void;
}

export const ExamCountdown: React.FC<ExamCountdownProps> = ({
  deadlines,
  onAddDeadline,
  onDeleteDeadline,
  theme,
  onBackToHome
}) => {
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16)
  );
  const [priority, setPriority] = useState<ExamDeadline['priority']>('High');
  const [category, setCategory] = useState<ExamDeadline['category']>('Exam');

  const [now, setNow] = useState<number>(Date.now());

  // Timer Tick every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCreateDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onAddDeadline({
      title: title.trim(),
      subject: subject.trim() || 'General',
      dueDate,
      priority,
      category
    });

    setTitle('');
    setSubject('');
  };

  const getTimeRemaining = (targetDateStr: string) => {
    const totalMs = new Date(targetDateStr).getTime() - now;
    if (totalMs <= 0) {
      return { expired: true, days: 0, hours: 0, mins: 0, secs: 0 };
    }
    const secs = Math.floor((totalMs / 1000) % 60);
    const mins = Math.floor((totalMs / 1000 / 60) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    return { expired: false, days, hours, mins, secs };
  };

  return (
    <div className="space-y-6">
      
      {/* Universal Back to Dashboard Navigation Button */}
      {onBackToHome && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs transition-all ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-emerald-600 hover:bg-slate-100 shadow-sm'
            }`}
          >
            <span>← Back to Home Dashboard</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-lg">
            <Timer className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ⏰ Exam & Project Deadline Countdown
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Never miss an exam, assignment deadline, or lab viva. Track exact countdowns in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Add Form + Countdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Deadline Form */}
        <div className={`p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <PlusCircle className="w-5 h-5 text-amber-400" />
            Add New Deadline
          </h3>

          <form onSubmit={handleCreateDeadline} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Deadline Title
              </label>
              <input
                type="text"
                placeholder="e.g. End Sem Data Structures Exam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Subject / Course
              </label>
              <input
                type="text"
                placeholder="e.g. Data Structures (BCA102)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Due Date & Time
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Category & Priority
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Exam">Theory Exam</option>
                  <option value="Project Assignment">Project Assignment</option>
                  <option value="Lab Viva">Lab Viva</option>
                  <option value="Quiz">Quiz</option>
                </select>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity"
            >
              Add Countdown Timer
            </button>
          </form>
        </div>

        {/* Live Countdown Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className={`text-base font-bold flex items-center justify-between ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <span>⏳ Scheduled Upcoming Deadlines</span>
            <span className="text-xs font-semibold text-slate-400">({deadlines.length} Active)</span>
          </h3>

          {deadlines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deadlines.map((item) => {
                const rem = getTimeRemaining(item.dueDate);
                const isUrgent = !rem.expired && rem.days <= 2;

                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                      rem.expired
                        ? isDark ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-100 border-slate-200'
                        : isUrgent
                          ? isDark ? 'bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border-rose-500/50 shadow-rose-500/10' : 'bg-rose-50/60 border-rose-200'
                          : isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          item.priority === 'High' 
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {item.category} • {item.priority}
                        </span>
                        <button
                          onClick={() => onDeleteDeadline(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </h4>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.subject}</span>
                      </div>
                    </div>

                    {/* Countdown Box */}
                    <div className="mt-4 pt-3 border-t border-slate-800/40">
                      {rem.expired ? (
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Deadline Passed
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <span className="text-lg font-black text-amber-400 block">{rem.days}</span>
                            <span className="text-[9px] uppercase text-slate-400 font-bold">Days</span>
                          </div>
                          <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <span className="text-lg font-black text-amber-400 block">{rem.hours}</span>
                            <span className="text-[9px] uppercase text-slate-400 font-bold">Hours</span>
                          </div>
                          <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <span className="text-lg font-black text-amber-400 block">{rem.mins}</span>
                            <span className="text-[9px] uppercase text-slate-400 font-bold">Mins</span>
                          </div>
                          <div className={`p-2 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                            <span className="text-lg font-black text-rose-400 block">{rem.secs}</span>
                            <span className="text-[9px] uppercase text-slate-400 font-bold">Secs</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs border-2 border-dashed border-slate-800 rounded-3xl">
              No upcoming exam deadlines. Add your first exam or assignment deadline!
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
