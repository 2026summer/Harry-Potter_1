import React, { useState } from 'react';
import { Question } from '../types';
import { HelpCircle, Sparkles, CheckCircle2, MessageSquare, BookCheck, Lightbulb } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  answerText: string;
  onAnswerChange: (text: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  answerText,
  onAnswerChange,
  disabled = false,
}) => {
  const [showHint, setShowHint] = useState(false);

  // Badge styling based on question type
  const typeBadgeStyles = {
    factual: {
      bg: 'bg-blue-950/80 text-blue-300 border-blue-500/50',
      icon: BookCheck,
      label: '사실 확인형 (Factual Question)',
    },
    inferential: {
      bg: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
      icon: Lightbulb,
      label: '추론형 (Inferential Question)',
    },
    opinion: {
      bg: 'bg-amber-950/80 text-amber-300 border-amber-500/50',
      icon: MessageSquare,
      label: '개인 의견형 (Personal Opinion)',
    },
  }[question.type] || {
    bg: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Sparkles,
    label: '이해도 질문',
  };

  const IconComponent = typeBadgeStyles.icon;

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const charCount = answerText.length;

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 transition-all rounded-2xl p-5 sm:p-6 shadow-xl relative backdrop-blur-md">
      
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        
        {/* Type Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-serif font-bold border flex items-center gap-1.5 ${typeBadgeStyles.bg}`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span>Q{index + 1}. {typeBadgeStyles.label}</span>
        </span>

        {/* Word Counter */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
          {wordCount >= 10 && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Good length
            </span>
          )}
        </div>

      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-serif font-semibold text-amber-100 leading-snug mb-3">
        {question.questionText}
      </h3>

      {/* Hint Reveal Section */}
      {question.hint && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-400/90 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? '힌트 숨기기 (Hide Hint)' : '힌트 보기 (Show Clue / Hint)'}</span>
          </button>

          {showHint && (
            <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed font-sans">
              💡 <span className="font-semibold text-amber-300">Teacher's Hint:</span> {question.hint}
            </div>
          )}
        </div>
      )}

      {/* Answer Input Textarea */}
      <div className="relative">
        <textarea
          value={answerText}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={disabled}
          placeholder={`Write your answer in English here... (Tip: Write complete sentences for Q${index + 1})`}
          rows={3}
          className="w-full bg-slate-950/80 text-slate-100 placeholder-slate-500 font-sans text-sm sm:text-base border border-slate-700/80 rounded-xl p-3.5 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all resize-y disabled:opacity-50 shadow-inner"
        />
      </div>

    </div>
  );
};
