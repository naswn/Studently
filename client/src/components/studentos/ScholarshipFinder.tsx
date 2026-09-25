import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  CheckCircle, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  Calendar, 
  IndianRupee,
  Building
} from 'lucide-react';
import { Scholarship, ThemeMode } from '../../types/studentos';

const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 's1',
    title: 'Central Sector Scheme of Scholarships (CSSS)',
    offeredBy: 'Ministry of Education, Govt. of India (NSP)',
    amount: '₹12,000 to ₹20,000 / year',
    eligibility: 'Above 80th percentile in Class 12 / Plus Two exam',
    stream: 'All Streams (Science, Commerce, Arts)',
    maxIncome: '₹4.5 Lakhs / year',
    deadline: '31st October 2026',
    link: 'https://scholarships.gov.in',
    category: 'Merit-based',
    featured: true
  },
  {
    id: 's2',
    title: 'INSPIRE Scholarship for Higher Education (SHE)',
    offeredBy: 'Department of Science and Technology (DST)',
    amount: '₹80,000 / year (₹5,000/mo + mentorship grant)',
    eligibility: 'Top 1% in Class 12 Science board exam enrolling in B.Sc/BS/Int. M.Sc',
    stream: 'Science / Basic Sciences',
    maxIncome: 'No Income Limit (Merit based)',
    deadline: '15th November 2026',
    link: 'https://online-inspire.gov.in',
    category: 'Merit-based',
    featured: true
  },
  {
    id: 's3',
    title: 'Post Matric Scholarship for SC/ST/OBC Students',
    offeredBy: 'State Higher Education Department & NSP',
    amount: '100% Tuition Fee Waiver + Monthly Maintenance Allowance',
    eligibility: 'Pass in 10th/12th, enrolled in recognized Diploma/Degree college',
    stream: 'All Streams',
    maxIncome: '₹2.5 Lakhs / year',
    deadline: '30th November 2026',
    link: 'https://scholarships.gov.in',
    category: 'Category-based (SC/ST/OBC)'
  },
  {
    id: 's4',
    title: 'Pragati Scholarship Scheme for Girl Students',
    offeredBy: 'AICTE Govt. of India',
    amount: '₹50,000 / year',
    eligibility: 'Girl students admitted to 1st year Technical Degree/Diploma (B.Tech/BCA/Diploma)',
    stream: 'Science / Engineering / Computer Science',
    maxIncome: '₹8 Lakhs / year',
    deadline: '31st October 2026',
    link: 'https://www.aicte-india.org',
    category: 'Girls in Tech / Engineering',
    featured: true
  },
  {
    id: 's5',
    title: 'Reliance Foundation Undergraduate Scholarship',
    offeredBy: 'Reliance Foundation',
    amount: 'Up to ₹2,00,000 total over degree duration',
    eligibility: 'First-year UG degree students with minimum 60% in Class 12',
    stream: 'All Streams',
    maxIncome: 'Preference < ₹2.5 Lakhs / year',
    deadline: '15th December 2026',
    link: 'https://www.scholarships.reliancefoundation.org',
    category: 'Private / CSR'
  },
  {
    id: 's6',
    title: 'State Merit Scholarship (Kerala / Higher Secondary & Degree)',
    offeredBy: 'Directorate of Collegiate Education, Govt. of Kerala',
    amount: '₹1,250 to ₹1,500 / year',
    eligibility: 'Minimum 50% marks in Plus Two / Degree exams',
    stream: 'All Streams',
    maxIncome: '₹1 Lakh / year',
    deadline: '30th October 2026',
    link: 'https://dcescholarship.kerala.gov.in',
    category: 'State Merit'
  }
];

interface ScholarshipFinderProps {
  theme: ThemeMode;
}

export const ScholarshipFinder: React.FC<ScholarshipFinderProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((item) => {
    if (selectedCategory !== 'All' && !item.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    if (selectedStream !== 'All' && !item.stream.toLowerCase().includes(selectedStream.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchBy = item.offeredBy.toLowerCase().includes(q);
      const matchElig = item.eligibility.toLowerCase().includes(q);
      if (!matchTitle && !matchBy && !matchElig) return false;
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
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🎓 Student Scholarship & Grant Finder
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Filter central, state, and private corporate CSR scholarships based on your academic stream and category.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Scholarship Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Categories</option>
              <option value="Merit">Merit-based</option>
              <option value="Category">SC / ST / OBC Category</option>
              <option value="Girls">Girls in Tech / Engineering</option>
              <option value="Private">Private / Corporate CSR</option>
              <option value="State">State Govt Merit</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Academic Stream
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Streams</option>
              <option value="Science">Science / Engineering</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Humanities / Arts</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Search Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search NSP, Reliance, Inspire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none font-medium ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scholarship Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' 
                : 'bg-white border-slate-200 shadow-sm hover:border-amber-500/40'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {sch.category}
                  </span>
                  <h3 className={`text-base font-extrabold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {sch.title}
                  </h3>
                </div>
                {sch.featured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    ★ Featured
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>{sch.offeredBy}</span>
              </div>

              {/* Amount Box */}
              <div className={`p-3 rounded-2xl border mb-4 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Grant / Financial Benefit
                </div>
                <div className="text-base font-extrabold text-emerald-400 mt-0.5">
                  {sch.amount}
                </div>
              </div>

              {/* Requirements list */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div><strong>Eligibility:</strong> {sch.eligibility}</div>
                <div><strong>Max Income Limit:</strong> {sch.maxIncome}</div>
                <div><strong>Stream:</strong> {sch.stream}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs">
              <div className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>Deadline: <strong>{sch.deadline}</strong></span>
              </div>

              <a
                href={sch.link}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95"
              >
                Apply Online <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
