import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ArrowLeft,
  Copy,
  FileText
} from 'lucide-react';
import { Flashcard, QuizQuestion, ThemeMode } from '../../types/studentos';

const SAMPLE_NOTES = `Data Structures & Algorithms (DSA) Essentials:
1. Array: Linear structure storing elements in contiguous memory. Access time complexity O(1), Insertion/Deletion O(n).
2. Linked List: Nodes connected by pointers. Dynamic size, insertion/deletion O(1) if location is known, search O(n).
3. Stack: Last In First Out (LIFO) order. Common operations: push(), pop(), peek(). Used in function call stacks and undo mechanisms.
4. Queue: First In First Out (FIFO) order. Operations: enqueue(), dequeue(). Used in scheduling and BFS graph traversal.
5. Binary Search Tree (BST): Binary tree where left child < root < right child. Search time complexity average O(log n), worst O(n) if unbalanced.
6. Hashing / Hash Map: Key-value pair storage. Average search O(1). Collisions handled via Chaining or Open Addressing.`;

interface StudyAssistantProps {
  theme: ThemeMode;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [activeSubTab, setActiveSubTab] = useState<'summarizer' | 'quiz' | 'flashcards' | 'timer'>('summarizer');

  // Summarizer State
  const [notesInput, setNotesInput] = useState(SAMPLE_NOTES);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Flashcard State
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: 'f1', question: 'What is the average search time complexity of a Hash Map?', answer: 'O(1) average time complexity using key-value pair indexing.' },
    { id: 'f2', question: 'Which Data Structure follows LIFO order?', answer: 'Stack (Last In First Out), used in function call stacks and undo history.' },
    { id: 'f3', question: 'What is the main advantage of a Linked List over an Array?', answer: 'Dynamic memory allocation and O(1) insertion/deletion without shifting elements.' },
    { id: 'f4', question: 'What condition defines a Binary Search Tree (BST)?', answer: 'For every node, all keys in left subtree are smaller and all keys in right subtree are larger.' }
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');
  const [completedSessions, setCompletedSessions] = useState(0);

  // Timer Tick Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'study') {
        setCompletedSessions(s => s + 1);
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        setTimerMode('study');
        setTimerSeconds(25 * 60);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  // Generate Summary Logic
  const handleGenerateSummary = () => {
    if (!notesInput.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const summaryText = `✨ Smart Executive Summary:

📌 Key Takeaways:
• Core Linear Structures: Arrays provide fast O(1) indexing, while Linked Lists excel at dynamic allocation without element shifting.
• Stacks & Queues: Stacks use LIFO (ideal for call stacks), Queues use FIFO (ideal for BFS and task scheduling).
• Trees & Hashing: BST offers O(log n) search performance on balanced trees. Hash maps achieve ultra-fast O(1) lookup speeds.

💡 Quick Tip for Exams:
Focus on comparing Time Complexities between Array, Hash Map, and Linked List for Search, Insert, and Delete operations!`;

      setGeneratedSummary(summaryText);
      setIsGenerating(false);
    }, 800);
  };

  // Generate Quiz Logic
  const handleGenerateQuiz = () => {
    setQuizQuestions([
      {
        id: 'q1',
        question: 'What is the worst-case search complexity for an unbalanced Binary Search Tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'If a BST becomes skewed like a linked list, worst-case search becomes O(n).'
      },
      {
        id: 'q2',
        question: 'Which operation ordering does a Queue data structure use?',
        options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random Access', 'Priority Only'],
        correctAnswer: 1,
        explanation: 'Queues process items in First In First Out (FIFO) order.'
      },
      {
        id: 'q3',
        question: 'What is the array element access time complexity by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 0,
        explanation: 'Arrays use direct memory offset calculations to access elements in O(1) constant time.'
      }
    ]);
    setUserAnswers({});
    setShowQuizResults(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) score += 1;
    });
    return score;
  };

  const formatTimerDisplay = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-600 text-white shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              📚 AI Study Assistant & Notes Toolkit
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Paste lecture notes to create instant summaries, generated quizzes, flashcards, and focus study timers.
            </p>
          </div>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setActiveSubTab('summarizer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'summarizer'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Notes Summarizer
          </button>
          <button
            onClick={() => {
              setActiveSubTab('quiz');
              if (quizQuestions.length === 0) handleGenerateQuiz();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Quiz Generator
          </button>
          <button
            onClick={() => setActiveSubTab('flashcards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'flashcards'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Flashcard Deck
          </button>
          <button
            onClick={() => setActiveSubTab('timer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'timer'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Timer className="w-4 h-4" />
            Study Timer ({completedSessions} Done)
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: NOTES SUMMARIZER */}
      {activeSubTab === 'summarizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-base font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <FileText className="w-4 h-4 text-purple-400" />
              Paste Raw Study Notes
            </h3>
            <textarea
              rows={10}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Paste your lecture notes, textbook chapters, or topic summaries here..."
              className={`w-full p-4 text-xs rounded-2xl border outline-none font-mono resize-none ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setNotesInput(SAMPLE_NOTES)}
                className="text-xs text-purple-400 font-semibold hover:underline"
              >
                Load Sample DSA Notes
              </button>
              <button
                onClick={handleGenerateSummary}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 hover:opacity-95"
              >
                <Sparkles className="w-4 h-4 animate-spin" />
                {isGenerating ? 'Summarizing...' : 'Generate AI Summary'}
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <h3 className={`text-base font-bold mb-3 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>✨ AI Summary Result</span>
                {generatedSummary && (
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedSummary)}
                    className="text-xs font-semibold text-slate-400 hover:text-purple-400 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                )}
              </h3>

              {generatedSummary ? (
                <div className={`p-4 rounded-2xl border whitespace-pre-wrap text-xs leading-relaxed ${
                  isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-purple-50/50 border-purple-100 text-slate-800'
                }`}>
                  {generatedSummary}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500 text-xs text-center p-6 border-2 border-dashed border-slate-800 rounded-2xl">
                  Click "Generate AI Summary" to transform your notes into executive key bullet points!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: QUIZ GENERATOR */}
      {activeSubTab === 'quiz' && (
        <div className={`p-6 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🎯 Practice MCQ Quiz
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Test your knowledge based on notes context. Select options and view results.
              </p>
            </div>
            <button
              onClick={handleGenerateQuiz}
              className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 text-xs font-bold hover:bg-purple-500/30"
            >
              🔄 New Quiz
            </button>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIdx) => (
              <div key={q.id} className={`p-5 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-bold text-purple-400 mb-2">Question {qIdx + 1}:</div>
                <div className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = q.correctAnswer === optIdx;

                    let btnStyle = isDark 
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-500/50' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-purple-500/50';

                    if (showQuizResults) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !showQuizResults && handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showQuizResults && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {showQuizResults && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {showQuizResults && (
                  <div className="mt-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {showQuizResults ? (
                <div className="text-sm font-extrabold text-emerald-400">
                  Your Score: {calculateQuizScore()} / {quizQuestions.length} ({Math.round((calculateQuizScore()/quizQuestions.length)*100)}%)
                </div>
              ) : <div />}

              <button
                onClick={() => setShowQuizResults(true)}
                disabled={showQuizResults}
                className="px-6 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs shadow-lg hover:bg-purple-600 disabled:opacity-50"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FLASHCARDS DECK */}
      {activeSubTab === 'flashcards' && (
        <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center min-h-[350px] text-center ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
            Flashcard {currentCardIndex + 1} of {flashcards.length}
          </div>

          {/* Flip Card Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full max-w-lg p-8 rounded-3xl border cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-xl flex flex-col items-center justify-center min-h-[220px] ${
              isFlipped
                ? 'bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-purple-500/50 text-white'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div className="text-[10px] uppercase font-bold text-purple-400 mb-2">
              {isFlipped ? 'Answer (Click to Flip Back)' : 'Question (Click to Flip)'}
            </div>
            <p className="text-base font-extrabold leading-relaxed">
              {isFlipped ? flashcards[currentCardIndex].answer : flashcards[currentCardIndex].question}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev === 0 ? flashcards.length - 1 : prev - 1));
              }}
              className="p-3 rounded-xl border text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-slate-400">
              Tap card to view answer
            </span>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev === flashcards.length - 1 ? 0 : prev + 1));
              }}
              className="p-3 rounded-xl border text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: POMODORO STUDY TIMER */}
      {activeSubTab === 'timer' && (
        <div className={`p-8 rounded-3xl border text-center flex flex-col items-center justify-center ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
            timerMode === 'study' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {timerMode === 'study' ? '🧠 Deep Study Session (25 min)' : '☕ Rest & Refresh Break (5 min)'}
          </span>

          <div className="text-6xl sm:text-7xl font-black font-mono tracking-wider text-slate-100 my-6">
            {formatTimerDisplay(timerSeconds)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-8 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 shadow-xl transition-all ${
                isTimerRunning
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isTimerRunning ? 'Pause Session' : 'Start Focus'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(timerMode === 'study' ? 25 * 60 : 5 * 60);
              }}
              className="p-3 rounded-2xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-slate-400 font-semibold mt-6">
            Completed Today: <strong className="text-emerald-400">{completedSessions} Sessions</strong> ({(completedSessions * 25)} mins study time)
          </div>
        </div>
      )}

    </div>
  );
};
