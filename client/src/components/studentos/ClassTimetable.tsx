import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  PlusCircle, 
  Trash2, 
  MapPin, 
  UserCheck, 
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { TimetableSlot, SubjectAttendance, ThemeMode } from '../../types/studentos';

interface ClassTimetableProps {
  timetable: TimetableSlot[];
  attendance: SubjectAttendance[];
  onAddSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  onDeleteSlot: (id: string) => void;
  onUpdateAttendance: (subject: string, deltaAttended: number, deltaTotal: number) => void;
  theme: ThemeMode;
}

const DAYS: TimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
  timetable,
  attendance,
  onAddSlot,
  onDeleteSlot,
  onUpdateAttendance,
  theme
}) => {
  const isDark = theme === 'dark';

  const [selectedDay, setSelectedDay] = useState<TimetableSlot['day']>('Monday');

  // New Slot Form
  const [subject, setSubject] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:30 AM - 10:30 AM');
  const [room, setRoom] = useState('Lab 1');
  const [teacher, setTeacher] = useState('');

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAddSlot({
      day: selectedDay,
      timeSlot,
      subject: subject.trim(),
      room: room.trim() || 'Room 101',
      teacher: teacher.trim() || 'Faculty'
    });

    setSubject('');
  };

  const daySlots = timetable.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              📅 Weekly Class Timetable & Attendance Log
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Organize your weekly class schedule and maintain 75%+ minimum attendance across all subjects.
            </p>
          </div>
        </div>

        {/* Day Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Day Schedule + Attendance Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Day Slots List */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🕒 {selectedDay}'s Class Schedule
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{daySlots.length} Classes</span>
          </div>

          {daySlots.length > 0 ? (
            <div className="space-y-3">
              {daySlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    isDark ? 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {slot.timeSlot}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-800 border-slate-700 text-slate-300">
                        {slot.room}
                      </span>
                    </div>

                    <h4 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {slot.subject}
                    </h4>
                    <p className="text-xs text-slate-400">Faculty: {slot.teacher}</p>
                  </div>

                  <button
                    onClick={() => onDeleteSlot(slot.id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs border-2 border-dashed border-slate-800 rounded-2xl">
              No classes scheduled for {selectedDay}. Add a slot below!
            </div>
          )}

          {/* Add Slot Form Inline */}
          <form onSubmit={handleCreateSlot} className="pt-4 border-t border-slate-800/40 space-y-3">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              <PlusCircle className="w-4 h-4" /> Add Slot to {selectedDay}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className={`px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <input
                type="text"
                placeholder="Time e.g. 09:30 - 10:30 AM"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className={`px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <input
                type="text"
                placeholder="Room e.g. Lab 2"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className={`px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-cyan-500 text-white font-bold text-xs hover:bg-cyan-600 shadow-md"
              >
                Add Slot
              </button>
            </div>
          </form>
        </div>

        {/* Attendance Tracker */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <UserCheck className="w-5 h-5 text-emerald-400" />
            Subject Attendance Meter
          </h3>

          <div className="space-y-4">
            {attendance.map((att, idx) => {
              const pct = att.totalClasses > 0 ? Math.round((att.attended / att.totalClasses) * 100) : 0;
              const isLow = pct < 75;

              return (
                <div key={idx} className={`p-3.5 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-200">{att.subject}</span>
                    <span className={`font-black ${isLow ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {pct}% {isLow ? '⚠️ Low' : '✓'}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{att.attended} / {att.totalClasses} Classes</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateAttendance(att.subject, 1, 1)}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/30"
                        title="Mark Present"
                      >
                        + Present
                      </button>
                      <button
                        onClick={() => onUpdateAttendance(att.subject, 0, 1)}
                        className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold hover:bg-rose-500/30"
                        title="Mark Absent"
                      >
                        + Absent
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
