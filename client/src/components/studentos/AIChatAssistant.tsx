import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2,
  Lightbulb
} from 'lucide-react';
import { ChatMessage, ThemeMode } from '../../types/studentos';

const QUICK_PROMPTS = [
  'Explain Recursion with a simple real-life example',
  'How to build a 1st year student resume for tech internships?',
  'Top 5 project ideas for BCA / B.Tech Computer Science',
  'Best exam timetable study strategy for 80%+ marks'
];

interface AIChatAssistantProps {
  theme: ThemeMode;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: '👋 Hi there! I am your **StudentOS AI Assistant**. Ask me anything about your studies, code debugging, exam prep, resume tips, or scholarship guidance!',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response Generator
    setTimeout(() => {
      const generateAIResponse = (rawQuery: string): string => {
        const q = rawQuery.toLowerCase().trim();

        // 1. Data Structures & Algorithms
        if (q.includes('recursion') || q.includes('recursive')) {
          return `💡 **Recursion Explained Simply**:

Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem until reaching a **base case**.

📁 **Real Life Analogy: Russian Nesting Dolls**
Opening a doll inside another doll until you reach the smallest solid doll (the base case), then assembling them back!

\`\`\`javascript
// Factorial Example in JavaScript
function factorial(n) {
  if (n <= 1) return 1; // 🛑 Base Case
  return n * factorial(n - 1); // 🔄 Recursive Call
}
console.log(factorial(5)); // Output: 120
\`\`\`

⚡ **Key Rules of Recursion**:
1. Must have at least one **Base Case** to stop execution.
2. Must move towards the base case with every call to avoid stack overflow crashes.`;
        }

        if (q.includes('array') || q.includes('linked list') || q.includes('stack') || q.includes('queue') || q.includes('tree') || q.includes('graph') || q.includes('hash') || q.includes('dsa') || q.includes('sorting')) {
          return `⚡ **Data Structures & Algorithms (DSA) Guide**:

1. **Arrays**: Contiguous memory, instant O(1) lookup by index, O(n) search & insertion.
2. **Linked Lists**: Dynamic memory nodes connected by pointers. O(1) insertion at head, O(n) search.
3. **Stacks (LIFO)**: Last-In-First-Out. Push/Pop operations O(1). Used in function call stacks & undo mechanisms.
4. **Queues (FIFO)**: First-In-First-Out. Used in task scheduling & BFS graph traversal.
5. **Hash Maps**: Key-Value pairs with O(1) average lookup time.
6. **Binary Trees & BST**: Hierarchical tree structures. BST search time is O(log n) when balanced.

💡 *Pro Tip*: For technical interviews, practice sorting algorithms (MergeSort, QuickSort) and graph traversals (DFS & BFS)!`;
        }

        // 2. Languages & Tech: Python, JS, React, C++, Java, SQL
        if (q.includes('python')) {
          return `🐍 **Python Essentials & Quick Reference**:

Python is an easy-to-read, high-level language popular for AI, Data Science, and Web Backend.

\`\`\`python
# Useful Python Snippets
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]  # List Comprehension
print(squared)  # Output: [1, 4, 9, 16, 25]

# Dictionary (Key-Value)
student = {"name": "Alex", "gpa": 3.8}
print(f"Student: {student['name']}, GPA: {student['gpa']}")
\`\`\`

🚀 **Top Python Libraries for Students**: NumPy, Pandas, Matplotlib, Scikit-Learn, and FastAPI!`;
        }

        if (q.includes('javascript') || q.includes('js') || q.includes('react')) {
          return `⚡ **Modern JavaScript & React Guide**:

JavaScript powers interactive web applications across browser and server (Node.js).

\`\`\`javascript
// Modern ES6+ Async/Await Fetch
const fetchStudentData = async (id) => {
  try {
    const res = await fetch(\`/api/student/\${id}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
\`\`\`

⚛️ **React Core Concepts**:
• **Components**: Reusable UI blocks.
• **State (\`useState\`)**: Reactive data that triggers UI updates.
• **Effects (\`useEffect\`)**: Side-effects like API fetching & timers.`;
        }

        if (q.includes('sql') || q.includes('database') || q.includes('dbms')) {
          return `🗄️ **Database & SQL Query Essentials**:

SQL (Structured Query Language) is used to store, query, and manage relational databases like PostgreSQL, MySQL, and SQLite.

\`\`\`sql
-- Common SQL Operations
SELECT s.name, s.register_number, c.class_name
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.attendance_percentage >= 75.0
ORDER BY s.name ASC;
\`\`\`

🔑 **Key Concepts**:
1. **Primary Key**: Unique identifier for each table row.
2. **Foreign Key**: Connects tables together via relationships.
3. **Indexing**: Speeds up database queries significantly on large tables.`;
        }

        // 3. Resume & Career & Projects
        if (q.includes('resume') || q.includes('cv') || q.includes('internship') || q.includes('career') || q.includes('job')) {
          return `📄 **Executive Student Resume Strategy**:

1. **Keep it 1 Single Page**: HR recruiters spend ~6 seconds scanning resumes.
2. **Impact Bullet Points**: Use Action Verb + Context + Result formula (e.g., *"Built full-stack React app serving 500+ students, reducing registration time by 40%"*).
3. **Essential Sections**:
   • Contact Info (Email, Phone, LinkedIn, GitHub)
   • Education (Degree, College, CGPA, Year)
   • Key Projects (with live demo links & tech tags)
   • Technical Skills (Categorized by languages & frameworks)
   • Work Experience / Internships / Campus roles
4. **ATS Friendly**: Use standard fonts and clean formatting (our built-in Resume Builder generates ATS-ready A4 PDFs!).`;
        }

        if (q.includes('project') || q.includes('ideas') || q.includes('portfolio')) {
          return `🚀 **Top Student Portfolio Project Ideas**:

1. **Studently / All-in-One Student AI Ecosystem**: Build a suite with GPA calculator, notes summarizer, & countdown timers.
2. **Smart Attendance & Leave Tracker**: Web portal with WhatsApp parent alerts and monthly reports.
3. **AI Study Assistant**: Paste notes to generate flashcards and quizzes.
4. **Expense & Hostel Budget Tracker**: Log daily spending and visualize category charts.
5. **Real-time Chat App / Campus Notice Board**: Built with WebSockets, Node.js, and React.`;
        }

        // 4. Exams, Study Habits & GPA
        if (q.includes('exam') || q.includes('study') || q.includes('gpa') || q.includes('cgpa') || q.includes('marks') || q.includes('test') || q.includes('pass') || q.includes('prepare')) {
          return `🎓 **High-Scoring Exam & GPA Preparation Blueprint**:

1. **The 80/20 Rule (Pareto Principle)**: 80% of exam marks come from 20% of core concepts & past question papers. Solve previous 3 years' question papers first!
2. **Active Recall over Passive Reading**: Instead of highlighting notes, test yourself using flashcards or teaching the concept out loud.
3. **Pomodoro Technique**: 25 minutes of focused study followed by a 5-minute break (use our built-in Study Timer tool!).
4. **GPA / CGPA Formula**:
   SGPA = Σ (Credit × Grade Point) / Σ Credits
5. **Sleep & Consistency**: 7-8 hours of sleep before exam day retains 40% more memory than all-night cramming!`;
        }

        // 5. Intelligent Fallback Generator for any custom prompt
        const topicName = rawQuery.replace(/[?./!]/g, '').trim();
        return `🤖 **Studently AI Guidance on: "${topicName}"**

Here is a structured breakdown for **${topicName}**:

1. **Core Concept Overview**:
   • Focus on understanding foundational principles before diving into advanced topics.
   • Break down complex problems into smaller, manageable sub-tasks.

2. **Key Action Steps**:
   • **Step 1**: Review authoritative documentation or standard textbook references.
   • **Step 2**: Practice hands-on exercises or write sample code/notes.
   • **Step 3**: Utilize Studently's Study Tools (GPA Calculator, Timetable, AI Assistant) to structure your daily routine.

3. **Pro Recommendation**:
   If you have a specific code snippet, formula, or exam question regarding *"${topicName}"*, paste it directly here and I will generate a step-by-step resolution for you!`;
      };

      const aiText = generateAIResponse(query);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🤖 Student AI Assistant
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your 24/7 intelligent study buddy for coding, assignment research, and academic guidance.
              </p>
            </div>
          </div>

          {messages.length > 1 && (
            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Chat
            </button>
          )}
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className={`text-[11px] px-3 py-1.5 rounded-xl border whitespace-nowrap font-medium transition-all ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-rose-500/50 hover:bg-slate-900' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-rose-500/50 hover:bg-white'
              }`}
            >
              <Lightbulb className="w-3 h-3 text-amber-400 inline mr-1" />
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className={`p-6 rounded-3xl border min-h-[420px] max-h-[550px] overflow-y-auto flex flex-col justify-between ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-2xl p-4 rounded-2xl border text-xs leading-relaxed ${
                  isAI
                    ? isDark 
                      ? 'bg-slate-950/90 border-slate-800 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 border-rose-400 text-white font-medium'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/40 text-[10px] opacity-75">
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-rose-400 flex items-center gap-0.5"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedId === msg.id ? 'Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold animate-pulse">
              <Bot className="w-4 h-4" />
              <span>StudentOS AI is typing response...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Text Form */}
        <div className="mt-4 pt-4 border-t border-slate-800/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask your student question here (e.g. how to study for exams, explain code)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`flex-1 px-4 py-3 text-xs rounded-2xl border outline-none font-medium transition-all ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-white focus:border-rose-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
              }`}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-lg hover:opacity-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
