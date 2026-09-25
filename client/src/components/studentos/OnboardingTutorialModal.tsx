import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Globe
} from 'lucide-react';
import { ThemeMode, LanguageCode } from '../../types/studentos';
import { TRANSLATIONS } from '../../utils/i18n';

interface OnboardingTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  lang: LanguageCode;
}

export const OnboardingTutorialModal: React.FC<OnboardingTutorialModalProps> = ({
  isOpen,
  onClose,
  theme,
  lang
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRtl = lang === 'ar' || lang === 'ur';

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`relative w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {t.tutorialTitle}
            </h2>
            <p className="text-xs text-slate-400">
              Step {step} of {totalSteps} • Studently Interactive Guide
            </p>
          </div>
        </div>

        {/* Slide Content */}
        <div className="min-h-[220px] flex flex-col justify-between py-2">
          {step === 1 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-100">{t.tutorialStep1Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.tutorialStep1Desc}</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-100">{t.tutorialStep2Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.tutorialStep2Desc}</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-100">{t.tutorialStep3Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.tutorialStep3Desc}</p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-100">{t.tutorialStep4Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t.tutorialStep4Desc}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800/60 mt-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map(s => (
              <span 
                key={s} 
                className={`w-2 h-2 rounded-full transition-all ${
                  step === s ? 'w-6 bg-emerald-400' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Previous
              </button>
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 shadow-md flex items-center gap-1"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-lg hover:opacity-95"
              >
                {t.getStartedBtn}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
