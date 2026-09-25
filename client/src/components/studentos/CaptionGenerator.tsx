import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Hash,
  Smile
} from 'lucide-react';
import { ThemeMode } from '../../types/studentos';

interface CaptionGeneratorProps {
  theme: ThemeMode;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [topic, setTopic] = useState('Late night coding session for StudentOS app project');
  const [tone, setTone] = useState<'Motivation' | 'Aesthetic' | 'Funny' | 'Tech' | 'Minimal'>('Tech');
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerateCaptions = () => {
    if (!topic.trim()) return;

    let captionsList: string[] = [];

    if (tone === 'Tech') {
      captionsList = [
        `💻 Turned coffee into code tonight! Building ${topic} 🚀\n#CodeLife #StudentOS #DeveloperStreak #BCA #BuildInPublic`,
        `Commit, Push, Repeat. ⚡ Working on ${topic}! 🧠\n#FullStack #CodingCommunity #Developers #TechStudent #Syntax`,
        `Bug fixed at 2 AM hit different. 🐛✨ Progress on ${topic}!\n#100DaysOfCode #DevLife #CSStudent`
      ];
    } else if (tone === 'Motivation') {
      captionsList = [
        `🔥 Small daily steps equal massive annual success. Focused on ${topic}! 💪\n#StudentOS #DailyHustle #StudyMotivation #GoalGetter`,
        `Dream big, study hard, stay humble. ✨ Working towards ${topic}.\n#CollegeLife #StudyStreak #FutureDeveloper #GrowthMindset`
      ];
    } else if (tone === 'Aesthetic') {
      captionsList = [
        `✨ Warm lights, quiet room, and ${topic} 📚☕\n#StudyGram #AestheticDesk #CozyVibes #CampusKit #StudentLife`,
        `Creating my own future, one note at a time 🌿✨\n#StudyMotivation #Minimalist #EduHub`
      ];
    } else if (tone === 'Funny') {
      captionsList = [
        `My brain has 47 tabs open and 4 of them are frozen 🧠⚡ ${topic}\n#ExamMemes #CollegeHumor #Studently #CoffeeRequired`,
        `99 bugs in the code... fix 1, 127 bugs in the code 🤡💻 ${topic}\n#ProgrammerHumor #StudentLife`
      ];
    } else {
      captionsList = [
        `Focus mode: ${topic} 🎯\n#StudentOS #Minimal #Growth`,
        `Day 12 of the grind. ⚡ ${topic}\n#Build #Study`
      ];
    }

    setGeneratedCaptions(captionsList);
  };

  const handleCopyCaption = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-rose-600 text-white shadow-lg">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ✍️ Social Media Caption & Hashtag Generator
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Generate cool Instagram, LinkedIn, and Twitter captions for your study milestones and project launches.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="sm:col-span-2">
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              What are you posting about?
            </label>
            <input
              type="text"
              placeholder="e.g. Cleared 1st sem exams, Built new React app, Hostel vibes..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Caption Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="Tech">Tech / Dev 💻</option>
              <option value="Motivation">Motivation 🔥</option>
              <option value="Aesthetic">Aesthetic / Cozy ✨</option>
              <option value="Funny">Funny / Memes 🤡</option>
              <option value="Minimal">Minimal ⚡</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateCaptions}
          className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:opacity-95"
        >
          <Sparkles className="w-4 h-4" /> Generate Captions
        </button>
      </div>

      {/* Generated Results List */}
      <div className="space-y-4">
        {generatedCaptions.map((cap, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border flex items-start justify-between gap-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="text-xs whitespace-pre-wrap leading-relaxed font-medium text-slate-200">
              {cap}
            </div>

            <button
              onClick={() => handleCopyCaption(idx, cap)}
              className="px-3 py-1.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold hover:bg-fuchsia-500/30 flex items-center gap-1 shrink-0"
            >
              {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIdx === idx ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
