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

  // Pastel Badge styling based on question type
  const typeBadgeStyles = {
    factual: {
      bg: 'bg-sky-100 text-sky-900 border-sky-300',
      icon: BookCheck,
      label: '🎯 사실 확인 질문 (Factual Question)',
    },
    inferential: {
      bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      icon: Lightbulb,
      label: '🧠 문맥 추론 질문 (Inferential Question)',
    },
    opinion: {
      bg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: MessageSquare,
      label: '💡 나의 생각 및 의견 (Personal Opinion)',
    },
  }[question.type] || {
    bg: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Sparkles,
    label: '독해 이해도 질문',
  };

  const IconComponent = typeBadgeStyles.icon;

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const charCount = answerText.length;

  return (
    <div className="bg-white/95 border-2 border-amber-200/90 hover:border-amber-300 transition-all rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-100/50 relative">
      
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        
        {/* Type Badge */}
        <span className={`px-3.5 py-1.5 rounded-2xl text-xs font-serif font-bold border-2 flex items-center gap-1.5 shadow-2xs ${typeBadgeStyles.bg}`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span>질문 {index + 1}. {typeBadgeStyles.label}</span>
        </span>

        {/* Word Counter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{wordCount} 단어</span>
          <span>•</span>
          <span>{charCount} 자</span>
          {wordCount >= 8 && (
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 충실한 답변!
            </span>
          )}
        </div>

      </div>

      {/* Question Text (English Question with high readability) */}
      <h3 className="text-base sm:text-lg font-serif font-bold text-slate-800 leading-snug mb-3">
        {question.questionText}
      </h3>

      {/* Hint Reveal Section */}
      {question.hint && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-800 hover:text-amber-900 font-bold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? '💡 힌트 접기 (Hide Hint)' : '💡 단서 및 힌트 보기 (Show Teacher Clue)'}</span>
          </button>

          {showHint && (
            <div className="mt-2.5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-sans shadow-inner">
              <span className="font-bold text-amber-800"> 선생님 힌트:</span> {question.hint}
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
          placeholder={`영어로 완결된 문장 형태의 답변을 작성하세요... (Write your answer in English for Question ${index + 1})`}
          rows={3}
          className="w-full bg-amber-50/30 text-slate-900 placeholder-slate-400 font-sans text-sm sm:text-base border-2 border-amber-200 rounded-2xl p-3.5 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all resize-y disabled:opacity-50 shadow-inner"
        />
      </div>

    </div>
  );
};
