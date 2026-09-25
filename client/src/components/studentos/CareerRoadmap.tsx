import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  Code, 
  Award, 
  Briefcase,
  Terminal,
  Cpu
} from 'lucide-react';
import { CareerPath, ThemeMode } from '../../types/studentos';

const CAREER_PATHS_DATA: CareerPath[] = [
  {
    id: 'bca-dev',
    title: 'BCA / Computer Science to Full Stack Developer',
    stream: 'Software Engineering',
    description: 'The classic step-by-step roadmap from college fundamentals to getting hired as a Developer.',
    nodes: [
      { id: 'bca-degree', title: 'BCA / B.Tech CS Degree', description: 'Core CS subjects: Data Structures, DBMS, OOPs & Computer Networks', completed: true, category: 'Academic', skills: ['C++', 'Java', 'SQL'] },
      { id: 'bca-html-css', title: 'HTML5 & Modern CSS3', description: 'Responsive layouts, Tailwind CSS, Flexbox & CSS Grid', completed: true, category: 'Frontend', skills: ['HTML5', 'CSS3', 'Tailwind'] },
      { id: 'bca-js', title: 'JavaScript & ES6+', description: 'DOM manipulation, Promises, Async/Await & Fetch API', completed: true, category: 'Frontend', skills: ['JS', 'ES6', 'DOM'] },
      { id: 'bca-git', title: 'Git & GitHub Version Control', description: 'Branches, PRs, Git flow, repositories & open source', completed: true, category: 'Tools', skills: ['Git', 'GitHub'] },
      { id: 'bca-react', title: 'React.js & TypeScript', description: 'Component architecture, Hooks, State management & Routing', completed: false, category: 'Frontend', skills: ['React', 'TypeScript'] },
      { id: 'bca-python', title: 'Node.js or Python Backend', description: 'REST APIs, Express.js or FastAPI, database integration', completed: false, category: 'Backend', skills: ['Node.js', 'Python', 'Express'] },
      { id: 'bca-db', title: 'Prisma / SQL / MongoDB', description: 'Relational & NoSQL database schema design and queries', completed: false, category: 'Database', skills: ['PostgreSQL', 'MongoDB'] },
      { id: 'bca-projects', title: 'Build 3 Full-Stack Projects', description: 'E-commerce, Attendance Portal or StudentOS Portfolio app', completed: false, category: 'Portfolio', skills: ['Full Stack', 'Vercel'] },
      { id: 'bca-internship', title: 'Apply for Developer Internship', description: 'Resume optimization, LinkedIn networking, Mock coding interviews', completed: false, category: 'Career', skills: ['Resume', 'Interviews'] },
      { id: 'bca-job', title: 'Land Job: Developer / AI Engineer', description: 'Start your tech career as Junior Software Developer!', completed: false, category: 'Outcome', skills: ['SDE', 'AI Engineer'] }
    ]
  },
  {
    id: 'ai-ds',
    title: 'Data Science & Artificial Intelligence Roadmap',
    stream: 'AI & Data Science',
    description: 'Master Python, Machine Learning models, Neural Networks, and LLM Applications.',
    nodes: [
      { id: 'ai-python', title: 'Python Programming Basics', description: 'Variables, loops, functions, OOP & modules', completed: true, category: 'Language', skills: ['Python'] },
      { id: 'ai-math', title: 'Linear Algebra & Statistics', description: 'Vectors, Matrices, Probability & Distributions', completed: false, category: 'Math', skills: ['Statistics', 'Probability'] },
      { id: 'ai-numpy', title: 'NumPy & Pandas Data Analysis', description: 'Data cleaning, manipulation & exploratory analysis', completed: false, category: 'Data Analysis', skills: ['Pandas', 'NumPy'] },
      { id: 'ai-scikit', title: 'Machine Learning (Scikit-Learn)', description: 'Regression, Classification, Clustering & Model evaluation', completed: false, category: 'ML', skills: ['Scikit-Learn', 'ML'] },
      { id: 'ai-pytorch', title: 'Deep Learning (PyTorch / TF)', description: 'Neural Networks, CNNs, Transformers', completed: false, category: 'Deep Learning', skills: ['PyTorch', 'TensorFlow'] },
      { id: 'ai-genai', title: 'Generative AI & LLM APIs', description: 'Gemini API, RAG pipelines, Vector Databases', completed: false, category: 'AI', skills: ['LLMs', 'LangChain', 'RAG'] },
      { id: 'ai-role', title: 'AI Developer / Data Analyst', description: 'Deploy intelligent AI agents and machine learning pipelines', completed: false, category: 'Outcome', skills: ['AI Specialist'] }
    ]
  }
];

interface CareerRoadmapProps {
  completedNodeIds: string[];
  onToggleNodeCompletion: (nodeId: string) => void;
  theme: ThemeMode;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  completedNodeIds,
  onToggleNodeCompletion,
  theme
}) => {
  const isDark = theme === 'dark';

  const [selectedPathId, setSelectedPathId] = useState<string>('bca-dev');

  const currentPath = CAREER_PATHS_DATA.find(p => p.id === selectedPathId) || CAREER_PATHS_DATA[0];

  const totalPathNodes = currentPath.nodes.length;
  const completedInPath = currentPath.nodes.filter(n => completedNodeIds.includes(n.id)).length;
  const progressPercent = Math.round((completedInPath / totalPathNodes) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-500 to-purple-600 text-white shadow-lg">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🧑‍💻 Interactive Career & Skill Roadmap
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Follow step-by-step career pathways. Click nodes to mark skills as completed and update your dashboard!
            </p>
          </div>
        </div>

        {/* Path Selector Tabs */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {CAREER_PATHS_DATA.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPathId === path.id
                  ? 'bg-violet-500 text-white shadow-md shadow-violet-500/20'
                  : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>
      </div>

      {/* Path Overview & Progress Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {currentPath.stream}
            </span>
            <h3 className={`text-lg font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {currentPath.title}
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentPath.description}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border shrink-0 text-center ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Roadmap Completion
            </div>
            <div className="text-xl font-extrabold text-violet-400 mt-0.5">
              {completedInPath} / {totalPathNodes} <span className="text-xs font-normal text-slate-400">({progressPercent}%)</span>
            </div>
            <div className="w-36 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden mx-auto">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Vertical Node Step Tree */}
      <div className="space-y-3 relative pl-4 border-l-2 border-violet-500/30 ml-4">
        {currentPath.nodes.map((node, idx) => {
          const isDone = completedNodeIds.includes(node.id);
          return (
            <div
              key={node.id}
              onClick={() => onToggleNodeCompletion(node.id)}
              className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 group hover:scale-[1.01] ${
                isDone
                  ? isDark 
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200 shadow-md' 
                    : 'bg-emerald-50/40 border-emerald-300 text-slate-900 shadow-sm'
                  : isDark 
                    ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-violet-500/40' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-violet-500/40'
              }`}
            >
              {/* Bullet Node Icon */}
              <div className={`absolute -left-[27px] top-6 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                isDone 
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-violet-500'
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                      Step {idx + 1}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {node.category}
                    </span>
                  </div>

                  <h4 className={`text-base font-bold mt-1 ${
                    isDone 
                      ? 'text-emerald-400 line-through' 
                      : isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {node.title}
                  </h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {node.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                  {node.skills.map((s, i) => (
                    <span 
                      key={i}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                          : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
