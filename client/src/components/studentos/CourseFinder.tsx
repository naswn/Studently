import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  IndianRupee, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  Award,
  Filter,
  ArrowRight
} from 'lucide-react';
import { CourseMatch, ThemeMode } from '../../types/studentos';

const SAMPLE_COURSES: CourseMatch[] = [
  {
    id: 'c1',
    courseName: 'Bachelor of Computer Applications (BCA)',
    stream: 'Science / Computer Science',
    degree: 'UG Degree',
    colleges: ['St. Xavier\'s College', 'Loyola College', 'Rajagiri College of Social Sciences', 'Farook College'],
    avgFeesPerYear: 45000,
    minPercentage: 60,
    durationYears: 3,
    careerProspects: ['Full Stack Web Developer', 'Software Engineer', 'System Analyst', 'App Developer'],
    location: 'Kerala & Tamil Nadu',
    badge: 'Popular Choice'
  },
  {
    id: 'c2',
    courseName: 'B.Tech in Computer Science & Artificial Intelligence',
    stream: 'Science / Computer Science',
    degree: 'B.Tech / B.E.',
    colleges: ['National Institute of Technology (NIT)', 'Vellore Institute of Technology (VIT)', 'Amrita Vishwa Vidyapeetham', 'Government Engineering College'],
    avgFeesPerYear: 120000,
    minPercentage: 75,
    durationYears: 4,
    careerProspects: ['AI Engineer', 'Machine Learning Developer', 'Data Scientist', 'Cloud Architect'],
    location: 'All India',
    badge: 'High Demand'
  },
  {
    id: 'c3',
    courseName: 'B.Com with Data Analytics / ACCA',
    stream: 'Commerce',
    degree: 'UG Degree',
    colleges: ['Christ University', 'Sacred Heart College', 'St. Joseph\'s College of Commerce', 'Madras Christian College'],
    avgFeesPerYear: 60000,
    minPercentage: 65,
    durationYears: 3,
    careerProspects: ['Financial Analyst', 'Chartered Accountant Track', 'Data Auditor', 'Investment Banker'],
    location: 'Kerala, Bangalore, Chennai',
    badge: 'Finance & Analytics'
  },
  {
    id: 'c4',
    courseName: 'B.Sc in Cyber Security & Forensic Science',
    stream: 'Science / Computer Science',
    degree: 'B.Sc Degree',
    colleges: ['Jain University', 'Calicut University Affiliated Colleges', 'Kannur University Dept', 'Manipal Academy'],
    avgFeesPerYear: 75000,
    minPercentage: 65,
    durationYears: 3,
    careerProspects: ['Ethical Hacker', 'Cyber Analyst', 'Information Security Officer', 'SOC Specialist'],
    location: 'Kerala & Karnataka',
    badge: 'Trending Skill'
  },
  {
    id: 'c5',
    courseName: 'Bachelor of Business Administration (BBA in Digital Marketing)',
    stream: 'Commerce / Arts',
    degree: 'UG Degree',
    colleges: ['SCMS Cochin School of Business', 'Kristu Jayanti College', 'MES College', 'St. Teresa\'s College'],
    avgFeesPerYear: 50000,
    minPercentage: 55,
    durationYears: 3,
    careerProspects: ['Digital Marketing Manager', 'Brand Strategist', 'Growth Marketer', 'Content Strategist'],
    location: 'Kerala & Karnataka',
    badge: 'Modern Management'
  },
  {
    id: 'c6',
    courseName: 'BA in Journalism & Multimedia Communication',
    stream: 'Humanities / Arts',
    degree: 'BA Degree',
    colleges: ['Asian School of Journalism', 'St. Albert\'s College', 'Calicut University Centre', 'Madras Christian College'],
    avgFeesPerYear: 40000,
    minPercentage: 50,
    durationYears: 3,
    careerProspects: ['Content Creator', 'Media Journalist', 'UI/UX Copywriter', 'PR Manager'],
    location: 'Kerala & Tamil Nadu',
    badge: 'Creative Career'
  }
];

interface CourseFinderProps {
  theme: ThemeMode;
}

export const CourseFinder: React.FC<CourseFinderProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [percentage, setPercentage] = useState<number>(75);
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const filteredCourses = SAMPLE_COURSES.filter((course) => {
    // Stream match
    if (selectedStream !== 'All' && !course.stream.toLowerCase().includes(selectedStream.toLowerCase())) {
      return false;
    }
    // Budget match
    if (course.avgFeesPerYear > maxBudget) {
      return false;
    }
    // Location match
    if (selectedLocation !== 'All' && !course.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = course.courseName.toLowerCase().includes(q);
      const matchProspects = course.careerProspects.some(p => p.toLowerCase().includes(q));
      const matchColleges = course.colleges.some(c => c.toLowerCase().includes(q));
      if (!matchName && !matchProspects && !matchColleges) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🎓 College & Course Finder
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Enter your Plus Two details to discover suitable courses and top colleges tailored to your budget and stream.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Plus Two Percentage Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Plus Two Marks (%):</span>
              <span className="text-emerald-400 font-extrabold">{percentage}%</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={percentage} 
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>40%</span>
              <span>70%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Stream Selector */}
          <div className="space-y-1.5">
            <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Academic Stream
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border font-medium outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Streams</option>
              <option value="Science">Science / CS</option>
              <option value="Commerce">Commerce</option>
              <option value="Humanities">Humanities / Arts</option>
            </select>
          </div>

          {/* Yearly Budget Range */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Max Yearly Budget:</span>
              <span className="text-teal-400 font-extrabold">₹{(maxBudget / 1000).toFixed(0)}k</span>
            </div>
            <input 
              type="range" 
              min="20000" 
              max="200000" 
              step="5000"
              value={maxBudget} 
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹20k</span>
              <span>₹100k</span>
              <span>₹200k</span>
            </div>
          </div>

          {/* Location Selector */}
          <div className="space-y-1.5">
            <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Preferred Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border font-medium outline-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All India</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka / Bangalore</option>
              <option value="Tamil Nadu">Tamil Nadu / Chennai</option>
            </select>
          </div>

        </div>

        {/* Search Bar Input */}
        <div className="relative mt-4">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course name, college, or job title (e.g., BCA, Ethical Hacker, AI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none font-medium transition-all ${
              isDark 
                ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500' 
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Found <strong className="text-emerald-400">{filteredCourses.length}</strong> course options matching your requirements
        </span>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => {
          const isEligible = percentage >= course.minPercentage;
          return (
            <div
              key={course.id}
              className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl relative flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-900/70 border-slate-800 hover:border-blue-500/40' 
                  : 'bg-white border-slate-200 shadow-sm hover:border-blue-500/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {course.stream}
                    </span>
                    <h3 className={`text-base font-extrabold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {course.courseName}
                    </h3>
                  </div>
                  {course.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shrink-0">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Key Attributes */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className={`p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] text-slate-400 block">Avg Fees / Year</span>
                    <span className="font-extrabold text-emerald-400">
                      ₹{course.avgFeesPerYear.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] text-slate-400 block">Cut-off Marks</span>
                    <span className={`font-extrabold ${isEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {course.minPercentage}% {isEligible ? '✓ (Eligible)' : '⚠️ Below'}
                    </span>
                  </div>
                </div>

                {/* Colleges List */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Top Affiliated Colleges ({course.location}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.colleges.map((col, idx) => (
                      <span 
                        key={idx}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border ${
                          isDark 
                            ? 'bg-slate-950 border-slate-800 text-slate-300' 
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Prospects */}
                <div className="space-y-1 mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Career & Job Roles:
                  </div>
                  <div className="text-xs text-slate-300 flex flex-wrap gap-1">
                    {course.careerProspects.map((job, i) => (
                      <span key={i} className="text-emerald-400 font-medium">
                        • {job}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between">
                <span className="text-xs text-slate-400">Duration: <strong>{course.durationYears} Years</strong></span>
                <button className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  View Syllabus <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className={`p-12 text-center rounded-3xl border ${
          isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <Search className="w-10 h-10 mx-auto text-slate-500 mb-3" />
          <h3 className="text-base font-bold">No courses match your exact filters</h3>
          <p className="text-xs mt-1">Try increasing your budget slider or clearing the search query.</p>
        </div>
      )}
    </div>
  );
};
