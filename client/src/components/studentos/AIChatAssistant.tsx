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

    // AI Response Simulator
    setTimeout(() => {
      let aiText = '';

      if (query.toLowerCase().includes('recursion')) {
        aiText = `💡 **Recursion Explained Simply**:

Recursion is when a function calls itself to break down a big problem into smaller pieces until it reaches a **base case**.

📁 **Real Life Analogy: Russian Nesting Dolls**
Opening a doll inside another doll until you reach the smallest solid doll (the base case), then assembling them back!

\`\`\`javascript
function factorial(n) {
  if (n === 1) return 1; // Base case!
  return n * factorial(n - 1); // Recursive step
}
console.log(factorial(5)); // Output: 120
\`\`\`
Key takeaway: Always define a **Base Case** to prevent infinite loops!`;
      } else if (query.toLowerCase().includes('resume')) {
        aiText = `📄 **1st Year Tech Resume Checklist**:

1. **Header**: Name, Email, Phone, GitHub link, LinkedIn link.
2. **Education**: Degree name, College name, Plus Two % & Year.
3. **Technical Skills**: HTML, CSS, JavaScript, C/C++, Git & GitHub.
4. **Projects** (Most Important!):
   • *StudentOS Web App*: Built using React & Tailwind CSS.
   • *Attendance Portal*: Built with Node.js & Prisma DB.
5. **Certifications & Achievements**: HackerRank/LeetCode problem count, Hackathon participant.`;
      } else if (query.toLowerCase().includes('project')) {
        aiText = `🚀 **Top 5 Portfolio Projects for Students**:

1. **StudentOS / Student AI Toolbox** (All-in-One Dashboard & Mini-Tools)
2. **Smart College Attendance & Leave Management App**
3. **AI Study Notes Summarizer & Flashcard Generator**
4. **Student Expense & Hostel Budget Tracker**
5. **College Campus Event Booking & Notice Board Portal**`;
      } else {
        aiText = `🤖 **StudentOS AI Response**:

Thank you for your question: *"${query}"*!

Here is a structured student guide:
1. **Understand Core Concepts**: Break down the topic into 3 main bullet points.
2. **Practice Hands-On**: Build small exercises or write sample code snippets.
3. **Revision**: Use the StudentOS Flashcard & Quiz tools to test yourself before exams!

Need more details on this specific topic? Feel free to ask follow-up questions!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
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
